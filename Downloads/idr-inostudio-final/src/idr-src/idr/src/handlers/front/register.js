/* eslint-disable no-alert */
import React from 'react';

import { connect } from 'shared/store';
import { links } from 'config/links';

/* stores */
import RegisterStore from 'stores/front/register';

/* components */
import Register from 'views/front/register';

/* init */
@connect class RegisterHandler extends React.Component {
  handleLink = url => () => {
    this.context.router.push(links.get(url));
  }

  // TODO fix syntax after https://github.com/gaearon/react-hot-loader/issues/391
  handleCreateUser = () => (async () => {
    if (await this.context.store(RegisterStore).createUser()) {
      this.handleLink('dashboard')();
    }
  })();

  render() {
    const store = this.context.store(RegisterStore);

    return (
      <Register
        fields={store.getFields()}
        errors={store.getErrors()}
        updateField={store.updateField}
        login={this.handleLink('login')}
        createUser={this.handleCreateUser} />
    );
  }
}

export default RegisterHandler;
