import React from 'react';

/* css */
import css from 'views/common/form-wrapper.css';

/* components */
import Link from 'views/common/link';
import RegisterForm from './form';

const Register = props => (
  <div className={css.wrapper}>
    <RegisterForm
      fields={props.fields}
      errors={props.errors}
      updateField={props.updateField}
      createUser={props.createUser} />
    <p className={css['change-page']}>HAVE AN ACCOUNT?
      &nbsp;
      <Link onClick={props.login}>SIGN IN HERE</Link>
    </p>
  </div>
);

Register.propTypes = {
  /* objects */

  // RegisterForm
  fields: React.PropTypes.object,
  errors: React.PropTypes.object,

  /* functions */
  login: React.PropTypes.func.isRequired,

  // RegisterForm
  updateField: React.PropTypes.func.isRequired,
  createUser: React.PropTypes.func.isRequired,
};

export default Register;
