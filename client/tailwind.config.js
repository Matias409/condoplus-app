/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        success: '#4ADE80',
        warning: '#F472B6',
        pending: '#FCD34D',
      }
    },
  },
  plugins: [],
}
