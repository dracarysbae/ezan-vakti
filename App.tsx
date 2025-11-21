import React, { useState, useEffect, useRef } from 'react';
import { TimingsResponse, CityData, PrayerName } from './types';
import { fetchPrayerTimes, calculateNextPrayer, getCityNameFromCoordinates, searchLocation } from './services/prayerService';
import { ADHAN_SOUNDS, Icons } from './constants';
import NextPrayerCard from './components/NextPrayerCard';
import PrayerList from './components/PrayerList';
import SoundSelector from './components/SoundSelector';

const App: React.FC = () => {
  const [cities, setCities] = useState<CityData[]>(() => {
      const saved = localStorage.getItem('savedCities');
      return saved ? JSON.parse(saved) : [{ id: 'auto', name: 'Konumunuz', lat: 41.0082, lng: 28.9784, isAuto: true }];
  });
  
  const [activeCityId, setActiveCityId] = useState<string>('auto');
  const [prayerData, setPrayerData] = useState<TimingsResponse['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPrayerInfo, setNextPrayerInfo] = useState<{ nextPrayer: PrayerName; nextPrayerTime: string; isNextDay: boolean } | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Modals & Search
  const [showCitySelector, setShowCitySelector] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{name: string, lat: number, lng: number}[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showSoundSelector, setShowSoundSelector] = useState<boolean>(false);
  
  const [geoError, setGeoError] = useState<string | null>(null);

  // Sound Settings
  const [selectedSoundId, setSelectedSoundId] = useState<string>(() => {
      return localStorage.getItem('adhanSoundId') || ADHAN_SOUNDS[0].id;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef<string | null>(null); 

  // Update Audio Source when selection changes
  useEffect(() => {
    const soundUrl = ADHAN_SOUNDS.find(s => s.id === selectedSoundId)?.url || ADHAN_SOUNDS[0].url;
    audioRef.current = new Audio(soundUrl);
    localStorage.setItem('adhanSoundId', selectedSoundId);
  }, [selectedSoundId]);

  // Save cities
  useEffect(() => {
      localStorage.setItem('savedCities', JSON.stringify(cities));
  }, [cities]);

  // Main Data Fetching
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const activeCity = cities.find(c => c.id === activeCityId);
      
      if (activeCity) {
        if (activeCity.isAuto) {
           // Get Geolocation
           if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(
                   async (position) => {
                       const { latitude, longitude } = position.coords;
                       
                       // Fetch Real City Name
                       const realName = await getCityNameFromCoordinates(latitude, longitude);
                       
                       // Update the auto city coordinates and name
                       setCities(prev => prev.map(c => c.id === 'auto' ? { ...c, name: realName, lat: latitude, lng: longitude } : c));
                       
                       const data = await fetchPrayerTimes(latitude, longitude);
                       setPrayerData(data);
                       setLoading(false);
                   },
                   async (error) => {
                       console.error("Geo Error", error);
                       setGeoError("Konum alınamadı. Varsayılan olarak İstanbul gösteriliyor.");
                       const data = await fetchPrayerTimes(activeCity.lat, activeCity.lng);
                       setPrayerData(data);
                       setLoading(false);
                   }
               );
           } else {
               setGeoError("Tarayıcınız konum servisini desteklemiyor.");
               setLoading(false);
           }
        } else {
            // Manual City
            setGeoError(null);
            const data = await fetchPrayerTimes(activeCity.lat, activeCity.lng);
            setPrayerData(data);
            setLoading(false);
        }
      }
    };

    loadData();
  }, [activeCityId]);

  // Timer & Audio Trigger
  useEffect(() => {
    if (!prayerData) return;

    const interval = setInterval(() => {
        const info = calculateNextPrayer(prayerData.timings);
        setNextPrayerInfo(info);

        const now = new Date();
        const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const isPrayerTime = Object.values(prayerData.timings).includes(currentTimeStr);
        
        if (isPrayerTime && !isMuted && hasPlayedRef.current !== currentTimeStr) {
            audioRef.current?.play().catch(e => console.log("Autoplay blocked", e));
            hasPlayedRef.current = currentTimeStr;
        }

    }, 1000);

    setNextPrayerInfo(calculateNextPrayer(prayerData.timings));

    return () => clearInterval(interval);
  }, [prayerData, isMuted]);

  // Handle Search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchLocation(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleAddCityFromSearch = (result: {name: string, lat: number, lng: number}) => {
      // Shorten name if too long (e.g. take first 2 parts)
      const shortName = result.name.split(',').slice(0, 2).join(', ');
      
      const exists = cities.find(c => !c.isAuto && c.name === shortName);
      if (exists) {
          setActiveCityId(exists.id);
          setShowCitySelector(false);
          setSearchQuery('');
          setSearchResults([]);
          return;
      }

      const newCity: CityData = {
          id: `manual-${Date.now()}`,
          name: shortName,
          lat: result.lat,
          lng: result.lng,
          isAuto: false
      };
      setCities([...cities, newCity]);
      setActiveCityId(newCity.id);
      setShowCitySelector(false);
      setSearchQuery('');
      setSearchResults([]);
  };

  const handleRemoveCity = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (cities.length === 1) return; 
      const newCities = cities.filter(c => c.id !== id);
      setCities(newCities);
      if (activeCityId === id) {
          setActiveCityId(newCities[0].id);
      }
  };

  const currentCityObj = cities.find(c => c.id === activeCityId);
  const currentCityName = currentCityObj?.name || 'Şehir Seçiniz';

  if (loading && !prayerData) {
      return (
          <div className="min-h-screen bg-nando-900 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl">
                  <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-nando-700 border-t-turk-400 animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-turk-400">
                        <Icons.Location />
                      </div>
                  </div>
                  <p className="text-turk-400 font-medium tracking-wide animate-pulse">Vakitler Hesaplanıyor...</p>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-nando-900 pb-24 relative font-sans text-white">
      
      {/* Main Content */}
      {prayerData && nextPrayerInfo && currentCityObj && (
          <>
            <NextPrayerCard 
                nextPrayerName={nextPrayerInfo.nextPrayer}
                nextPrayerTime={nextPrayerInfo.nextPrayerTime}
                isNextDay={nextPrayerInfo.isNextDay}
                dateInfo={prayerData.date}
                city={currentCityName}
                onMuteToggle={() => setIsMuted(!isMuted)}
                isMuted={isMuted}
                onOpenSettings={() => setShowSoundSelector(true)}
            />
            
            {geoError && currentCityObj.isAuto && (
                <div className="mx-5 mt-4 p-4 bg-red-900/20 border border-red-800/50 rounded-2xl text-red-400 text-xs flex items-center shadow-sm">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    {geoError}
                </div>
            )}

            <PrayerList 
                timings={prayerData.timings} 
                nextPrayer={nextPrayerInfo.nextPrayer}
            />
          </>
      )}

      {/* Sound Selector Modal */}
      {showSoundSelector && (
          <SoundSelector 
              selectedSoundId={selectedSoundId} 
              onSelect={setSelectedSoundId} 
              onClose={() => setShowSoundSelector(false)} 
          />
      )}

      {/* Add City / Search Modal */}
      {showCitySelector && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-nando-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200 border border-nando-700">
                  <div className="p-5 border-b border-nando-700 flex justify-between items-center bg-nando-800 rounded-t-3xl">
                      <h3 className="font-bold text-white text-lg flex items-center">
                          <span className="bg-turk-400/20 text-turk-400 p-1.5 rounded-lg mr-2">
                            <Icons.Plus />
                          </span>
                          Şehir/Konum Ekle
                      </h3>
                      <button onClick={() => setShowCitySelector(false)} className="text-nando-400 hover:text-white p-1 rounded-full hover:bg-nando-700 transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                  </div>
                  
                  <div className="p-4">
                      <div className="relative flex items-center">
                          <input 
                            type="text" 
                            placeholder="Örn: Erzincan Kemaliye..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full bg-nando-900 border border-nando-700 rounded-xl py-3 pl-4 pr-12 text-white placeholder-nando-500 focus:outline-none focus:border-turk-400 focus:ring-1 focus:ring-turk-400 transition-all"
                          />
                          <button 
                             onClick={handleSearch}
                             disabled={isSearching}
                             className="absolute right-2 bg-turk-400 text-nando-900 p-2 rounded-lg hover:bg-turk-300 transition-colors disabled:opacity-50"
                          >
                              {isSearching ? (
                                  <div className="w-5 h-5 border-2 border-nando-900 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                              )}
                          </button>
                      </div>
                      <p className="text-xs text-nando-400 mt-2 ml-1">Tam sonuç için "İlçe, Mahalle" şeklinde aratın.</p>
                  </div>

                  <div className="overflow-y-auto p-2 space-y-1 max-h-[300px] custom-scrollbar">
                      {searchResults.length > 0 ? (
                          searchResults.map((result, index) => (
                              <button 
                                key={index}
                                onClick={() => handleAddCityFromSearch(result)}
                                className="w-full text-left px-4 py-3 rounded-xl hover:bg-nando-700 transition-colors font-medium text-nando-200 flex flex-col border border-transparent hover:border-nando-600"
                              >
                                  <span className="text-white font-semibold">{result.name.split(',')[0]}</span>
                                  <span className="text-xs text-nando-400 mt-0.5 truncate">{result.name}</span>
                              </button>
                          ))
                      ) : (
                          searchQuery.length > 0 && !isSearching && (
                              <div className="text-center py-8 text-nando-500">
                                  Sonuç bulunamadı.
                              </div>
                          )
                      )}
                      
                      {!searchQuery && (
                          <div className="text-center py-8 text-nando-500 text-sm">
                              Konumunuzu veya istediğiniz şehri, ilçeyi arayın.
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* Bottom Navigation / Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-nando-800/90 backdrop-blur-xl border-t border-nando-700 px-4 py-3 z-40 pb-safe">
         <div className="flex space-x-3 overflow-x-auto pb-1 no-scrollbar justify-center sm:justify-start">
            {cities.map(city => (
                <button
                    key={city.id}
                    onClick={() => setActiveCityId(city.id)}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-lg ${
                        activeCityId === city.id 
                        ? 'bg-turk-400 text-nando-900 shadow-[0_0_15px_rgba(48,213,200,0.3)]' 
                        : 'bg-nando-700 text-nando-400 border border-nando-600 hover:bg-nando-600 hover:text-white'
                    }`}
                >
                    {city.isAuto && <Icons.Location />}
                    <span>{city.name}</span>
                    {!city.isAuto && (
                        <span 
                            role="button" 
                            onClick={(e) => handleRemoveCity(e, city.id)}
                            className="ml-2 p-0.5 rounded-full hover:bg-black/20 text-current opacity-60 hover:opacity-100"
                        >
                            &times;
                        </span>
                    )}
                </button>
            ))}
            <button 
                onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setShowCitySelector(true);
                }}
                className="px-4 py-2.5 bg-nando-700 text-turk-400 border border-nando-600 rounded-full hover:bg-turk-400 hover:text-nando-900 transition-colors flex items-center justify-center shadow-lg"
            >
                <Icons.Plus />
            </button>
         </div>
      </div>

    </div>
  );
};

export default App;