import React, { useState } from 'react';
import PixelatedText from './PixelatedText';

interface HeaderProps {
    activeSection: string;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode; isActive: boolean }> = ({ href, children, isActive }) => (
    <a
        href={href}
        className={`relative px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
    >
        <PixelatedText>{children}</PixelatedText>
        <span className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </a>
);

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'works', label: 'Works' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20">
            <nav className="container mx-auto px-6 md:px-10 lg:px-20 py-4 flex justify-between items-center">
                <a href="#hero" className="text-xl font-bold tracking-wider uppercase text-white hover:opacity-80 transition-opacity duration-300">
                    <PixelatedText>AADHIASARANA T</PixelatedText>
                </a>
                
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-2">
                    {navItems.map(item => (
                        <NavLink key={item.id} href={`#${item.id}`} isActive={activeSection === item.id || (item.id === 'works' && ['works', 'experience', 'skills'].includes(activeSection))}>
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>
            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/50 backdrop-blur-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        {navItems.map(item => (
                            <a 
                                key={item.id} 
                                href={`#${item.id}`} 
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-semibold uppercase tracking-wide ${activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                               {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;