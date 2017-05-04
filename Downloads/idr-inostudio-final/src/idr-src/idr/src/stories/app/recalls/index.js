import { storiesOf } from '@kadira/storybook';

/* components */
import rating from './rating';
import create from './create';
import edit from './edit';
import multipleSelected from './multiple-selected';
import noRecalls from './no-recalls';

export default {
  stories: [
    {
      name: 'Rating',
      component: rating,
    },
    {
      name: 'Create Recall',
      component: create,
    },
    {
      name: 'Edit Recall',
      component: edit,
    },
    {
      name: 'Multiple selected',
      component: multipleSelected,
    },
    {
      name: 'No recalls',
      component: noRecalls,
    },
  ],

  loader: storiesOf('App - Recalls', module),
};
