import { observable, action, computed, transaction } from 'mobx';

// Extend existing store with this class
export default class Swipeout {

  @observable items = [];
  @observable selected = [];
  @observable active = null;
  @observable actionFilterType = '';
  @observable deadline = [{
    label: '', date: null,
  }];

  @action toggleSelected(item) {
    let result;
    if (this.selected.find(it => it.id === item.id)) {
      this.selected.remove(item);
      result = false;
    } else {
      transaction(() => {
        this.selected.push(item);
        result = true;
      });
    }
    this.actionFilterType = this.actionFilterType || 'SELECT';
    return result;
  }

  @action setItems(items) {
    this.items = items;
  }

  isSelected(item) {
    return this.selected.find(it => it.id === item.id);
  }

  getAll() {
    return this.items.toJS();
  }
  getActionFilterType() {
    return this.actionFilterType;
  }

  @computed get getSelected() {
    return this.selected.toJS();
  }

  @action filterSelectAll() {
    this.selected = [];
    this.items.map(item => (
      this.selected.push(item)
    ));
    this.actionFilterType = 'SELECT';
  }

  @action filterDeselectAll() {
    this.selected = [];
    this.actionFilterType = '';
  }

  @action filterDeleteSelected() {
    if (this.selected.length === 0) return;
    this.actionFilterType = 'DELETE';
  }

  @action deleteSelected() {
    const items = this.items.filter(item => (
      !this.selected.find(it => it.id === item.id)
    ));
    this.items = items;
    this.selected = [];
    this.actionFilterType = '';
  }

  @action cancelDeleteSelected() {
    this.actionFilterType = 'SELECT';
  }
}
