module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          800: '#242124',
          900: '#100f10',
          DEFAULT: '#000000'
        }
      },
      animation: {
        'shadow-big': 'shadow-big 3s ease-in-out infinite',
        '3d-rotation': '3d-rotation 2s cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        'shadow-big': {
          '0%, 100%': { boxShadow: '0px 0px 100px 100px #242124;' },
          '50%': { boxShadow: '0px 0px 100px 100px #1c1a1c;' }
        },
        '3d-rotation': {
          '0%': { transform: 'rotate3d(0, 1, 0, 0deg)' },
          '100%': { transform: 'rotate3d(0, 1, 0, 1440deg)' },
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        'russo': ['Ruda', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
      },
      cursor: {
        none: 'none'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
