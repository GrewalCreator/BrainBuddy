module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans your React files
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
  plugins: [],
};