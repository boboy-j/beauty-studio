/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f3',
          100: '#f9eddd',
          200: '#f2d9b8',
          300: '#e8bf8a',
          400: '#d4a574',
          500: '#c4956a',
          600: '#a87a52',
          700: '#8b5a2b',
          800: '#6e4622',
          900: '#5a3a1c',
        },
        rose: {
          400: '#f0a0c0',
          500: '#e880a8',
          600: '#d4608a',
        },
        skin: {
          50: '#fefcf9',
          100: '#fdf8f0',
          200: '#faf0e0',
          300: '#f5e3c8',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
