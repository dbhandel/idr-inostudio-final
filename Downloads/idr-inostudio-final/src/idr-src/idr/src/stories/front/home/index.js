import { storiesOf } from '@kadira/storybook';

/* components */
import hero from './hero';
import benefits from './benefits';
import bibliography from './bibliography';
import crush from './crush';
import organized from './organized';
import remember from './remember';

export default {
  stories: [
    {
      name: 'Hero',
      component: hero,
    },
    {
      name: 'Benefits',
      component: benefits,
    },
    {
      name: 'Bibliography',
      component: bibliography,
    },
    {
      name: 'Crush',
      component: crush,
    },
    {
      name: 'Organized',
      component: organized,
    },
    {
      name: 'Remember',
      component: remember,
    },
  ],

  loader: storiesOf('Front - Home', module),
};
