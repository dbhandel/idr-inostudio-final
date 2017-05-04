/* eslint-disable no-alert */
import React from 'react';

import { connect } from 'shared/store';
import { links } from 'config/links';

/* stores */
import LoginStore from 'stores/front/login';

/* components */
import Login from 'views/front/login';

/* init */
@connect class LoginHandler extends React.Component {
  handleLink = url => () => {
    this.context.router.push(links.get(url));
  }

  // TODO fix syntax after https://github.com/gaearon/react-hot-loader/issues/391
  handleLogin = () => (async () => {
    if (await this.context.store(LoginStore).login()) {
      this.handleLink('dashboard')();
    }
  })();

  render() {
    const store = this.context.store(LoginStore);

    return (
      <Login
        fields={store.getFields()}
        errors={store.getErrors()}
        updateField={store.updateField}
        forgotPassword={this.handleLink('forgotPassword')}
        login={this.handleLogin}
        register={this.handleLink('register')} />
    );
  }
}

export default LoginHandler;
