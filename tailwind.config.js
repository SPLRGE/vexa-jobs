/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        // 'space-cadet': "#152757", // background color
        'primary-green': {
          50: '#e6fff2',
          100: '#ccffe5',
          200: '#99ffcb',
          300: '#66ffb2',
          400: '#33ff98',
          500: '#00ff7e', // primary color
          600: '#00cc65',
          700: '#00994c',
          800: '#006632',
          900: '#003319',
        },
        'gradient-eucalyptus': '#46DDB4',
        'gradient-guppie-green': '#06F47C',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
