/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22c55e', // verde
          dark: '#16a34a',
          light: '#4ade80',
        },
        secondary: {
          DEFAULT: '#111111',
          light: '#1a1a1a',
          dark: '#000000',
        },
        dark: {
          DEFAULT: '#000000',
          light: '#111111',
          card: '#1a1a1a',
          border: '#333333',
        },
      },
      backgroundColor: {
        'dark-gradient': 'linear-gradient(180deg, #000000 0%, #111111 100%)',
      },
    },
  },
  plugins: [],
};