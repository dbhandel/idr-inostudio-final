module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    jsx: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: [
    'jsx-a11y',
    'import',
    'babel',
  ],
  rules: {
    'eol-last': 1,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] } ],
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
    'react/forbid-prop-types': [1, { forbid: ['any']} ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/no-multi-comp': 0,
    'no-underscore-dangle': 0,
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
  },
};
