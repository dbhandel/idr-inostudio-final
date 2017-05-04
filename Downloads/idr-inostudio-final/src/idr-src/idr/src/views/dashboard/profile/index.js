/* eslint-disable no-alert */

import React from 'react';

// styles
import ProfileForm from './profile';
import css from './index.css';

const ProfileContainer = props => (
  <div className={css.content}>
    <ProfileForm
      updateField={props.updateField}
      submit={props.submit}
      delete={props.delete}
      fields={props.fields}
      errors={props.errors}
      hasChanged={props.hasChanged} />
  </div>
);

ProfileContainer.propTypes = {
  hasChanged: React.PropTypes.bool,
  fields: React.PropTypes.objectOf(React.PropTypes.string),
  errors: React.PropTypes.objectOf(React.PropTypes.string),

  /* functions */
  updateField: React.PropTypes.func.isRequired,
  submit: React.PropTypes.func.isRequired,
  delete: React.PropTypes.func.isRequired,
};

export default ProfileContainer;
