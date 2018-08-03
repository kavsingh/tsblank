module.exports = {
  env: { es6: true, node: true, browser: false },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: { node: true, jest: true },
    },
    {
      // Change glob for code that targets browsers
      files: ['src/**'],
      env: { node: false, browser: true },
    },
  ],
};
