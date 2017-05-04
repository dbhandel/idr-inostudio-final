import React from 'react';
import { action as actionLogger, linkTo } from '@kadira/storybook';

import { connect } from 'shared/store';

/* stores */
import LoginStore from 'stores/front/login';

/* components */
import Login from 'views/front/login';

/* functions */
function forgotPassword() {
  actionLogger('Clicked forgot password ->')(this);
}

/* init */
const Connected = connect((_, ctx) => {
  const store = ctx.store(LoginStore);

  return (
    <Login
      errors={store.getErrors()}
      fields={store.getFields()}
      forgotPassword={forgotPassword}
      updateField={store.updateField}
      register={linkTo('Front - Users', 'Register (live)')}
      login={store.login} />
  );
});

export default <Connected />;
