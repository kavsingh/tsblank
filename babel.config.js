module.exports = ({ env }) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        shippedProposals: true,
        loose: true,
        ...(env === 'test' ? { modules: 'commonjs', useBuiltIns: false } : {}),
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
});
