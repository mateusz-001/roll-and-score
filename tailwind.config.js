/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F9F6F1',
        text: '#1F1F1F',
        primary: '#9B5DE5',
        secondary: '#CDB4DB',
        accent: '#FDCB6E',
        gray: '#DADADA',
        'dark-gray': '#AAAAAA',
        'dark-bg': '#181621',
        'dark-card': '#2D1E4A',
      },
      fontFamily: {
        heading: ['Chillax', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        'heading-2': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        'heading-3': ['1.5rem', { lineHeight: '2rem' }], // 24px
        'heading-4': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'body-base': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'body-xs': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'body-xxs': ['0.625rem', { lineHeight: '1rem' }], // 10px
      },
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0px 2px 8px rgba(0, 0, 0, 0.06)',
        button: '0px 4px 12px rgba(155, 93, 229, 0.4)',
      },
      spacing: {
        18: '4.5rem', // 72px
      },
    },
  },
  plugins: [],
};
