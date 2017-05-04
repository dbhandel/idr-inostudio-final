import React from 'react';

/* css */
import css from 'views/common/form-wrapper.css';

/* components */
import Link from 'views/common/link';
import ForgotPasswordForm from './form';

const ForgotPassword = props => (
  <div className={css.wrapper}>
    <ForgotPasswordForm
      hasChanged={props.hasChanged}
      fields={props.fields}
      errors={props.errors}
      updateField={props.updateField}
      sendResetPassword={props.sendResetPassword} />
    <div className={css['change-page-links']}>
      <div><Link onClick={props.login}>SIGN IN?</Link></div>
      <div><Link onClick={props.register}>NEED AN ACCOUNT?</Link></div>
    </div>
  </div>
);

ForgotPassword.propTypes = {
  hasChanged: React.PropTypes.bool,

  /* objects */

  // RegisterForm
  fields: React.PropTypes.object,
  errors: React.PropTypes.object,

  /* functions */
  login: React.PropTypes.func.isRequired,
  register: React.PropTypes.func.isRequired,

  // RegisterForm
  updateField: React.PropTypes.func.isRequired,
  sendResetPassword: React.PropTypes.func.isRequired,
};

export default ForgotPassword;
