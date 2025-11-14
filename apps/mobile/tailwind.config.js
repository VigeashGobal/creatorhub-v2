/** @type {import('tailwindcss').Config} */
const tokens = require('../../packages/design-tokens/src/tailwindExtend')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: tokens.theme,
  plugins: [],
}


