/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tmhna-blue': '#0f2f5e',
        'tmhna-light-blue': '#4eb7ff',
        'sap-blue': '#0070F2',
        'sap-dark-blue': '#0057D2',
        'sap-nav-blue': '#0070F2',
        'jde-green': '#2E8B57',
        'legacy-orange': '#FF9800',
        'sap-gray': '#f5f5f5',
        'sap-border': '#e0e0e0',
      },
      fontFamily: {
        'sap': ['Arial', 'Helvetica', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        'sap': '2px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
}

