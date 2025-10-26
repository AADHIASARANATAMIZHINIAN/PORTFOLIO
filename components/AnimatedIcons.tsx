import React from 'react';

export const AnimatedReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
      <style>
        {`
          @keyframes spin-react {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          g {
            animation: spin-react 8s linear infinite;
            transform-origin: center;
          }
        `}
      </style>
    </svg>
);

export const AnimatedTypescriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="ts-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#007ACC" />
            <stop offset="100%" stopColor="#005C9A" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="20" fill="url(#ts-gradient)" />
      <path fill="white" d="M30.3 30.3h67.4v21.5H79.2v45.9H57.7V51.8H30.3z" />
      <path fill="white" d="M80.9 83.2c-2.3-1.8-4.3-3.5-5.9-5.1-1.6-1.6-2.9-3.4-3.9-5.3 -1-1.9-1.5-4-1.5-6.2 0-2.8.6-5.3 1.9-7.4 1.3-2.1 3.1-3.8 5.4-4.9 2.3-1.1 4.9-1.7 7.8-1.7 3.5 0 6.6.8 9.2 2.5 2.6 1.7 4.7 4 6.1 7l-16.8 9.7c.3.8.7 1.5 1.2 2.1.5.6 1.2 1.2 2 1.7.8.5 1.7.8 2.7.8 1.1 0 2.1-.3 3-.8.9-.5 1.8-1.2 2.6-2.1l15.1 10.3c-2.2 3.1-5.1 5.6-8.7 7.5 -3.6 1.9-7.9 2.9-12.8 2.9 -4.5 0-8.6-1-12.2-2.9z"/>
      <style>
        {`
          @keyframes pulse-ts {
            0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(0, 122, 204, 0.3); }
            50% { transform: scale(1.03); box-shadow: 0 0 20px rgba(0, 122, 204, 0.7); }
          }
          rect {
            animation: pulse-ts 4s ease-in-out infinite;
            transform-origin: center;
          }
        `}
      </style>
    </svg>
);

export const AnimatedJavaScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="128" height="128" fill="#F7DF1E"/>
        <path d="M64 101.4c-12.2 0-16-5.7-16-12.3 0-5.3 3.6-9.1 12.5-12.8l4.1-1.7c4.1-1.7 5-3.3 5-5.2 0-2.3-1.5-3.9-4.8-3.9 -3.3 0-5.7 1.7-6.5 4.1l-11.8-5.7c2.3-5.7 8.3-9.1 18.5-9.1 9.9 0 16.3 4.8 16.3 11.6 0 5.4-3.2 9.2-11.8 12.8l-3.9 1.6c-4.4 1.8-5.3 3.4-5.3 5 0 2.2 1.6 3.6 5 3.6 4.1 0 6.3-2.1 7.2-4.5l11.7 5.7c-2.8 6.5-9.6 10-19.9 10zm-1.8-54.3c-7.2 0-11.8 3.5-11.8 8.2 0 4.9 4.6 8 11.8 8s11.8-3.1 11.8-8c0-4.7-4.6-8.2-11.8-8.2z"/>
        <style>{`
            path { 
                animation: float 3s ease-in-out infinite;
                transform-origin: center;
            }
        `}</style>
    </svg>
);

export const AnimatedNextJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="64" cy="64" r="64" fill="black"/>
        <path d="M83.415 41.531H94.888L55.122 98.421H43.649L83.415 41.531Z" fill="url(#next-grad)"/>
        <path d="M102.352 41.531V98.421H92.8V53.863L102.352 41.531Z" fill="white"/>
        <defs>
            <linearGradient id="next-grad" x1="55.122" y1="98.421" x2="94.888" y2="41.531" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
        </defs>
         <style>{`
            path { 
                animation: float 4s ease-in-out infinite;
            }
            path:nth-of-type(2) {
                animation-delay: 0.2s;
            }
        `}</style>
    </svg>
);

export const AnimatedTailwindIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="#38bdf8" d="M16 4.668c-4.238 0-6.356 3.059-8.529 6.118-1.78 2.508-3.56 5.016-5.112 7.106-1.077 1.446-.188 2.809 1.42 2.809h5.112c.983 0 1.966-.376 2.62-1.031s1.077-1.591 1.077-2.62c0-1.446-1.121-3.652-2.054-5.341-.933-1.688-1.591-2.809-1.591-3.56s.61-1.315 1.826-1.315c1.216 0 2.244 1.031 3.226 3.059s1.78 4.089 1.78 4.841c0 .933-.563 1.826-1.591 2.578s-2.244 1.121-3.56 1.121h-2.185a.75.75 0 000 1.5h2.185c1.78 0 3.56-.563 5.112-1.639s2.857-2.62 3.84-4.555c.983-1.935 1.468-3.823 1.468-5.558 0-4.238-3.156-6.356-6.356-6.356zM22.888 13.197c-4.238 0-6.356 3.059-8.529 6.118-1.78 2.508-3.56 5.016-5.112 7.106-1.077 1.446-.188 2.809 1.42 2.809h5.112c.983 0 1.966-.376 2.62-1.031s1.077-1.591 1.077-2.62c0-1.446-1.121-3.652-2.054-5.341-.933-1.688-1.591-2.809-1.591-3.56s.61-1.315 1.826-1.315c1.216 0 2.244 1.031 3.226 3.059s1.78 4.089 1.78 4.841c0 .933-.563 1.826-1.591 2.578s-2.244 1.121-3.56 1.121h-2.185a.75.75 0 000 1.5h2.185c1.78 0 3.56-.563 5.112-1.639s2.857-2.62 3.84-4.555c.983-1.935 1.468-3.823 1.468-5.558 0-4.238-3.156-6.356-6.356-6.356z"/>
        <style>{`
             path {
                 animation: float 3s ease-in-out infinite alternate;
             }
             path:last-child {
                animation-delay: 0.3s;
             }
        `}</style>
    </svg>
);

