import { observable, action } from 'mobx';

export default class Tags {
  @observable tags = [];

  // @computed get getTags() {
  //   return this.tags.slice();
  // }

  getTags() {
    return this.tags.slice();
  }
  // @action attemptToAddTag(tag) {
  //   const tagLowercased = tag.toLowerCase();
  //   if (tag !== '' && this.tags.indexOf(tagLowercased) === -1) {
  //     this.tags.push(tagLowercased);
  //   }
  // }

  @action addTag(tag) {
    const lc = tag.toLowerCase();
    if (tag && !this.tags.includes(lc)) {
      this.tags.push(lc);
    }
  }

  @action removeTag(index) {
    this.tags.splice(index, 1);
  }
}
