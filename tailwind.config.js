/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B4FDB',
        accent: '#00A67E',
        background: '#F7F7F7',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        mono: ['"Source Code Pro"', 'monospace'],
      },
    },
  },
  plugins: [],
}
