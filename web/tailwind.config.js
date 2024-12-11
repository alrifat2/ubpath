/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fdfbf8",
      },
      fontFamily: {
        inter: ['"Inter"', "sans-serif"], // Add this line
      },
    },
  },
  plugins: [],
};
