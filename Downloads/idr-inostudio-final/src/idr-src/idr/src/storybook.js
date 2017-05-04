/* eslint-disable no-console */
const express = require('express');
const PATHS = require('../paths');

const app = express();
app.use(express.static(PATHS.storybook));

app.listen('8000', () => {
  console.log('storybook static listening on 8000');
});
