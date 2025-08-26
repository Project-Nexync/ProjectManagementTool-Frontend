/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        helveticaThin: ["HelveticaThin", "sans-serif"],
        helveticaMedium: ["HelveticaMedium", "sans-serif"],
      },
    },
  },
  plugins: [],
}
