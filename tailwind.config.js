/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6ba3e8', // Soft Blue
          DEFAULT: '#4A90E2',
          dark: '#357abd',
        },
        secondary: {
          light: '#72d693', // Calm Green
          DEFAULT: '#50C878',
          dark: '#3ea65e',
        },
        background: {
          light: '#ffffff',
          DEFAULT: '#F9FAFB', // Warm White
          dark: '#f3f4f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
