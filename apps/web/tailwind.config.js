/** @type {import('tailwindcss').Config} */
const tokens = require('../../packages/design-tokens/src/tailwindExtend')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: tokens.theme,
  plugins: [],
}

