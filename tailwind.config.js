/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          '02': '#FFFFFF',
        },
        glass: {
          '02': 'rgba(255, 255, 255, 0.05)',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        '32': '32px',
        '46': '46px',
        '55': '55px',
      },
      backdropBlur: {
        '6.1': '6.1px',
        '65': '65.05px',
      },
      borderRadius: {
        '20': '20px',
      },
    },
  },
  plugins: [],
}
