const path = require('path');

// We generally use this file along with Webpack, which means the
// import/export syntax for module loading generally hasn't been
// polyfilled at this point.
//
// Instead, let's use commonjs

module.exports = {
  // The root to all of our source code
  app: path.join(__dirname, 'src'),

  // Everything that we want to expose to our public web server -
  // like images, third-party JS scripts, etc
  public: path.join(__dirname, 'src', 'public'),

  // SASS styles
  styles: path.join(__dirname, 'src', 'styles'),

  // React components - we'll call them 'views'
  views: path.join(__dirname, 'src', 'views'),

  // Distribution folder. This is where the compiled `bundle.js`
  // loader will wind up, along with our CSS, images and external
  // JS.  We'll .gitignore this - no need to version control.
  dist: path.join(__dirname, 'dist'),

  // The 'public' part of the ./dist folder. Basically where we
  // want our production web server to start serving from.
  distPublic: path.join(__dirname, 'dist', 'public'),

  // Storybook static
  storybook: path.join(__dirname, 'storybook-static'),
};
