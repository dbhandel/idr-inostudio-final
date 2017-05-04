import { observable, action } from 'mobx';

export default class Menu {
  @observable active = false;
  @action on() {
    this.active = true;
  }

  @action off() {
    this.active = false;
  }

  dehydrate = () => ({
    active: this.active,
  })
}
