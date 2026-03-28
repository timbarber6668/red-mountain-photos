/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'rmp-cream': '#F5F3F0',      // warm off-white
        'rmp-gray': '#6B6B65',       // muted gray
        'rmp-charcoal': '#1A1A1A',   // deep charcoal text
        'rmp-red': '#8B4545',        // warm terracotta accent
        'rmp-divider': '#1A1A1A',    // charcoal dividers
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        georgia: ['Georgia', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
