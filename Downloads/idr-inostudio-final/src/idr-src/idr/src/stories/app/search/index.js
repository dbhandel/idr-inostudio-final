import { storiesOf } from '@kadira/storybook';

/* components */
import searchBar from './search';
import searchDocs from './search-docs';
import searchRecalls from './search-recalls';
import order from './order';

export default {
  stories: [
    {
      name: 'Search Bar (generic)',
      component: searchBar,
    },
    {
      name: 'Search (Docs)',
      component: searchDocs,
    },
    {
      name: 'Search (Recalls)',
      component: searchRecalls,
    },
    {
      name: 'Order Controls',
      component: order,
    },
  ],

  loader: storiesOf('App - Search'),
};
