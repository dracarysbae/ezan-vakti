import React, { useState, useEffect } from 'react';
import { PrayerName, DateInfo } from '../types';
import { Icons } from '../constants';

interface NextPrayerCardProps {
  nextPrayerName: PrayerName;
  nextPrayerTime: string; // HH:mm
  isNextDay: boolean;
  dateInfo: DateInfo;
  city: string;
  onMuteToggle: () => void;
  isMuted: boolean;
  onOpenSettings: () => void;
}

const NextPrayerCard: React.FC<NextPrayerCardProps> = ({ 
    nextPrayerName, 
    nextPrayerTime, 
    isNextDay, 
    dateInfo, 
    city,
    onMuteToggle,
    isMuted,
    onOpenSettings
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('--:--:--');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const [hours, minutes] = nextPrayerTime.split(':').map(Number);
      
      const target = new Date();
      target.setHours(hours, minutes, 0, 0);
      
      if (isNextDay) {
        target.setDate(target.getDate() + 1);
      }

      let diff = target.getTime() - now.getTime();
      
      if (diff < 0) {
          diff = 0; 
      }

      const h = Math.floor((diff / (1000 * 60 * 60)));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft()); // Initial call

    return () => clearInterval(timer);
  }, [nextPrayerTime, isNextDay]);

  return (
    <div className="bg-gradient-to-br from-turk-600 to-nando-800 pt-10 pb-20 px-6 rounded-b-[3rem] shadow-2xl shadow-turk-400/20 relative overflow-hidden border-b border-turk-400/30">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 text-turk-400 opacity-5">
            <Icons.Mosque />
        </div>
        <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 text-turk-400 opacity-5 scale-150">
             <Icons.Mosque />
        </div>

        {/* Header: City & Toggle Audio */}
        <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="flex flex-col text-white">
                <div className="flex items-center space-x-1 text-turk-400 mb-1">
                    <Icons.Location />
                    <span className="text-sm font-semibold tracking-wide uppercase text-turk-200 truncate max-w-[200px]">{city}</span>
                </div>
                <span className="text-2xl font-bold tracking-tight">{dateInfo.gregorian.weekday.en === 'Friday' ? 'Hayırlı Cumalar' : dateInfo.gregorian.day + ' ' + dateInfo.gregorian.weekday.en}</span>
                <span className="text-xs text-nando-300 font-light mt-0.5">{dateInfo.hijri.day} {dateInfo.hijri.month.en} {dateInfo.hijri.year}</span>
            </div>
            <div className="flex space-x-2">
                <button 
                    onClick={onOpenSettings}
                    className="p-2.5 bg-nando-800/50 backdrop-blur-md rounded-full text-turk-400 border border-turk-400/20 hover:bg-turk-400 hover:text-nando-900 transition-all active:scale-95"
                    aria-label="Zil Sesleri"
                >
                    <Icons.Music />
                </button>
                <button 
                    onClick={onMuteToggle}
                    className={`p-2.5 backdrop-blur-md rounded-full transition-all active:scale-95 border ${isMuted ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-nando-800/50 border-turk-400/20 text-turk-400 hover:bg-turk-400 hover:text-nando-900'}`}
                >
                    {isMuted ? <Icons.VolumeOff /> : <Icons.VolumeUp />}
                </button>
            </div>
        </div>

        {/* Countdown Center */}
        <div className="flex flex-col items-center justify-center text-white relative z-10 mt-4">
            <div className="text-nando-300 font-medium text-lg mb-2 tracking-widest uppercase opacity-90">
                {nextPrayerName} Vaktine Kalan
            </div>
            <div className="text-6xl font-bold tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(48,213,200,0.3)] text-transparent bg-clip-text bg-gradient-to-b from-white to-turk-100">
                {timeLeft}
            </div>
            <div className="mt-4 px-6 py-2 bg-nando-900/40 backdrop-blur-md rounded-full border border-turk-400/20 text-sm font-light text-turk-100 shadow-sm">
                Ezan Saati: <span className="font-bold ml-1 text-lg text-turk-400">{nextPrayerTime}</span>
            </div>
        </div>
    </div>
  );
};

export default NextPrayerCard;