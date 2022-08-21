/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#3a0ca3",
      secondary: "#7209b7",
      info: "#f72585",
      sub: "#4361ee",
      extra: "#4cc9f0",
      error: "#e63946",
      warning: "#ffc300",
      success: "#00af54",
      light: "#e5e5e5",
      lighter: "#eeea",
      dark: "#323031",
      white: "#ffff",
    },
    screens: {
      xs: "600px",
      // => @media (min-width: 640px) { ... }

      sm: "650px",
      // => @media (min-width: 768px) { ... }

      md: "960px",
      // => @media (min-width: 1024px) { ... }

      lg: "1280px",
      // => @media (min-width: 1280px) { ... }

      xl: "1400px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("daisyui")],
};
