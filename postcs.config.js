module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      config: './tailwind.config.js', // Optional, but recommended
    }), 
    autoprefixer(),
  ],
};