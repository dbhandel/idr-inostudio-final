module.exports = {
    extends: 'airbnb-base',
    installedESLint: true,
    plugins: [
        'react',
        'jsx-a11y',
        'import',
    ],
    parser: 'babel-eslint',
    ecmaFeatures: {
      modules: true,
    }
  };
