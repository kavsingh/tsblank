module.exports = ({ env }) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        shippedProposals: true,
        corejs: 3,
        modules: env('test') || process.env.BABEL_NODE ? 'commonjs' : false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      { alias: { '~': './src' }, extensions: ['.ts', '.js'] },
    ],
    ['@babel/plugin-transform-runtime', { regenerator: true }],
  ],
});
