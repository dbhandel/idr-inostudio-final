import { observable, asMap, action } from 'mobx';

/* stores */
import ContextStore from 'stores/common/context';

export default class Doc extends ContextStore {
  @observable data = asMap();

  constructor(init) {
    super(init);
    this.data = [];
  }

  @action getAll() {
    return this.data.toJS();
  }

  @action addPin(pin) {
    this.data.push(pin);
  }
}
