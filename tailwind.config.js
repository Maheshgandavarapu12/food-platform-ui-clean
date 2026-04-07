/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/app/**/*.{html,ts}",
    "./src/app/features/**/*.{html,ts}",
    "./src/app/layout/**/*.{html,ts}",
    "./src/app/shared/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4CAF50',  // main green
          600: '#43a047',  // buttons
          700: '#388e3c',  // hover
          800: '#2e7d32',
          900: '#1B5E20',  // dark green
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}