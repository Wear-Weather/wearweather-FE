export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'weather-light-gradient': 'linear-gradient(118.17deg, #F5AF16 -4.95%, #FFEA73 101.98%)',
        'weather-normal-gradient': 'linear-gradient(118.17deg, #29ACFF -4.95%, #BAE1FA 101.98%)',
        'weather-dark-gradient': 'linear-gradient(118.17deg, #0E3363 -4.95%, #4484D9 101.98%)',
      },
      colors: {
        black: '#000000',
        lightBlack: '#171719',
        darkGray: '#47484c',
        gray: '#858588',
        lightGray: '#c7c8c9',
        white: '#ffffff',
        disabled: '#dfdfe0',

        background: {
          white: '#FFFFFF',
          light: '#f7f7f8',
          gray: 'rgb(243 244 246)',
        },
        interactive: {
          default: '#989ba2',
          disabled: '#f4f4f5',
        },
        status: {
          success: '#00bf40',
          warning: '#ff9200',
          error: '#ff4242',
        },
        dimmer: {
          bg: 'rgba(23, 23, 25, 0.52)', // 171719 with 52% opacity
        },
        line: {
          lightest: '#f4f4f5',
          lighter: '#e8e8ea',
          light: '#e0e0e2',
        },
        primary: {
          main: '#1769ff',
          logo: '#000000',
        },
      },
      fontSize: {
        xs: '12px',
        s: '13px',
        m: '14px',
        l: '16px',
        xl: '18px',
        '2xl': '20px',
        '3xl': '24px',
      },
      fontWeight: {
        regular: '400',
        bold: '700',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out',
        fadeOut: 'fadeOut 0.3s ease-in',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  mode: 'jit',
};
