import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { action } from 'mobx';
import { observer } from 'mobx-react';

/* components */
import Login from 'views/front/login';

/* store */
import FormStore from 'stores/common/form';

/* init */
class LoginMock extends FormStore {

  constructor() {
    super({
      fields: [
        'email',
        'password',
      ],
    });
  }

  forgotPassword = () => {
    actionLogger('Clicked forgot password ->')(this);
  }

  register = () => {
    actionLogger('Clicked register link ->')(this);
  }

  login = () => {
    actionLogger('Attempted sign in ->')(this.getFields());
    this.errors.set('email', 'Sample e-mail error message');
    this.errors.set('password', 'Sample password error message');
  }

  updateLoginField = action((field, val) => {
    this.updateField(field, val);
    this.errors.delete(field);
    actionLogger(`updated field '${field}' with ${val} ->`)(this.getFields());
  });

}

const mock = new LoginMock();

const Element = observer(() => (
  <Login
    errors={mock.getErrors()}
    fields={mock.getFields()}
    forgotPassword={mock.forgotPassword}
    updateField={mock.updateLoginField}
    register={mock.register}
    login={mock.login} />
));

export default (
  <Element />
);
