/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans:    ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Bebas Neue', 'DM Sans', 'system-ui', 'sans-serif'],
        body:    ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#4FFFB0',
          dark:    '#00D68F',
          dim:     'rgba(79,255,176,0.12)',
          border:  'rgba(79,255,176,0.25)',
          glow:    'rgba(79,255,176,0.35)',
        },
        aurora: {
          purple: '#7B61FF',
          teal:   '#0BFFE4',
          pink:   '#FF2D78',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          hover:   'rgba(255,255,255,0.07)',
          border:  'rgba(255,255,255,0.10)',
          strong:  'rgba(255,255,255,0.12)',
        },
        background: 'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
      },
      spacing: {
        'safe-top':    'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left':   'env(safe-area-inset-left)',
        'safe-right':  'env(safe-area-inset-right)',
      },
      animation: {
        'fade-in':      'fadeIn 0.7s ease-out',
        'fade-in-up':   'fadeInUp 0.7s ease-out',
        'brand-pulse':  'brandPulse 2s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'scroll-down':  'scrollDown 1.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp:  {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        brandPulse: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(79,255,176,0.4)' },
          '50%':     { boxShadow: '0 0 0 8px rgba(79,255,176,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.5' },
          '50%':     { opacity: '1' },
        },
        scrollDown: {
          '0%':   { transform: 'translateY(0)', opacity: '1' },
          '75%':  { transform: 'translateY(8px)', opacity: '0' },
          '76%':  { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      borderRadius: {
        lg:  'var(--radius)',
        md:  'calc(var(--radius) - 2px)',
        sm:  'calc(var(--radius) - 4px)',
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter:  '-0.04em',
        tight:    '-0.03em',
      },
    },
  },
  plugins: [],
}
