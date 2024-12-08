import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      keyframes: {
        stamp: {
          from: { transform: "scale(2)" },
        },
        shake: {
          "0%": { transform: "translate(10px, 10px)" },
          "10%": { transform: "translate(-10px, -10px)" },
          "20%": { transform: "translate(8px, 8px)" },
          "30%": { transform: "translate(-8px, -8px)" },
          "40%": { transform: "translate(6px, 6px)" },
          "50%": { transform: "translate(-6px, -6px)" },
          "60%": { transform: "translate(4px, 4px)" },
          "70%": { transform: "translate(-4px, -4px)" },
          "80%": { transform: "translate(2px, 2px)" },
          "90%": { transform: "translate(-2px, -2px)" },
          "100%": { transform: "translate(0px, 0px)" },
        },
      },
      animation: {
        stamp: "stamp 0.4s cubic-bezier(0.5, 0, 1, 0) forwards",
        shake: "shake 0.4s linear forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
