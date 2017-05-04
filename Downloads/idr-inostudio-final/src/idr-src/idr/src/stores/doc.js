import { observable, asMap, action } from 'mobx';

/* stores */
import ContextStore from 'stores/common/context';
import RequestStore from 'stores/request';
import User from 'stores/user';

export default class Doc extends ContextStore {
  @observable data = asMap();
  @observable cursor = null;
  @observable pins = asMap();

  constructor(init) {
    super(init);
    this.request = this.store(RequestStore);
    this.pins = [];
  }

  @action getAll() {
    return this.data.toJS();
  }

  @action setCursor(id) {
    this.data.forEach(item => {
      if (item.id === id) {
        this.cursor = item;
      }
    });
  }

  @action getPins() {
    return this.cursor.pins.toJS();
  }

  @action addPin(pin) {
    this.cursor.pins.push(pin);
  }

  @action
  async addDoc(doc) {
    await this.request.upload('/docs/upload', doc);
  }

  getCursor() {
    return this.cursor;
  }

  @action
  async fetchInitial() {
    await this.store(User).runWhenUser(async () => this.getAllUserDocs());
  }

  async getAllUserDocs() {
    this.data = await this.store(RequestStore).get('/docs');
    this.cursor = this.data[0];
  }
}
