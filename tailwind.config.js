// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          600: '#2d6a4f',
          700: '#1b4332',
          800: '#143d2a',
          900: '#0d2b1e',
        },
        earth: {
          400: '#c9784a',
          600: '#a85c2e',
          700: '#8b4a20',
        },
        bark: '#3d2b1f', // ← add this
        cream: '#fdf8f0',
        sand: {
          50: '#faf5eb',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
