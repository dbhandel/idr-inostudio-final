/* global SERVER */
import md5 from 'md5';
import { observable, computed, action, asMap } from 'mobx';

// Stores
import ContextStore from 'stores/common/context';
import RequestStore from 'stores/request';
import Recalls from 'stores/search/recalls';

export default class User extends ContextStore {
  @observable user = asMap();
  @observable mode = 'recalls';

  constructor(init) {
    super(init);
    this.request = this.store(RequestStore);
  }

  /* GETTERS */
  @computed get id() {
    return this.user.get('id');
  }

  @computed get email() {
    return this.user.get('email');
  }

  @computed get firstName() {
    return this.user.get('firstName');
  }

  @computed get lastName() {
    return this.user.get('lastName');
  }

  // Return an MD5 hash of the e-mail
  getHashedEmail() {
    return md5(this.user.get('email') || '');
  }

  getRouterMode() {
    return this.mode;
  }
  /* SETTERS */
  @action setRouterMode(mode) {
    this.mode = mode;
  }
  // Set an MD5 hash of the e-mail
  @action setEmail(email) {
    this.user.set('hashedEmail', md5(email));
  }

  // Remove the hash of an e-mail
  @action removeEmail() {
    this.user.delete('hashedEmail');
  }

  /* LISTENERS */
  async whenUser() {
    return new Promise(resolve => (
      this.isLoggedIn() ? resolve(true) : this.once('login', () => resolve(true))),
    );
  }

  /* LOGGED IN STATE */
  isLoggedIn() {
    return this.user.has('id');
  }

  /* METHODS */
  // Attempt a handshake with the API server, and update the local
  // store state if we get a successful response
  @action async attemptTokenAuth() {
    if (this.request.token) {
      try {
        const getUser = await this.request.get('/user');
        this.user.merge(getUser);
        this.emit('login');
        return true;
      } catch (e) { /* no harm done */ }
    }
    return false;
  }

  // Explicit login, using user/pass credentials
  @action async login(email, password) {
    const res = await this.request.post('/login', {
      email,
      password,
    });
    this.request.setToken(res.token);
    return this.attemptTokenAuth();
  }

  @action async logout() {
    this.request.clearToken();
    this.user.clear();
    this.store(Recalls).clear();
    return true;
  }

  // Isomorphic wrapper.  On the server, it will run the method right away
  // if we have a logged in user.  On the client, it will wait until we have
  // a logged in user, then execute the passed function
  runWhenUser = action(async func => {
    if (SERVER) {
      return this.isLoggedIn() ? func() : null;
    }
    await this.whenUser();
    return func();
  });

  /* SERIALIZERS */
  dehydrate() {
    return {
      user: this.user,
    };
  }
}
