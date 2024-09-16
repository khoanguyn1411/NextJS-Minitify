// tailwind.config.js
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        container: "1rem",
      },
      colors: {
        input: "#272729",
        ["input-hover"]: "#3f4045",
      },
      height: {
        header: "40px",
        main: "calc(100vh - 40px - 2rem)", // 2 rem is container padding.
        table: "calc(100vh - 40px - 2rem - 130px)", // 2 rem is container padding.
      },
      maxHeight: {
        table: "calc(100vh - 40px - 2rem - 130px)", // 2 rem is container padding.
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "appui",
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            background: "#0D001A",
            primary: {
              50: "#ffe2ff",
              100: "#f1b1ff",
              200: "#e47fff",
              300: "#d84cff",
              400: "#cd1aff",
              500: "#b400e6",
              600: "#8c00b4",
              700: "#650081",
              800: "#3d0050",
              900: "#17001f",
              DEFAULT: "#d84cff",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
          },
        },
      },
      layout: {
        disabledOpacity: "0.3",
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
    }),
  ],
};
