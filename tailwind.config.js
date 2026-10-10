/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#050B18",
        deep: "#0A1224",
        electric: "#168BFF",
        cyanx: "#00D4FF",
        muted: "#B7C3D7",
        violetx: "#7C3AED",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(22,139,255,0.35)",
        card: "0 10px 40px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
