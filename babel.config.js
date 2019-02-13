module.exports = ({ env }) => ({
  presets: [
    ['@babel/preset-env', { modules: env('test') ? 'commonjs' : false }],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
});
