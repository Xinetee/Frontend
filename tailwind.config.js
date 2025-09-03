/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./App.jsx",
    "./main.jsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}
