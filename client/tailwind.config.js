const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",  // Make sure your paths are correct here
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
        primaryHover: '#F71F4A',
        boxColor: '#3434CB',
      },
    },
  },
  plugins: [
    plugin(function({addUtilities}){
      addUtilities({
        '.text-shadow-blue':{
          textShadow:'2px 2px #3B82F6',
        },
      },['hover'])
    }),
  ],
}
