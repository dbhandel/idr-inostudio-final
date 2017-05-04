import { storiesOf } from '@kadira/storybook';

/* components */
import main from './main';
import toolbar from './toolbar';
import createRecall from './createRecall';
import editRecall from './editRecall';
import menuRecall from './menuRecall';
import pin from './pin';
import menuPin from './menuPin';
import pinComponent from './pinComponent';

export default {
  stories: [
    {
      name: 'Main layout',
      component: main,
    },
    {
      name: 'Toolbar',
      component: toolbar,
    },
    {
      name: 'Pin Toolbar',
      component: pin,
    },
    {
      name: 'Create Recalls',
      component: createRecall,
    },
    {
      name: 'Edit Recalls',
      component: editRecall,
    },
    {
      name: 'Menu Recalls',
      component: menuRecall,
    },
    {
      name: 'Menu Pin',
      component: menuPin,
    },
    {
      name: 'Pin component',
      component: pinComponent,
    },
  ],

  loader: storiesOf('Pdf - layout'),
};
