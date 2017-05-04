import webpack from 'webpack';
import Config from 'webpack-config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Extract text from imported scripts
const extractCSS = new ExtractTextPlugin({
  filename: 'assets/css/style.css',
  allChunks: true,
});

export default new Config().extend({
  '[root]/client.js': config => {
    for (const loader of config.module.loaders) {
      if (loader.loader === 'babel') {
        // loader.exclude = null;
      }
    }
    return config;
  },
}).merge({
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: extractCSS.extract({
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
          fallbackLoader: 'style-loader',
        }),
      },
      {
        test: /\.s(c|a)ss$/,
        loader: extractCSS.extract({
          loader: [
            'css-loader?sourceMap',
            'postcss-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
          fallbackLoader: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    extractCSS,
  ],
});
