/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{jsx,js,ts,tsx}",
    "./public/**/*.html",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    color: {
      dark: {
        blue: "#001531",
      },
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      text: "rgb(var(--color-text) / <alpha-value>)",
      light: "rgb(var(--color-light) / <alpha-value>)",
      success: "rgb(var(--color-success) / <alpha-value>)",
      info: "rgb(var(--color-info) / <alpha-value>)",
      warn: "rgb(var(--color-warn) / <alpha-value>)",
      error: "rgb(var(--color-error) / <alpha-value>)",
      transparent: "transparent",
      current: "currentColor",
    },
    extend: {
      colors: {
        darkmode: "#001531",
        lightmode: "#fafafa",
        colorone: "#EA0008",
        colortwo: "#FF383e",
        colorthree: "#0008EA",
        colorfour: "#383eff",
        colorfive: "#07d100",
        colorsix: "#3eff38",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
