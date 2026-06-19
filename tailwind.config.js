/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#070406',
          900: '#0a0608',
          800: '#100a0d',
          700: '#160e12',
          600: '#1d1318',
        },
        blood: {
          50: '#fff1f2',
          100: '#ffe0e2',
          200: '#ffc4c8',
          300: '#ff9aa1',
          400: '#ff5560',
          500: '#ff1f30',
          600: '#e10f20',
          700: '#bd0a18',
          800: '#9a0c18',
          900: '#7f0e19',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,31,48,0.35), 0 0 22px -4px rgba(255,31,48,0.55)',
        'glow-lg': '0 0 0 1px rgba(255,31,48,0.45), 0 0 45px -6px rgba(255,31,48,0.6)',
        'glow-soft': '0 0 30px -8px rgba(255,31,48,0.4)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,31,48,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,31,48,0.06) 1px, transparent 1px)',
        'radial-blood':
          'radial-gradient(60% 50% at 50% 0%, rgba(255,31,48,0.18), transparent 70%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.22,1,0.36,1) both',
        'pulse-glow': 'pulseGlow 3.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
}
