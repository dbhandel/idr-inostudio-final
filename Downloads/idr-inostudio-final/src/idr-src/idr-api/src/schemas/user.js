import validator from 'validator';
import humanName from 'humanname';

export default {
  // User's e-mail address
  async email() {
    if (!this.get('email')) {
      throw new Error('Please enter your e-mail address.');
    }

    // is valid e-mail
    if (!validator.isEmail(this.get('email'))) {
      throw new Error('Please enter a valid e-mail address.');
    }

    // Normalize the e-mail address
    this.set('email', validator.normalizeEmail(this.get('email')));
  },

  // User's password.
  async password() {
    if (!this.get('password')) {
      throw new Error('Please enter a password');
    }

    if (!validator.isLength(this.get('password'), { min: 6, max: 128 })) {
      throw new Error('Your password should be between 6-128 characters in length.');
    }
  },

  async name() {
    if (!this.get('name')) {
      throw new Error('Please enter your name.');
    }

    if (!validator.isLength(this.get('name'), { min: 5, max: 128 })) {
      throw new Error('Please enter your full name (first and last)');
    }

    // If we're here, the name is valid -- so let's split it into the
    // constituent parts of a user's name
    const name = humanName.parse(this.get('name'));

    // First name?
    if (!name.firstName) {
      throw new Error('Missing first name. Please enter your full name.');
    }

    if (!validator.isLength(name.firstName, { min: 2, max: 128 })) {
      throw new Error('Your first name should be between 2-128 characters.');
    }

    // Last name?
    if (!name.lastName) {
      throw new Error('Missing last name. Please enter your full name.');
    }

    if (!validator.isLength(name.lastName, { min: 2, max: 128 })) {
      throw new Error('Your last name should be between 2-128 characters.');
    }

    // All good -- save the name so we can re-use it later
    this.set('parsedName', name);
  },
};
