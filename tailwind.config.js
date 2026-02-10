/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        fishOrange: '#eb6f3a',
        darkBlue: '#0C0878',
        whiteText: '#F4F4F4',
        lightBlue: '#93C8E9',
      },
      fontFamily: {
        slackey: ['Slackey', 'cursive'],
        garamond: ['"EB Garamond"', 'serif'],
        lacquer: ['Lacquer', 'system-ui'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
