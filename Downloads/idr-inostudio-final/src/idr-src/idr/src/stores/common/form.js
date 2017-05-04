import { observable, action, asMap, computed } from 'mobx';

/* stores */
import ContextStore from 'stores/common/context';

export default class FormStore extends ContextStore {
  @observable fields = asMap();
  @observable defaults = asMap();
  @observable errors = asMap();

  constructor(init = {}) {
    super(init);
    // Iterate over field keys
    (init.fields || []).forEach(field => {
      if (typeof field === 'object') {
        Object.keys(field).forEach(key => {
          this.fields.set(key, field[key]);
        });
      } else {
        // Otherwise, just set it as a blank string
        this.fields.set(field, '');
      }
    });
    // When done, copy the `fields` into `defaults`
    this.defaults.merge(this.fields);
  }

  @computed get hasChanged() {
    return this.fields.keys().some(
      key => this.fields.get(key) !== this.defaults.get(key),
    );
  }

  @action updateField = (field, value) => {
    this.fields.set(field, value);
  }

  @action async check(func) {
    try {
      return await func();
    } catch (e) {
      // Should be a plain object
      Object.keys(e).forEach(key => {
        this.errors.set(key, e[key]);
      });
    }
    return false;
  }

  getFields() {
    return this.fields.toJS();
  }

  getErrors() {
    return this.errors.toJS();
  }

  isError() {
    return !!this.errors.size;
  }
}
