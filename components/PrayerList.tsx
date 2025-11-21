import React from 'react';
import { PrayerTimes, PrayerName } from '../types';
import { PRAYER_MAPPING } from '../constants';

interface PrayerListProps {
  timings: PrayerTimes;
  nextPrayer: PrayerName | null;
}

const PrayerList: React.FC<PrayerListProps> = ({ timings, nextPrayer }) => {
  const prayers = Object.keys(PRAYER_MAPPING);

  return (
    <div className="bg-nando-800 rounded-3xl shadow-2xl shadow-black/50 p-5 mx-5 -mt-12 relative z-10 border border-nando-700 backdrop-blur-sm">
      <div className="space-y-2">
        {prayers.map((key) => {
            const name = PRAYER_MAPPING[key];
            const time = timings[key as keyof PrayerTimes];
            const isNext = nextPrayer === name;

            return (
                <div 
                    key={key} 
                    className={`flex justify-between items-center p-3.5 rounded-2xl transition-all duration-300 ${
                        isNext 
                            ? 'bg-turk-400/10 border-l-4 border-turk-400 shadow-[0_0_20px_rgba(48,213,200,0.1)] translate-x-1' 
                            : 'hover:bg-nando-700/50 border-l-4 border-transparent'
                    }`}
                >
                    <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${isNext ? 'bg-turk-400 shadow-[0_0_10px_#30D5C8] animate-pulse' : 'bg-nando-600'}`}></div>
                        <span className={`font-semibold text-lg ${isNext ? 'text-turk-400' : 'text-nando-300'}`}>
                            {name}
                        </span>
                        {isNext && (
                             <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-turk-400 text-nando-900 uppercase">
                                Şimdi
                             </span>
                        )}
                    </div>
                    <span className={`font-bold text-xl font-mono tracking-tight ${isNext ? 'text-white' : 'text-nando-400'}`}>
                        {time}
                    </span>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default PrayerList;