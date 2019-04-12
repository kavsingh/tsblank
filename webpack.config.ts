import path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const fromRoot = path.resolve.bind(null, __dirname);
const isProduction = process.env.NODE_ENV === 'production';
const publicPath = '';

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    publicPath,
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
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
  },
  plugins: [
    new EnvironmentPlugin({ NODE_ENV: 'development' }),
    new HtmlWebpackPlugin({
      title: 'app',
      template: fromRoot('src/index.html'),
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

export default config;