export const AnimatedNodeJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M11.75 22.25c-5.15 0-9.33-4.18-9.33-9.33s4.18-9.33 9.33-9.33 9.33 4.18 9.33 9.33-4.18 9.33-9.33 9.33zm0-17.16c-4.32 0-7.83 3.51-7.83 7.83s3.51 7.83 7.83 7.83 7.83-3.51 7.83-7.83-3.51-7.83-7.83-7.83z" fill="#8CC84B" />
        <path d="M12.01 5.54l-6.13 10.61h2.32l1.3-2.25h4.99l1.3 2.25h2.32L12.01 5.54zm-1.01 7.23l2.03-3.51 2.03 3.51h-4.06z" fill="#8CC84B" />
        <style>{`
            path {
                animation: pulse 4s ease-in-out infinite;
                transform-origin: center;
            }
        `}</style>
    </svg>
);

export const AnimatedGraphQLIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g>
            <path fill="#E10098" d="M200 400L55.8 313.1 32.2 79.8l167.8-79.8 144.2 86.9 23.6 233.1z"/>
            <path fill="#FFF" d="M200 400V0l167.8 79.8-23.6 233.1z"/>
            <circle cx="200" cy="200" r="40" fill="#E10098" className="pulse-center"/>
            <circle cx="316.5" cy="115.7" r="25" fill="#E10098" className="pulse-node"/>
            <circle cx="83.5" cy="115.7" r="25" fill="#E10098" className="pulse-node" style={{animationDelay: '0.2s'}}/>
            <circle cx="83.5" cy="284.3" r="25" fill="#E10098" className="pulse-node" style={{animationDelay: '0.4s'}}/>
            <circle cx="316.5" cy="284.3" r="25" fill="#E10098" className="pulse-node" style={{animationDelay: '0.6s'}}/>
            <circle cx="200" cy="40" r="25" fill="#E10098" className="pulse-node" style={{animationDelay: '0.8s'}}/>
            <circle cx="200" cy="360" r="25" fill="#E10098" className="pulse-node" style={{animationDelay: '1s'}}/>
            <g stroke="#FFF" strokeWidth="8">
                <line x1="200" y1="200" x2="316.5" y2="115.7"/>
                <line x1="200" y1="200" x2="83.5" y2="115.7"/>
                <line x1="200" y1="200" x2="83.5" y2="284.3"/>
                <line x1="200" y1="200" x2="316.5" y2="284.3"/>
                <line x1="200" y1="200" x2="200" y2="40"/>
                <line x1="200" y1="200" x2="200" y2="360"/>
            </g>
        </g>
        <style>{`
            @keyframes pulse-gql {
                0%, 100% { transform: scale(0.9); opacity: 0.8; }
                50% { transform: scale(1.1); opacity: 1; }
            }
            .pulse-node {
                animation: pulse-gql 3s infinite ease-in-out;
                transform-origin: center;
            }
            .pulse-center {
                 animation: pulse-gql 2s infinite ease-in-out;
                transform-origin: center;
            }
        `}</style>
    </svg>
);


export const AnimatedUiUxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.373 3.62678L15.544 6.45575M20.373 5.62678L17.544 8.45575" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path className="drawing" d="M8 12.5C9.5 11 12 11.5 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <style>{`
            .drawing {
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
                animation: draw-line 2s forwards infinite alternate;
            }
        `}</style>
    </svg>
);

export const AnimatedFigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g>
            <path d="M12 12a3 3 0 11-6 0 3 3 0 016 0z" fill="#f24e1e" className="figma-part" style={{ animationDelay: '0s' }}/>
            <path d="M9 3a3 3 0 000 6h3V3H9z" fill="#ff7262" className="figma-part" style={{ animationDelay: '0.2s' }}/>
            <path d="M15 9a3 3 0 01-3-3h3v3z" fill="#a259ff" className="figma-part" style={{ animationDelay: '0.4s' }}/>
            <path d="M9 15a3 3 0 003 3V9H9v6z" fill="#1abcfe" className="figma-part" style={{ animationDelay: '0.6s' }}/>
            <path d="M15 15a3 3 0 01-3 3v-3h3z" fill="#0acf83" className="figma-part" style={{ animationDelay: '0.8s' }}/>
        </g>
        <style>{`
            @keyframes figma-fade {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
            }
            .figma-part {
                animation: figma-fade 5s infinite;
            }
        `}</style>
    </svg>
);

