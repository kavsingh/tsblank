import path from 'path';

import { ConfigurationFactory } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const envMatches = (matcher: RegExp) => (
  env?: Parameters<ConfigurationFactory>[0],
) => matcher.test(typeof env === 'string' ? env : String(env?.NODE_ENV));

const fromRoot = path.resolve.bind(null, __dirname);
const isProd = envMatches(/production/);

const configuration: ConfigurationFactory = (env) => ({
  mode: isProd(env) ? 'production' : 'development',
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
    hot: true,
    port: 3000,
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
