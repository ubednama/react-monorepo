/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'hover:bg-violet-500',
    'hover:none',
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   satoshi: "Satoshi Variable, sans-serif;",
      // },
    },
  },
  plugins: [],
};
