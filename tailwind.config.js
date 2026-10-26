/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        kidYellow: '#FCD34D',
        kidGreen: '#34D399',
        kidPink: '#F472B6',
        kidPurple: '#A78BFA',
        kidOrange: '#FB923C',
      },
      fontFamily: {
        sans: [
          'Fredoka',
          'Comic Neue',
          'Nunito',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      animation: {
        'bounce-short': 'bounce 0.5s ease-in-out 1',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'pop': 'pop 0.25s ease-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.92)' },
          '70%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}

