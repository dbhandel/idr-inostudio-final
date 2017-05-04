/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

// postcss
const cssnext = require('postcss-cssnext');
const postcssPartialImport = require('postcss-partial-import');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');

const PATHS = require('../paths');

module.exports = function exportedConfig(config) {
  // Find mods in node_modules and path
  config.resolve.root = [
    PATHS.app,
    path.resolve(__dirname, '../node_modules'),
  ];

  // Node config
  config.node = {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  };

  // File loader
  config.module.loaders.push({
    test: /\.(png|woff|woff2|svg|ttf|eot|jpg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file',
  });

  config.module.loaders.push({
    test: /\.json$/,
    loader: 'json-loader',
  });

  // PostCSS loader
  config.module.loaders.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader?modules=1!postcss-loader',
  });

  // SASS
  config.module.loaders.push({
    test: /\.s(a|c)ss$/,
    loaders: [
      'style-loader',
      'css-loader?sourceMap',
      'resolve-url-loader',
      'sass-loader?sourceMap',
    ],
  });

  // jQuery
  config.plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  );

  // PostCSS config
  config.postcss = instance => (
    [
      postcssPartialImport({
        dirs: [
          PATHS.app,
        ],
        addDependencyTo: instance,
      }),
      postcssMixins(),
      postcssSimpleVars(),
      cssnext(),
    ]
  );

  // Update .js(x) to use the babel-polyfill
  config.entry.preview.unshift('babel-polyfill');

  // Add `SERVER`: false constant, to play nicely with DOM detection
  config.plugins.forEach(plugin => {
    if (plugin.constructor.name === 'DefinePlugin') {
      plugin.definitions.SERVER = false;
      plugin.definitions.FROALA_KEY = JSON.stringify(process.env.FROALA_KEY || '');
      plugin.definitions.API_URL = JSON.stringify(
        process.env.npm_package_config_api_url
      );
    }
  });

  return config;
};
