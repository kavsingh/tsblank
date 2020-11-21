import path from 'path';

import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const envMatches = (matcher: RegExp) => (env = '') => matcher.test(env);

const fromRoot = path.resolve.bind(null, __dirname);
const isProd = envMatches(/production/);

const configuration = (env: string): Configuration => ({
  mode: isProd(env) ? 'production' : 'development',
  target: 'web',
  devtool: isProd(env) ? 'source-map' : 'inline-source-map',
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    filename: isProd(env) ? '[name].[chunkhash].js' : '[name].js',
    path: fromRoot('dist'),
  },
  module: {
    rules: [
      {
        test: /\.[jt]s?$/,
        exclude: fromRoot('node_modules'),
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'app',
      template: fromRoot('src/index.html'),
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
});

export default configuration;
