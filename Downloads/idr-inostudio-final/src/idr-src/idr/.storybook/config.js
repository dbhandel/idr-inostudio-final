import { configure } from '@kadira/storybook';

function loadStories() {
  // eslint-disable-next-line global-require
  require('../src/stories');
}

configure(loadStories, module);
