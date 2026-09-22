/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fit: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        slate: {
          850: '#151f32',
        }
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.03)',
        'glow-green': '0 0 20px -3px rgba(34, 197, 94, 0.35)',
      }
    },
  },
  plugins: [],
};
