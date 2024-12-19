/** @type {import('tailwindcss').Config} */
import sharedConfig from "@repo/tailwind-config";

module.exports = {
  presets: [sharedConfig],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}", // Include JS, JSX, TS, and TSX files in pages
    "./components/**/*.{js,jsx,ts,tsx}", // Include JS, JSX, TS, and TSX files in components
    "./app/**/*.{js,jsx,ts,tsx}", // Include JS, JSX, TS, and TSX files in the app directory
    "./src/**/*.{js,jsx,ts,tsx}", // Include JS, JSX, TS, and TSX files in the src directory
  ],
  prefix: "",
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
