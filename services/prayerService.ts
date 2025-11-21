import { API_BASE_URL, API_METHOD_ID, PRAYER_MAPPING } from '../constants';
import { TimingsResponse, PrayerTimes, PrayerName } from '../types';

export const fetchPrayerTimes = async (lat: number, lng: number): Promise<TimingsResponse['data'] | null> => {
  try {
    // Get today's date in DD-MM-YYYY format
    const today = new Date();
    const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    
    const response = await fetch(
      `${API_BASE_URL}/${dateStr}?latitude=${lat}&longitude=${lng}&method=${API_METHOD_ID}`
    );

    if (!response.ok) {
      throw new Error('API Error');
    }

    const json: TimingsResponse = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};

// Get city name from coordinates using BigDataCloud free API (client-side friendly)
export const getCityNameFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    try {
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=tr`
        );
        if (!response.ok) return 'Konumunuz';
        
        const data = await response.json();
        // Try to get locality, then city, then principal subdivision
        return data.locality || data.city || data.principalSubdivision || 'Konumunuz';
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return 'Konumunuz';
    }
};

// Search location using OpenStreetMap Nominatim
export const searchLocation = async (query: string): Promise<{name: string, lat: number, lng: number}[]> => {
  try {
    // Append 'Turkey' to ensure results are in Turkey and prioritize it
    const searchQuery = `${query}, Turkey`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'EzanVaktiApp/1.0' // Required by Nominatim
        }
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.map((item: any) => {
        // Construct a readable name: Mahalle, District, City
        const addr = item.address;
        const parts = [];
        if (addr.suburb) parts.push(addr.suburb);
        else if (addr.quarter) parts.push(addr.quarter);
        else if (addr.neighbourhood) parts.push(addr.neighbourhood);
        
        if (addr.town) parts.push(addr.town);
        else if (addr.county) parts.push(addr.county);
        else if (addr.district) parts.push(addr.district);

        if (addr.city) parts.push(addr.city);
        else if (addr.province) parts.push(addr.province);
        else if (addr.state) parts.push(addr.state);

        const displayName = parts.length > 0 ? parts.join(', ') : item.display_name.split(',').slice(0, 2).join(',');

        return {
            name: displayName,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon)
        };
    });
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
};

// Helper to parse time string "HH:mm" to minutes
export const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper to calculate next prayer
export const calculateNextPrayer = (timings: PrayerTimes): { nextPrayer: PrayerName; nextPrayerTime: string; isNextDay: boolean } | null => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const prayers = Object.keys(PRAYER_MAPPING).map(key => ({
    key: key,
    name: PRAYER_MAPPING[key],
    time: timings[key as keyof PrayerTimes],
    minutes: timeToMinutes(timings[key as keyof PrayerTimes])
  })).sort((a, b) => a.minutes - b.minutes);

  // Find the first prayer with time > current time
  for (const prayer of prayers) {
    if (prayer.minutes > currentMinutes) {
      return { nextPrayer: prayer.name, nextPrayerTime: prayer.time, isNextDay: false };
    }
  }

  // If no prayer found today, it means next is Fajr tomorrow
  return { nextPrayer: prayers[0].name, nextPrayerTime: prayers[0].time, isNextDay: true };
};