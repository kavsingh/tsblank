module.exports = {
  presets: [
    'babel-preset-solid',
    [
      '@babel/preset-env',
      { useBuiltIns: 'usage', shippedProposals: true, corejs: 3 },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      { alias: { '~': './src' }, extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    ],
    ['@babel/plugin-transform-runtime', { regenerator: true }],
  ],
};
