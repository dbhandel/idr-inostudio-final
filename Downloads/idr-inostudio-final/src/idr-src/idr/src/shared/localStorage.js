/* global SERVER */
class LocalStorage {
  constructor() {
    this.cache = new Map();
  }

  get length() {
    return this.cache.size;
  }

  getItem = key => this.cache.get(key);

  setItem = (key, value) => {
    if (!value) {
      this.cache.delete(key);
      return;
    }
    this.cache.set(key, value);
  }

  removeItem = key => {
    this.cache.delete(key);
  }

  clear = () => {
    this.cache.clear();
  }
}

export default LocalStorage;
