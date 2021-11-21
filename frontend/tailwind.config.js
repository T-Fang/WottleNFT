module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    minWidth: {
      1200: '1200px',
    },
    maxWidth: {
      maxBody: '1730px',
      maxScreen: '100vw',
    },
    minHeight: {
      0: '0',
      240: '240px',
      320: '320px',
      640: '640px',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    extend: {
      zIndex: {
        '-10': '-10',
      },
      width: {
        450: '450px',
        500: '500px',
        600: '600px',
        1000: '1000px',
      },
      height: {
        '90vh': '90%',
      },
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        primary: {
          default: '#FAC748',
        },
      },
      backgroundImage: {
        'background-seascape': "url('/assets/background-seascape.png')",
        'angry-thermometer': "url('/assets/angry-thermometer.png')",
        'about-background': "url('/assets/about-background.png')",
        'blue-sea': "url('/assets/blue-sea.png')",
      },
    },
  },
  variants: {},
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/line-clamp')],
};
