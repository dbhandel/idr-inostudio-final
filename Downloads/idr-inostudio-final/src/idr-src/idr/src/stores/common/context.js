import EventEmitter from 'eventemitter3';

export default class ContextStore extends EventEmitter {
  constructor({ stores }) {
    super();
    this.context = {
      stores,
    };
  }

  store(store) {
    return this.context.stores.get(store);
  }

  copy(StoreClass) {
    return new StoreClass(this.context);
  }
}
