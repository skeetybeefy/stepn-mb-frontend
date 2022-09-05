/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'fhd': '1920px',
        '2k': '2560px',
        '4k': '3840px'
      },
      colors: {
        primary: "#2C3333",
        secondary: "#395B64",
        accent: "#A5C9CA",
        action: "#E7F6F2",
        error: "#A92424",
        warning: "#b5841b"
      },
      keyframes: {
        fadeinout: {
          "0%, 100%": {opacity: "1"},
          "50%": {opacity: "0"}
        }
      }
    },
  },
  plugins: [],
}
