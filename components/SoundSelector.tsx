import React from 'react';
import { ADHAN_SOUNDS, Icons } from '../constants';

interface SoundSelectorProps {
  selectedSoundId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const SoundSelector: React.FC<SoundSelectorProps> = ({ selectedSoundId, onSelect, onClose }) => {
  const playPreview = (url: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const audio = new Audio(url);
      audio.play();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-nando-800 rounded-3xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col animate-in slide-in-from-bottom-10 duration-300 border border-nando-700">
            <div className="p-5 border-b border-nando-700 flex justify-between items-center bg-nando-800 rounded-t-3xl">
                <div className="flex items-center space-x-2">
                    <div className="bg-turk-400/20 p-2 rounded-full text-turk-400">
                        <Icons.Music />
                    </div>
                    <h3 className="font-bold text-white text-lg">Ezan Sesi Seç</h3>
                </div>
                <button onClick={onClose} className="bg-nando-700 p-1.5 rounded-full text-nando-300 hover:text-white shadow-sm border border-nando-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div className="overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {ADHAN_SOUNDS.map(sound => {
                    const isSelected = selectedSoundId === sound.id;
                    return (
                        <div 
                          key={sound.id}
                          onClick={() => onSelect(sound.id)}
                          className={`w-full relative flex items-center justify-between px-4 py-4 rounded-2xl transition-all cursor-pointer border ${
                              isSelected 
                              ? 'bg-turk-400/10 border-turk-400/50 shadow-[0_0_15px_rgba(48,213,200,0.1)]' 
                              : 'bg-nando-700/30 border-transparent hover:bg-nando-700 hover:border-nando-600'
                          }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-turk-400' : 'border-nando-500'}`}>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-turk-400 rounded-full shadow-[0_0_8px_#30D5C8]" />}
                                </div>
                                <span className={`font-medium ${isSelected ? 'text-turk-400' : 'text-nando-300'}`}>
                                    {sound.name}
                                </span>
                            </div>
                            
                            <button 
                                onClick={(e) => playPreview(sound.url, e)}
                                className="p-2 rounded-full bg-nando-600 text-nando-300 border border-nando-500 hover:bg-turk-400 hover:text-nando-900 transition-colors z-10"
                                title="Önizle"
                            >
                                <Icons.Play />
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="p-4 bg-nando-900/50 text-center text-xs text-nando-400 rounded-b-3xl">
                Seçilen ses ezan vaktinde çalacaktır.
            </div>
        </div>
    </div>
  );
};

export default SoundSelector;