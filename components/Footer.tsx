import React from 'react';
import { PROFILE } from '../constants';
import PixelatedText from './PixelatedText';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-white/10">
      <div className="container mx-auto px-6 md:px-10 lg:px-20 py-6 text-center text-gray-500 text-sm">
        <div className="mb-4 flex justify-center items-center gap-6 uppercase text-xs tracking-wider">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 transform hover:-translate-y-1 inline-block">
              <PixelatedText>Facebook ↗</PixelatedText>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 transform hover:-translate-y-1 inline-block">
              <PixelatedText>Instagram ↗</PixelatedText>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 transform hover:-translate-y-1 inline-block">
              <PixelatedText>X/Twitter ↗</PixelatedText>
            </a>
        </div>
        <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        <p className="mt-1">Designed & Built by {PROFILE.name}</p>
      </div>
    </footer>
  );
};

export default Footer;