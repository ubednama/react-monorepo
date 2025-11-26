/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        figmaGreen: "#B9FF66",
        figmaDark: "#191A23"
      }
    },
  },
  plugins: [],
}