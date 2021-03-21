import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { ConfigurationFactory } from 'webpack';

const fromRoot = path.resolve.bind(null, __dirname);
const isProd = (env: Parameters<ConfigurationFactory>[0]) =>
  typeof env === 'string' ? env === 'production' : !!env?.production;

const configuration: ConfigurationFactory = (env) => ({
  target: 'web',
  mode: isProd(env) ? 'production' : 'development',
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
        test: /\.[jt]s$/,
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
