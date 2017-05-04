/* eslint-disable no-alert */

import React from 'react';

import TextField from 'views/common/form/text-field';
import ButtonComponent from 'views/common/form/button';
import css from 'views/common/forms.css';

const LoginForm = props => {
  const { fields, errors } = props;
  return (
    <div className={css.form}>
      <h1>SIGN INTO YOUR ACCOUNT</h1>
      <TextField
        type="text"
        placeholder="E-MAIL"
        name="email"
        value={fields.email}
        onChange={props.updateField}
        errorMessage={errors.email}
        isTransparent />
      <TextField
        type="password"
        placeholder="PASSWORD"
        name="password"
        value={fields.password}
        errorMessage={errors.password}
        onChange={props.updateField}
        isTransparent />
      <div className={css.buttons}>
        <button type="button" onClick={props.forgotPassword} className={css['forgot-password']}>FORGOT PASSWORD</button>
        <ButtonComponent onClick={props.login} success label="SIGN IN" />
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  /* objects */
  fields: React.PropTypes.object,
  errors: React.PropTypes.object,

  /* functions */
  forgotPassword: React.PropTypes.func.isRequired,
  updateField: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  fields: {},
  errors: {},
};

export default LoginForm;
