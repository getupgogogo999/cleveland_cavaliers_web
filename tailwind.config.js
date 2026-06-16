/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cavs: {
          wine: '#6F263D',
          'wine-dark': '#4A1528',
          'wine-light': '#8B3450',
          gold: '#FFB81C',
          'gold-light': '#FFD56B',
          navy: '#041E42',
          cream: '#F5F0E8',
        },
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern':
          'radial-gradient(circle at 20% 50%, rgba(111,38,61,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,184,28,0.15) 0%, transparent 40%)',
        'card-shine':
          'linear-gradient(135deg, rgba(255,184,28,0.08) 0%, transparent 50%, rgba(111,38,61,0.08) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
