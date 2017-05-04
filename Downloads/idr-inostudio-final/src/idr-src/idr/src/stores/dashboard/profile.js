import { action } from 'mobx';

/* eslint-disable no-alert */
import FormStore from 'stores/common/form';
import UserStore from 'stores/user';

export default class Profile extends FormStore {
  constructor(init = {}) {
    super({
      ...init,
      fields: [
        'firstName',
        'lastName',
        'email',
        'password',
        'newPassword',
      ],
    });
    this.currentUser = {};
  }

  fetchInitial = () => {
    this.currentUser = this.store(UserStore).user;
    this.fields.set('firstName', this.currentUser.get('firstName'));
    this.fields.set('lastName', this.currentUser.get('lastName'));
    this.fields.set('email', this.currentUser.get('email'));
    this.fields.set('password', '');
    this.fields.set('newPassword', '');
  };

  // Attempt update profile
  @action updateProfile() {
    // Reset existing errors
    this.errors.clear();

    /* Preliminary checks for missing data */
    if (!this.fields.get('firstName')) {
      this.errors.set('email', 'Please enter your first name');
    }
    if (!this.fields.get('lastName')) {
      this.errors.set('email', 'Please enter your last name');
    }
    if (!this.fields.get('email')) {
      this.errors.set('email', 'Please enter your e-mail address');
    }

    const noPassword =
      !this.fields.get('password') &&
      this.fields.get('newPassword');

    const noNewPassword =
      this.fields.get('password') &&
      !this.fields.get('newPassword');

    if (noPassword) {
      this.errors.set('password', 'Please enter your old password');
    }
    if (noNewPassword) {
      this.errors.set('newPassword', 'Please enter your new password');
    }

    const success = !this.isError();

    if (success) {
      this.currentUser.set('firstName', this.fields.get('firstName'));
      this.currentUser.set('lastName', this.fields.get('lastName'));
      this.currentUser.set('email', this.fields.get('email'));
    }

    return success;
  }
}
