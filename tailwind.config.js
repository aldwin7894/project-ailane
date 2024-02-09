/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import typographyPlugin from "@tailwindcss/typography";
import formsPlugin from "@tailwindcss/forms";
import aspectRatioPlugin from "@tailwindcss/aspect-ratio";
import animatecssPlugin from "tailwindcss-animatecss";
import prelinePlugin from "preline/plugin";

export default {
  content: [
    "./src/renderer/**/*.{js,jsx,ts,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "media", // or 'class'
  theme: {
    extend: {
      animation: {
        "spin-reduce": "spin 1.5s linear infinite",
      },
      backgroundColor: {
        white: "#fafafa",
        black: "#202020",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      borderWidth: {
        16: "16px",
      },
      colors: {
        "bg--dark": "#0B1622",
        "fg--dark": "#151F2E",
        "bg--light": "#E5EBF1",
        "fg--light": "#FBFBFB",
        "text--dark": "#9FADBD",
        "text--light": "#26343F",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 0 20px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['"Source Sans Pro"', "Inter", ...defaultTheme.fontFamily.sans],
      serif: defaultTheme.fontFamily.serif,
      mono: defaultTheme.fontFamily.mono,
    },
    animatedSettings: {
      animatedSpeed: 500,
      animationDelaySpeed: 500,
      classes: ["fadeIn", "fadeOut", "delay"],
    },
  },
  plugins: [
    prelinePlugin,
    typographyPlugin,
    formsPlugin,
    aspectRatioPlugin,
    animatecssPlugin,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": value => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
