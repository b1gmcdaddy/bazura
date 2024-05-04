/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      letterSpacing: {
        newLS: "0.3em",
      },
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
};
