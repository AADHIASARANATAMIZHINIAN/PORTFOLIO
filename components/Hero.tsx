import React, { useState, useEffect } from 'react';
import { PROFILE } from '../constants';
import AnimatedName from './AnimatedName';
import useTyped from '../hooks/useTyped';
import AiTextReveal from './AiTextReveal';
import PixelatedText from './PixelatedText';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  const typedTitle = useTyped(PROFILE.title);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-start py-20 overflow-hidden">
      <div className="max-w-4xl" style={{ transform: `translateY(${offsetY * 0.4}px)` }}>
        <AnimatedName
          as="h1"
          text={PROFILE.name}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wider uppercase"
          style={{textShadow: '0 2px 20px rgba(0,0,0,0.7)'}}
        />
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 tracking-wider uppercase h-12" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
          {typedTitle}
          <span className="animate-ping">|</span>
        </h2>
        <AiTextReveal 
          as="p" 
          text={PROFILE.bio} 
          className="mt-6 text-lg text-gray-300 max-w-2xl" 
          style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}
        />
        <div className="mt-8">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/10 text-white font-semibold px-6 py-3 bg-white/5 backdrop-blur-lg transition-all duration-300 uppercase tracking-wider transform hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-white/25 rounded-lg"
          >
            <PixelatedText>View My Resume</PixelatedText>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;