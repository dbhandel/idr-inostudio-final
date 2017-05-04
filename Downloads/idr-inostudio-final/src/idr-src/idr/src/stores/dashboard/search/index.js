import { observable, action } from 'mobx';

/* stores */
import ContextStore from 'stores/common/context';
import Request from 'stores/request';

export default class SearchStore extends ContextStore {
  @observable suggestions = [];
  @observable tags = [];
  @observable text = '';
  @observable count = 0;
  @observable order = {
    on: '',
    asc: true,
  };

  constructor(init) {
    super(init);
    this.placeholder = 'Search';
    this.filters = [];
  }

  // STATS
  getCount() {
    return this.count;
  }

  // TAGS
  getTags() {
    return this.tags.slice().map((name, id) => ({ name, id }));
  }

  getTagLength() {
    return this.tags.slice().length;
  }

  addTag = action(tag => {
    const lc = tag.toLowerCase();
    if (tag && !this.tags.includes(lc)) {
      this.tags.push(lc);
    }
    // Remove the current text, otherwise we'll have a duplicate
    return this.updateText('');
  })

  removeTag = action(index => {
    this.tags.splice(index, 1);
  })

  // SUGGESTIONS
  getSuggestions() {
    return this.suggestions.slice().map((name, id) => ({ name, id }));
  }

  @action async fetchSuggestions(url) {
    const res = await this.store(Request).get(url);
    this.suggestions.replace(res);
    return true;
  }

  // SEARCH
  @action search() {
    // eslint-disable-next-line
    console.log('searched! ->', this);
  }

  // TEXT
  @action updateText(text) {
    this.text = text;
  }

  // ORDER
  @action updateOrder(on) {
    this.order = {
      asc: this.order.on === on ? !this.order.asc : true,
      on,
    };
  }
}
