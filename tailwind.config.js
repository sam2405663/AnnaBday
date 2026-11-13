/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FAF7F2',
          200: '#F5ECE3',
          300: '#EAD9C8'
        },
        blush: {
          100: '#FDEAE6',
          200: '#F9D4CD',
          300: '#F1B2A5',
          400: '#E58A7A',
          500: '#D46957',
          600: '#B84F3E'
        },
        roseGold: '#D89A8C',
        warmGold: '#C9A35E',
        romanticDark: '#332325',
        romanticMuted: '#6D5558'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        cozy: '0 10px 35px -5px rgba(212, 105, 87, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        polaroid: '0 12px 28px rgba(90, 50, 55, 0.12)',
        glow: '0 0 25px rgba(232, 165, 152, 0.55)',
        candle: '0 0 16px 4px rgba(255, 180, 50, 0.7)'
      }
    },
  },
  plugins: [],
};

