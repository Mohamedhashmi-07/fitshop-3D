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
        '3d-sm': '0 4px 12px -2px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        '3d-card': '0 10px 30px -8px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        '3d-card-hover': '0 22px 45px -10px rgba(15, 23, 42, 0.12), 0 12px 24px -5px rgba(22, 163, 74, 0.14), inset 0 1px 0 rgba(255, 255, 255, 1)',
        '3d-emerald': '0 12px 30px -6px rgba(22, 163, 74, 0.35), 0 4px 12px rgba(22, 163, 74, 0.2)',
        '3d-amber': '0 12px 30px -6px rgba(245, 158, 11, 0.35), 0 4px 12px rgba(245, 158, 11, 0.2)',
        '3d-float': '0 25px 50px -12px rgba(15, 23, 42, 0.18), 0 0 30px -5px rgba(22, 163, 74, 0.15)',
      }
    },
  },
  plugins: [],
};
