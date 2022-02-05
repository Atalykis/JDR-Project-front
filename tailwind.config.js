// tailwind.config.js
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff4800',
      },
      spacing: {
        auto: 'auto',
      },
    },
  },
  // specify other options here
};
