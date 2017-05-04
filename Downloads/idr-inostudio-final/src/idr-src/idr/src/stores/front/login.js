import { action } from 'mobx';

/* stores */
import FormStore from 'stores/common/form';
import UserStore from 'stores/user';

export default class LoginStore extends FormStore {
  constructor(init = {}) {
    super({
      ...init,
      fields: [
        'email',
        'password',
      ],
    });
  }

  // Attempt login
  @action async login() {
    // Reset existing errors
    this.errors.clear();

    /* Preliminary checks for missing data */

    // EMAIL
    if (!this.fields.get('email')) {
      this.errors.set('email', 'Please enter your e-mail address');
    }
    // PASSWORD
    if (!this.fields.get('password')) {
      this.errors.set('password', 'Please enter your password');
    }

    if (this.isError()) return false;

    // Handle login
    return this.check(async () => {
      await this.store(UserStore).login(
        this.fields.get('email'),
        this.fields.get('password'),
      );
      this.fields.clear();
      return true;
    });
  }
}
