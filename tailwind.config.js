/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DEDBC8",
        accent: "#8FE8D2",
        ink: "#070707",
        panel: "#101010",
        card: "#212121",
      },
      fontFamily: {
        serif: ["Almarai", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(143, 232, 210, 0.14)",
      },
    },
  },
  plugins: [],
};
