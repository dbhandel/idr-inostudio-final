import path from 'path';
import webpack from 'webpack';
import Config from 'webpack-config';

import PATHS from '../paths';

const HOST = 'localhost';
const LOCAL = `http://${HOST}:8080`;

export default new Config().extend({
  '[root]/client.js': config => {
    config.module.loaders[2].query.plugins.push(
      'react-hot-loader/babel',
    );
    return config;
  },
}).merge({
  entry: {
    javascript: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?${LOCAL}`,
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      path.join(PATHS.app, 'client.js'),
    ],
  },

  devtool: 'source-map',

  devServer: {

    // bind our dev server to 0.0.0.0
    host: HOST,

    // link HTTP -> app/public, so static assets are being pulled from
    // our source directory and not the not-yet-existent 'dist' folder
    contentBase: PATHS.public,

    // Assume app/public is the root of our dev server
    publicPath: '/',

    // Inline our code, so we wind up with one, giant bundle
    inline: true,

    // Hot reload FTW! Every change is pushed down to the browser
    // with no refreshes
    hot: true,

    // Statistics on the build
    stats: false,

    // We're using React Router for all routes, so redirect 404s
    // back to the webpack-dev-server bootstrap HTML
    historyApiFallback: {
      index: '/webpack.html',
    },

    // Proxy, to point to the right API URL
    proxy: {
      '/api': {
        target: process.env.npm_package_config_api_url,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      },
    ],
  },

  output: {
    path: PATHS.distPublic,
    sourceMapFilename: '[file].map',
    publicPath: `${LOCAL}/`,
    filename: '[name].js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
