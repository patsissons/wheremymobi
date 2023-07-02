/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        mobi: '#007fb3',
      },
      screens: {
        xs: '400px',
      },
    },
  },
};
