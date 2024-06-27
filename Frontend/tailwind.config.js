/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "fond":"url('/src/app/assets/search.png')"
      }
    },
  },
  plugins: [],
}
