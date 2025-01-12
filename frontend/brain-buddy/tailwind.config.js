/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#faf7f2',
        },
        sage: {
          600: '#7c8f7e',
          700: '#6b7a6c',
        },
      },
    },
  },
  plugins: []
}

