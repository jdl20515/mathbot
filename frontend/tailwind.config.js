/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./src/**/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      spacing: {
        '90': '31rem',
      }
    }
  },
  plugins: [],
};
