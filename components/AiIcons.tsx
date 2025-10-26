import React from 'react';

export const AiIconAbout = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 19C20 16.7909 16.4183 15 12 15C7.58172 15 4 16.7909 4 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.5" />
        <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8">
             <animateTransform attributeName="transform" type="translate" values="0 -8; 0 8; 0 -8" dur="3s" repeatCount="indefinite" />
        </line>
    </svg>
);

export const AiIconSkills = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16.5 7.5C18.433 7.5 20 9.067 20 11C20 12.933 18.433 14.5 16.5 14.5C14.567 14.5 13 12.933 13 11C13 9.067 14.567 7.5 16.5 7.5Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16.5 14.5C14.2333 15.8333 12.8 17.7 12 20M12 20C11.2 17.7 9.76667 15.8333 7.5 14.5M7.5 14.5C5.567 14.5 4 12.933 4 11C4 9.067 5.567 7.5 7.5 7.5C9.433 7.5 11 9.067 11 11C11 12.933 9.433 14.5 7.5 14.5ZM7.5 7.5C9.16667 6.33333 10.5 4.5 11.5 2C12.5 4.5 13.8333 6.33333 15.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </path>
    </svg>
);

export const AiIconExperience = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M18.364 5.63604C16.5771 3.84915 14.3861 2.92893 12 2.92893C9.61391 2.92893 7.42288 3.84915 5.63604 5.63604C3.84915 7.42288 2.92893 9.61391 2.92893 12C2.92893 14.3861 3.84915 16.5771 5.63604 18.364C7.42288 20.1508 9.61391 21.0711 12 21.0711C14.3861 21.0711 16.5771 20.1508 18.364 18.364C20.1508 16.5771 21.0711 14.3861 21.0711 12C21.0711 9.61391 20.1508 7.42288 18.364 5.63604Z" stroke="currentColor" strokeWidth="1.5" />
            <style>
                {`
                    g {
                        animation: rotate-gears 10s linear infinite;
                        transform-origin: center;
                    }
                `}
            </style>
        </g>
    </svg>
);

export const AiIconWorks = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w.org/2000/svg" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor">
            <animateMotion dur="3s" repeatCount="indefinite" path="M-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0" />
        </circle>
        <circle cx="12" cy="12" r="1.5" fill="currentColor">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="5s" repeatCount="indefinite" />
            <animateMotion dur="5s" repeatCount="indefinite" path="M0,-5 a5,5 0 1,0 0,10 a5,5 0 1,0 0,-10" />
        </circle>
    </svg>
);

export const AiIconContact = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <animate attributeName="d" dur="4s" repeatCount="indefinite"
                values="M3 8L12 2L21 8V16C21 18.2091 19.2091 20 17 20H7C4.79086 20 3 18.2091 3 16V8Z; M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4; M3 8L12 2L21 8V16C21 18.2091 19.2091 20 17 20H7C4.79086 20 3 18.2091 3 16V8Z"
            />
        </path>
    </svg>
);