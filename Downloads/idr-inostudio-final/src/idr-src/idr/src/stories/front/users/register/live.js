/* eslint-disable no-alert */
import React from 'react';

import { connect } from 'shared/store';
import { linkTo } from '@kadira/storybook';

/* components */
import Register from 'views/front/register';
import WelcomePage from 'views/dashboard/layout/welcome-page';

/* store */
import RegisterStore from 'stores/front/register';

@connect class Element extends React.Component {

  constructor(props) {
    super(props);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.state = { isRegistration: false, email: 'test@gmail.com' };
  }

  handleCreateUser = async () => {
    if (await this.context.store(RegisterStore).createUser()) {
      const fields = this.context.store(RegisterStore).fields.toJS();
      this.setState({ isRegistration: true, email: fields.email });
    }
  }

  renderWelcomePage = () => (
    <WelcomePage email={this.state.email} />
  );

  renderRegister = store => (
    <Register
      errors={store.getErrors()}
      fields={store.getFields()}
      updateField={store.updateField}
      login={linkTo('Front - Users', 'Login (live)')}
      createUser={this.handleCreateUser} />
  );

  renderComponent = store => (
    (this.state.isRegistration) ? this.renderWelcomePage() : this.renderRegister(store)
  );

  render() {
    const store = this.context.store(RegisterStore);
    return (
      <div>{this.renderComponent(store)}</div>
    );
  }
}

export default (
  <Element />
);
