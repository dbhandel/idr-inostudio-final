import React from 'react';

/* css */
import css from 'views/common/forms.css';

/* components */
import TextField from 'views/common/form/text-field';
import ButtonComponent from 'views/common/form/button';

const RegisterForm = props => (
  <div className={css.form}>
    <h1>CREATE AN ACCOUNT</h1>
    <TextField
      type="text"
      placeholder="NAME"
      name="name"
      value={props.fields.name}
      onChange={props.updateField}
      errorMessage={props.errors.name}
      isTransparent />
    <TextField
      type="text"
      placeholder="E-MAIL"
      name="email"
      value={props.fields.email}
      onChange={props.updateField}
      errorMessage={props.errors.email}
      isTransparent />
    <TextField
      type="password"
      placeholder="PASSWORD"
      name="password"
      value={props.fields.password}
      errorMessage={props.errors.password}
      onChange={props.updateField}
      isTransparent
      hasIcon />
    <div className={css.buttons}>
      <ButtonComponent
        success
        onClick={props.createUser}
        label="GET STARTED" />
    </div>
  </div>
);

RegisterForm.propTypes = {
  /* objects */
  fields: React.PropTypes.object,
  errors: React.PropTypes.object,

  /* functions */
  updateField: React.PropTypes.func.isRequired,
  createUser: React.PropTypes.func.isRequired,
};

export default RegisterForm;
