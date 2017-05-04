import { observable, action } from 'mobx';

export default class FileStack {
  @observable files = [];
  @observable selectedOption = 0;

  getFiles() {
    return this.files.toJS();
  }

  getSelectedOption() {
    return this.selectedOption.toJS();
  }

  @action changeSelectedOption(id) {
    this.selectedOption = id;
  }

  @action addFiles(file) {
    this.files.push(file);
  }

  @action removeFiles(key) {
    this.files.splice(key, 1);
  }
}
