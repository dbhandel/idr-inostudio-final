/* eslint-disable import/no-dynamic-require */
import path from 'path';
import webpack from 'webpack';
import Config from 'webpack-config';

// other plug-ins
import CopyWebpackPlugin from 'copy-webpack-plugin';

import PATHS from '../paths';

export default new Config().extend('[root]/base.js').merge({
  entry: {
    client: [
      'babel-polyfill',
      path.join(PATHS.app, 'client.js'),
    ],
    vendor: [
      'react',
      'react-dom',
      'react-hot-loader',
      'react-router',
      'react-router-scroll',
      'redial',
      'jquery',
    ],
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            ['es2015', { modules: false }],
            'react',
            'stage-0',
          ],
          plugins: [
            'transform-decorators-legacy',
          ],
        },
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.DefinePlugin({
      SERVER: false,
    }),
    new CopyWebpackPlugin([
      {
        from: PATHS.public,
        force: true, // This flag forces overwrites
      },
    ], {
      ignore: [
        '*.html', // Ignore static HTML (which we'll use to bootstrap webpack)
      ],
    }),
  ],
});
