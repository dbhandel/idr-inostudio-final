/* eslint-disable no-alert */

import React from 'react';
import Gravatar from 'react-gravatar';

import Divider from 'views/common/divider';
import TextField from 'views/common/form/text-field';
import ButtonComponent from 'views/common/form/button';
import formCss from 'views/common/forms.css';
import profileCss from './profile.css';

const defaultGravatar = 'https://s22.postimg.org/b0dmpm3yp/avatar_1.png';

const ProfileForm = props => (
  <div className={formCss.form}>
    <div className={profileCss.gravatar}>
      <Gravatar email={props.fields.email} size={150} default={defaultGravatar} />
    </div>
    <TextField
      type="text"
      placeholder="First Name"
      name="firstName"
      value={props.fields.firstName}
      errorMessage={props.errors.firstName}
      onChange={props.updateField}
      isTransparent={false} />
    <TextField
      type="text"
      placeholder="Last Name"
      name="lastName"
      value={props.fields.lastName}
      errorMessage={props.errors.lastName}
      onChange={props.updateField}
      isTransparent={false} />
    <TextField
      type="text"
      placeholder="Email"
      name="email"
      value={props.fields.email}
      onChange={props.updateField}
      isTransparent={false}
      errorMessage={props.errors.email} />
    <div className={profileCss.divider}>
      <Divider title="CHANGE PASSWORD" />
    </div>
    <TextField
      type="password"
      placeholder="Current password"
      name="password"
      value={props.fields.password}
      errorMessage={props.errors.password}
      onChange={props.updateField}
      isTransparent={false}
      hasIcon />
    <TextField
      type="password"
      placeholder="New Password"
      name="newPassword"
      value={props.fields.newPassword}
      errorMessage={props.errors.newPassword}
      onChange={props.updateField}
      isTransparent={false}
      hasIcon />
    <div className={profileCss.buttons}>
      <ButtonComponent
        success
        label="update profile"
        disabled={!props.hasChanged}
        onClick={() => { if (props.hasChanged) props.submit(); }} />
      <ButtonComponent
        danger
        label="delete account"
        onClick={props.delete} />
    </div>
  </div>
);

ProfileForm.propTypes = {
  hasChanged: React.PropTypes.bool,
  fields: React.PropTypes.objectOf(React.PropTypes.string),
  errors: React.PropTypes.objectOf(React.PropTypes.string),

  /* functions */
  updateField: React.PropTypes.func.isRequired,
  submit: React.PropTypes.func.isRequired,
  delete: React.PropTypes.func.isRequired,
};

export default ProfileForm;
