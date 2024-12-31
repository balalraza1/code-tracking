/** @type {import('tailwindcss').Config} */
import sharedConfig from "@repo/tailwind-config";

module.exports = {
  presets: [sharedConfig],
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include JS, JSX, TS, and TSX files in the src directory
  ],
  prefix: "",
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
