import { storiesOf } from '@kadira/storybook';

/* components */
import header from './header';
import response from './response';
import answer from './answer';
import rating from './rating';
import container from './container';
import finished from './finished';

export default {
  stories: [
    {
      name: 'Header',
      component: header,
    },
    {
      name: 'Question/response',
      component: response,
    },
    {
      name: 'Answer',
      component: answer,
    },
    {
      name: 'Rating',
      component: rating,
    },
    {
      name: 'Practice Container',
      component: container,
    },
    {
      name: 'Finished Practice',
      component: finished,
    },
  ],

  loader: storiesOf('App - Practice', module),
};
