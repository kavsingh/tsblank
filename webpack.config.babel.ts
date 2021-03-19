import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration } from 'webpack';

const fromRoot = path.resolve.bind(null, __dirname);
const isProd = (env: Record<string, unknown>) => env.production === true;

const configuration = (env: Record<string, unknown>): Configuration => ({
  mode: isProd(env) ? 'production' : 'development',
  target: 'web',
  devtool: isProd(env) ? 'source-map' : 'inline-source-map',
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    filename: isProd(env) ? '[name].[contenthash].js' : '[name].js',
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
