import { storiesOf } from '@kadira/storybook';

import TextField from './text-field';
import ButtonComponent from './button';
import CalendarComponent from './calendar';
import FroalaComponent from './froala';

export default {
  stories: [
    {
      name: 'Text Field',
      component: TextField,
    },
    {
      name: 'Button',
      component: ButtonComponent,
    },
    {
      name: 'Calendar',
      component: CalendarComponent,
    },
    {
      name: 'Froala',
      component: FroalaComponent,
    },
  ],

  loader: storiesOf('App - Form'),
};
