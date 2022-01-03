module.exports = {
  content: [
    './public/*.html', './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': ['Comfortaa', 'sans-serif']
      },
      colors: {
        'primary': '#2B67F6',
        'primary-bg': '#F4F7FF',
        'txt-black': '#333333',
        'txt-gray': '#A5A7A7'
      }, 
      boxShadow: {
        'mine': '0px 4px 30px rgba(0, 0, 0, 0.08)',
      },
      zIndex: {
        '-10': '-10',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      }
    }
  },
  plugins: [],
}
