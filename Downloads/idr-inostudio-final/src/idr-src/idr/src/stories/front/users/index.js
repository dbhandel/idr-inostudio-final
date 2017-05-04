import { storiesOf } from '@kadira/storybook';

/* components */
import loginMock from './login/mock';
import loginLive from './login/live';
import registerMock from './register/mock';
import registerLive from './register/live';
import forgotPasswordMock from './forgot-password/mock';

export default {
  stories: [
    {
      name: 'Login (mock)',
      component: loginMock,
    },
    {
      name: 'Login (live)',
      component: loginLive,
    },
    {
      name: 'Register (mock)',
      component: registerMock,
    },
    {
      name: 'Register (live)',
      component: registerLive,
    },
    {
      name: 'Forgot password (mock)',
      component: forgotPasswordMock,
    },
  ],

  loader: storiesOf('Front - Users', module),
};
