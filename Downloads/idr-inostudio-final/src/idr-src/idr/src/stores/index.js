// All
import contextStore from './common/context';

// Front
import requestStore from './request';
import userStore from './user';
import menuStore from './front/menu';
import loginStore from './front/login';
import registerStore from './front/register';
import forgotPasswordStore from './front/forgot-password';

// Dashboard
import recallStore from './dashboard/recall';
import profileStore from './dashboard/profile';
import scratchpad from './dashboard/scratchpad';
import doc from './doc';
import pin from './pin';

// Items - OLD
import recallsOLD from './dashboard/items/recalls';

// Search
import recalls from './search/recalls';
import docs from './search/docs';

export default [
  // All
  contextStore,

  // Front
  requestStore,
  userStore,
  menuStore,
  loginStore,
  registerStore,
  forgotPasswordStore,

  // Dashboard
  recallStore,
  profileStore,
  scratchpad,

  // Items - OLD
  recallsOLD,

  // Search
  recalls,
  docs,
  doc,
  pin,
];
