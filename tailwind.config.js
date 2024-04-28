/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#111111"
      },
      fontFamily: {
        bebas: ["Bebas Neue",' sans serif'],
      },
    },
  },
  plugins: [],
}