import { action } from 'mobx';

/* stores */
import FormStore from 'stores/common/form';
import UserStore from 'stores/user';
import RequestStore from 'stores/request';

export default class RegisterStore extends FormStore {
  constructor(init = {}) {
    super({
      ...init,
      fields: [
        'name',
        'email',
        'password',
      ],
    });
  }

  // Attempt login
  @action async createUser() {
    // Reset existing errors
    this.errors.clear();

    return this.check(async () => {
      // Register
      await this.store(RequestStore).post('/user', {
        name: this.fields.get('name'),
        email: this.fields.get('email'),
        password: this.fields.get('password'),
      });

      // Then login...
      await this.store(UserStore).login(
        this.fields.get('email'),
        this.fields.get('password'),
      );

      return true;
    });
  }
}
