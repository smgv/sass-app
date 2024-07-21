/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "var(--app-primary-900)",
          800: "var(--app-primary-800)",
          700: "var(--app-primary-700)",
          600: "var(--app-primary-600)",
          500: "var(--app-primary-500)",
          400: "var(--app-primary-400)",
          300: "var(--app-primary-300)",
          200: "var(--app-primary-200)",
          100: "var(--app-primary-100)",
          50: "var(--app-primary-50)",
        },
        gray: {
          900: "var(--app-gray-900)",
          800: "var(--app-gray-800)",
          700: "var(--app-gray-700)",
          600: "var(--app-gray-600)",
          500: "var(--app-gray-500)",
          400: "var(--app-gray-400)",
          300: "var(--app-gray-300)",
          200: "var(--app-gray-200)",
          100: "var(--app-gray-100)",
          50: "var(--app-gray-50)",
        },
        success: "var(--app-success)",
        warning: "var(--app-warning)",
        error: "var(--app-error)",
        info: "var(--app-info)",
        white: "var(--app-white)",
        gold: "var(--app-gold)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
