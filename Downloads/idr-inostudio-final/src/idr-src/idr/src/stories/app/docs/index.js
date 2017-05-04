import { storiesOf } from '@kadira/storybook';

import nav from './layout/nav';
import upload from './upload';
import create from './create';
import deleting from './deleting';

export default {
  stories: [
    {
      name: 'Navigation',
      component: nav,
    },
/*    {
      name: 'Upload files',
      component: upload,
    },*/
    {
      name: 'Create Doc',
      component: create,
    },
    {
      name: 'Deleting Doc',
      component: deleting,
    },
  ],

  loader: storiesOf('App - Docs'),
};
