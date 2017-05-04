import { storiesOf } from '@kadira/storybook';

/* components */
import environment from './environment';

export default {
  stories: [
    {
      name: 'Environment',
      component: environment,
    },
  ],

  loader: storiesOf('Experiments', module),
};
