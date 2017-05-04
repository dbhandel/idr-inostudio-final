import webpack from 'webpack';
import Config from 'webpack-config';

// postcss
import cssnext from 'postcss-cssnext';
import postcssPartialImport from 'postcss-partial-import';
import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';

import PATHS from '../paths';

export default new Config().merge({
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      PATHS.app,
      'node_modules',
    ],
  },

  module: {
    loaders: [
      // With the file loader, imported 'static' assets will wind up
      // being served from the public folder
      {
        test: /\.(png|woff|woff2|svg|ttf|eot|jpg)$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[hash].[ext]',
        },
      },

      // JSON loader
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  output: {
    path: PATHS.distPublic,
    publicPath: '/',
    filename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
      FROALA_KEY: JSON.stringify(process.env.FROALA_KEY || ''),
      API_URL: JSON.stringify(process.env.npm_package_config_api_url || ''),
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        // we're using SASS for stylesheets. By default, let's grab
        // a sourcemap so we can use that inside the browser's Developer
        // Console and see the raw SASS
        context: PATHS.app,

        output: {
          path: PATHS.distPublic,
          publicPath: '/',
          filename: '[name].js',
        },

        // postcss gives our CSS a final pass to perform optimisations,
        // add vendor-specific suffixes (via 'autoprefixer') and
        // minify the code
        postcss(instance) {
          return {
            plugins: [
              postcssPartialImport({
                dirs: [
                  PATHS.app,
                ],
                addDependencyTo: instance,
              }),
              postcssMixins(),
              postcssSimpleVars(),
              cssnext(),
            ],
          };
        },
      },
    }),
  ],
});
