/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neo-green': 'rgb(var(--neo-green) / <alpha-value>)',
        'neo-dark': 'rgb(var(--neo-dark) / <alpha-value>)',
        'neo-blue': 'rgb(var(--neo-blue) / <alpha-value>)',
        'neo-soft': 'rgb(var(--neo-soft) / <alpha-value>)',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};