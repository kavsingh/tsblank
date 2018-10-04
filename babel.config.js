module.exports = {
  presets: [
    // modules, according to docs, defaults to commonjs
    // leaving this option out, however, causes tests to fail. maybe docs wrong
    ['@babel/preset-env', { modules: 'commonjs' }],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