export const AnimatedGithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
        <style>{`
            path {
                animation: pulse 4s ease-in-out infinite;
                transform-origin: center;
            }
        `}</style>
    </svg>
);

export const AnimatedDockerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21.17 9.25a4.42 4.42 0 0 0-3.41-1.46h-1.55V6.73h1.55a2.15 2.15 0 0 1 0 4.3h-1.55V9.25h1.55c.8 0 1.54.21 2.18.59a2.5 2.5 0 0 1 1.23 2.16v.08a2.6 2.6 0 0 1-2.6 2.6h-1.55v1.07h1.55a4.42 4.42 0 0 0 3.41-1.46c.92-.93 1.48-2.2 1.48-3.58s-.56-2.65-1.48-3.58zM16.21 3.23a2.15 2.15 0 0 0 0 4.3h-1.55V3.23h1.55zM12.83 3.23a2.15 2.15 0 0 0 0 4.3h-1.55V3.23h1.55zM9.45 3.23a2.15 2.15 0 0 0 0 4.3H7.9V3.23h1.55zM6.07 3.23a2.15 2.15 0 0 0 0 4.3H4.52V3.23h1.55zM2.69 3.23a2.15 2.15 0 0 0 0 4.3H1.14V3.23h1.55zM12.12 19.34c.03 2.37-1.78 4.32-3.97 4.32a4.1 4.1 0 0 1-4.1-4.1c0-2.27 1.84-4.1 4.1-4.1h8.21c2.27 0 4.1 1.84 4.1 4.1s-1.84 4.1-4.1 4.1c-2.19 0-4-1.95-3.97-4.32h-0.27z" fill="#0db7ed"/>
        <style>{`
            path { animation: float 4s ease-in-out infinite; }
        `}</style>
    </svg>
);

export const AnimatedKubernetesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm7.5 13.5l-7.5 4-7.5-4v-7l7.5-4 7.5 4v7z" fill="#326ce5"/>
        <path d="M12 11.5l6-3.2-6-3.3-6 3.3 6 3.2zm-1 1.2v6.8l-5.5-2.8V9.7l5.5 2.8zm2 0l5.5-2.8v6.2l-5.5 2.8v-6.2z" fill="#326ce5"/>
        <style>{`
             path {
                animation: pulse 4s ease-in-out infinite;
                transform-origin: center;
             }
        `}</style>
    </svg>
);

export const AnimatedPythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 22a10 10 0 0 1-9.95-9H12v9.95z" fill="#306998"/>
        <path d="M2.05 13a10 10 0 0 1 9.95-9V13H2.05z" fill="#FFD43B"/>
        <path d="M12 2a10 10 0 0 1 9.95 9H12V2z" fill="#FFD43B"/>
        <path d="M21.95 11a10 10 0 0 1-9.95 9v-9h9.95z" fill="#306998"/>
        <circle cx="15.5" cy="5.5" r="1.5" fill="#fff" className="py-eye"/>
        <circle cx="8.5" cy="18.5" r="1.5" fill="#fff" className="py-eye"/>
        <style>{`
            @keyframes blink { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }
            .py-eye { animation: blink 3s infinite; transform-origin: center; }
            .py-eye:last-of-type { animation-delay: 0.2s; }
        `}</style>
    </svg>
);

export const AnimatedAWSIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M0 0h180v180H0z" fill="#232F3E"/>
        <path d="M57 91c0 5 4 9 9 9h48c5 0 9-4 9-9s-4-9-9-9H66c-5 0-9 4-9 9z" fill="#FF9900"/>
        <path d="M90 35c-30 0-55 25-55 55s25 55 55 55 55-25 55-55-25-55-55-55zm0 99c-24 0-44-20-44-44s20-44 44-44 44 20 44 44-20 44-44 44z" fill="#fff"/>
        <path d="M113 113c-1 1-3 2-4 2-2 0-3-1-3-3v-5c0-2-1-3-3-3s-3 1-3 3v2c0 2-1 3-3 3s-3-1-3-3v-2c0-2-1-3-3-3s-3 1-3 3v5c0 2-1 3-3 3-2 0-3-1-4-2-1-1-2-3-2-4 0-2 1-3 3-3h3v-2c0-2 1-3 3-3s-3-1-3-3v-2c0-2 1-3 3-3s3 1 3 3v2c0 2 1 3 3 3s3-1 3-3v-2c0-2 1-3 3-3s3 1 3 3v2c0 2 1-3 3-3s3 1 3 3v2c0 2-1 3-3 3s3 1 3 3v2h3c2 0 3 1 3 3 0 1-1 3-2 4z" fill="#fff"/>
        <style>{`
            path { animation: float 3s ease-in-out infinite; }
            path:nth-of-type(2) { animation-delay: -1.5s; }
            path:nth-of-type(4) { animation-delay: -1s; }
        `}</style>
    </svg>
);