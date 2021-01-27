module.exports = {
  plugins: {
    tailwindcss: {},
    ...(process.env.NODE_ENV === 'production') && {
      autoprefixer: {},
      '@fullhuman/postcss-purgecss': {
        content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      },
      'postcss-custom-properties': {},
      'postcss-preset-env': { stage: 1 },
      cssnano: { preset: 'default' },
    }
  },
}

// https://github.com/vercel/next.js/issues/10117#issuecomment-575263084

// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors

// postcss-import: canonical plugin for handling this with PostCSS
// postcss-custom-properties: if you need to support IE11 for css variables

// postcss-present-env includes css variables, nesting and autoprefixer. 
// So With the postcss-preset-env, you don't need to add separate plugins such as autoprefixer, postcss-nesting, postcss-nested, postcss-custom-properties