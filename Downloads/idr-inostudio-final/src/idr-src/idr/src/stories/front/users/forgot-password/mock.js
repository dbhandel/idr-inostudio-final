import React from 'react';
import { action as actionLogger, linkTo } from '@kadira/storybook';
import { action } from 'mobx';
import { observer } from 'mobx-react';

/* components */
import ForgetPassword from 'views/front/forgot-password';

/* store */
import FormStore from 'stores/common/form';

/* init */
class ForgetPasswordMock extends FormStore {

  constructor() {
    super({
      fields: [
        'email',
      ],
    });
  }

  sendResetPassword = () => {
    actionLogger('Attempted send reset password link ->')(this.getFields());

    if (!this.fields.get('email')) {
      this.errors.set('email', `We "don't recall" such email...
      Are you sure you used it to register with us? Please check spelling or try a different one.`);
      return false;
    }

    this.fields.clear();
    return true;
  }

  updateForgotPasswordField = action((field, val) => {
    this.updateField(field, val);
    this.errors.delete(field);
    actionLogger(`updated field '${field}' with ${val} ->`)(this.getFields());
  });

}

const mock = new ForgetPasswordMock();

const Element = observer(() => (
  <ForgetPassword
    hasChanged={mock.hasChanged}
    errors={mock.getErrors()}
    fields={mock.getFields()}
    updateField={mock.updateForgotPasswordField}
    sendResetPassword={mock.sendResetPassword}
    login={linkTo('Front - Users', 'Login (mock)')}
    register={linkTo('Front - Users', 'Register (mock)')} />
));

export default (
  <Element />
);
