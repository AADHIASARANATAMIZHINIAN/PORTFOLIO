import React, { useState, useEffect } from 'react';

const words = [
  { jp: '開発者', romaji: 'Kaihatsusha', en: 'Developer' },
  { jp: '技術', romaji: 'Gijutsu', en: 'Technology' },
  { jp: '創造性', romaji: 'Sōzōsei', en: 'Creativity' },
  { jp: '学習', romaji: 'Gakushū', en: 'Learning' },
];

const JapaneseWords: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMeaningVisible, setIsMeaningVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Hide meaning when word changes to the next one
      setIsMeaningVisible(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 4000); // Change word every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 text-center relative h-12">
      {words.map((word, index) => (
        <div
          key={word.jp}
          className="absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out"
          style={{ 
            opacity: index === currentIndex ? 1 : 0,
            animation: index === currentIndex ? `fade-float-cycle 4s ease-in-out` : 'none',
            // Ensure only the currently visible word is interactive
            pointerEvents: index === currentIndex ? 'auto' : 'none'
          }}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => setIsMeaningVisible(!isMeaningVisible)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsMeaningVisible(!isMeaningVisible);
              }
            }}
            aria-expanded={isMeaningVisible}
            aria-label={`Show meaning for ${word.jp}`}
          >
            <p className="text-2xl text-white/90 tracking-widest">{word.jp}</p>
            {/* New placeholder for meaning on click/touch */}
            <div className={`
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2
              px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg
              transition-all duration-300 pointer-events-none text-center
              ${isMeaningVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
            `}>
              <p className="text-white text-sm font-semibold whitespace-nowrap">{word.romaji}</p>
              <p className="text-white/70 text-xs whitespace-nowrap">{word.en}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JapaneseWords;
