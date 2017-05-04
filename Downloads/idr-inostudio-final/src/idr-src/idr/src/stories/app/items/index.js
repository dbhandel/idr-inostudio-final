import { storiesOf } from '@kadira/storybook';

/* components */
import RecallItemsExample from './recall-items';
import DocItemsExample from './doc-items';

export default {
  stories: [
    {
      name: 'Doc items',
      component: DocItemsExample,
    },
    {
      name: 'Recall items',
      component: RecallItemsExample,
    },
  ],

  loader: storiesOf('App - Items'),
};
