/* eslint-disable no-alert */
import React from 'react';

import { connect } from 'shared/store';
import { links } from 'config/links';

/* stores */
import ForgotPasswordStore from 'stores/front/forgot-password';

/* components */
import ForgotPassword from 'views/front/forgot-password';

/* init */
@connect class ForgotPasswordHandler extends React.Component {
  handleLink = url => () => {
    this.context.router.push(links.get(url));
  }

  render() {
    const store = this.context.store(ForgotPasswordStore);

    return (
      <ForgotPassword
        hasChanged={store.hasChanged}
        errors={store.getErrors()}
        fields={store.getFields()}
        updateField={store.updateField}
        sendResetPassword={() => false}
        login={this.handleLink('login')}
        register={this.handleLink('register')} />
    );
  }
}

export default ForgotPasswordHandler;
