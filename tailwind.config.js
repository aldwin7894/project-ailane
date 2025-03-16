/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from "@iconify/tailwind";
import aspectRatioPlugin from "@tailwindcss/aspect-ratio";
import typographyPlugin from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import animatecssPlugin from "tailwindcss-animatecss";

export default {
  content: ["./src/renderer/**/*.{js,jsx,ts,tsx}"],
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
    typographyPlugin,
    formsPlugin,
    aspectRatioPlugin,
    animatecssPlugin,
    addDynamicIconSelectors(),
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
