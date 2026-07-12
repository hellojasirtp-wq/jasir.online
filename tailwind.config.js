/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: '#050816',
        primary: '#6C63FF',
        secondary: '#00D4FF',
        accent: '#FF4D8D',
        highlight: '#00FFB3',
        textMain: '#FFFFFF',
        muted: '#94A3B8',
        cardBg: 'rgba(10, 15, 30, 0.7)',
        borderBg: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'aurora-slow': 'aurora 20s infinite linear',
        'float-slow': 'float 8s infinite ease-in-out',
        'float-medium': 'float 5s infinite ease-in-out',
        'float-fast': 'float 3s infinite ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'grid-slide': 'gridSlide 20s infinite linear',
        'border-flow': 'borderFlow 4s infinite linear',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '50%': { transform: 'translate(50px, 100px) rotate(180deg)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 15px rgba(108, 99, 255, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 30px rgba(108, 99, 255, 0.8)' },
        },
        gridSlide: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' }, // Height of one grid square
        },
        borderFlow: {
          '0%': { 'border-color': 'rgba(108, 99, 255, 0.2)' },
          '50%': { 'border-color': 'rgba(0, 212, 255, 0.8)' },
          '100%': { 'border-color': 'rgba(108, 99, 255, 0.2)' },
        }
      },
      boxShadow: {
        'neon-primary': '0 0 20px rgba(108, 99, 255, 0.4)',
        'neon-secondary': '0 0 20px rgba(0, 212, 255, 0.4)',
        'neon-accent': '0 0 20px rgba(255, 77, 141, 0.4)',
        'neon-highlight': '0 0 20px rgba(0, 255, 179, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'glass': '12px',
      }
    },
  },
  plugins: [],
}
