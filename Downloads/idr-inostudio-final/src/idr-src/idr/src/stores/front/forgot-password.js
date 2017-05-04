import { action } from 'mobx';

/* stores */
import FormStore from 'stores/common/form';

export default class LoginStore extends FormStore {
  constructor(init = {}) {
    super({
      ...init,
      fields: [
        'email',
      ],
    });
  }

  // Attempt login
  @action async sendResetPassword() {
    // Reset existing errors
    this.errors.clear();

    /* Preliminary checks for missing data */

    // EMAIL
    if (!this.fields.get('email')) {
      this.errors.set('email', `We "don't recall" such email...
      Are you sure you used it to register with us? Please check spelling or try a different one.`);
      return false;
    }

    // TODO implement sendResetPassword handler

    this.fields.clear();
    return true;
  }
}
