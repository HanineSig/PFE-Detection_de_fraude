/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0A1931',
        'secondary-blue-light': '#B3CFE5',
        'secondary-blue-mid': '#4A7FA7',
        'secondary-blue-dark': '#1A3D63',
        'background-light': '#F6FAFD',
        'color-success': '#22C55E',
        'color-warning': '#F59E0B',
        'color-danger': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
