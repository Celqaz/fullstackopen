/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors:{
        primary: '#f5f5f5',
        secondary: '#7dd3fc',
      },
    },
    plugins: [],
  }
}
