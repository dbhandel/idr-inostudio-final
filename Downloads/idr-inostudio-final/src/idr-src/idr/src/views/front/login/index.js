import React from 'react';

/* css */
import css from 'views/common/form-wrapper.css';

/* components */
import Link from 'views/common/link';
import LoginForm from './form';

const Login = props => (
  <div className={css.wrapper}>
    <LoginForm
      fields={props.fields}
      errors={props.errors}
      forgotPassword={props.forgotPassword}
      updateField={props.updateField}
      login={props.login} />
    <p className={css['change-page']}><Link onClick={props.register}>NEED AN ACCOUNT?</Link></p>
  </div>
);

Login.propTypes = {
  /* objects */
  fields: React.PropTypes.object,
  errors: React.PropTypes.object,

  /* functions */
  register: React.PropTypes.func.isRequired,

  // LoginForm
  forgotPassword: React.PropTypes.func.isRequired,
  updateField: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
};

Login.defaultProps = {
  fields: {},
  errors: {},
};

export default Login;
