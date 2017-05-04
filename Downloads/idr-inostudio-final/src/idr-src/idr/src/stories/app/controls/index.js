import { storiesOf } from '@kadira/storybook';

/* components */
import Toggle from './toggle';

export default {
  stories: [
    {
      name: 'Toggle switch',
      component: Toggle,
    },
  ],

  loader: storiesOf('App - Controls'),
};
