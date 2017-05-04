import { storiesOf } from '@kadira/storybook';

/* components */
import header from './header';
import nav from './nav';
import tagBar from './tag-bar';
import profile from './profile';
import welcome from './welcome';
import spinner from './spinner';

export default {
  stories: [
    {
      name: 'Header',
      component: header,
    },
    {
      name: 'Navigation',
      component: nav,
    },
    {
      name: 'Profile',
      component: profile,
    },
    {
      name: 'Tag Bar',
      component: tagBar,
    },
    {
      name: 'Welcome',
      component: welcome,
    },
    {
      name: 'Spinner',
      component: spinner,
    },
  ],

  loader: storiesOf('App - Layout', module),
};
