import { observable, action } from 'mobx';
import ContextStore from 'stores/common/context';

export default class SearchBar extends ContextStore {

  constructor(init = {}) {
    super(init);
    this.filters = [];
    this.selectAll = false;
    this.isSelect = false;
  }

  @observable searchTags = [];
  @observable suggestions = [];
  @observable currentSearchString = '';
  @observable numberOfResults = 0;

  @observable order = {
    on: '',
    asc: true,
  };

  @action attemptToAddSearchTag(tag) {
    if (tag) {
      const lt = tag.toLowerCase();
      if (!this.searchTags.find(st => st.toLowerCase() === lt)) {
        this.searchTags.push(lt);
        this.currentSearchString = '';
      }
    }
  }

  @action updateCurrentSearchString(str) {
    this.currentSearchString = str;
  }

  @action updateOrder(on) {
    this.order = {
      asc: this.order.on === on ? !this.order.asc : true,
      on,
    };
  }

  @action removeSearchTag(tagIndex) {
    this.searchTags.splice(tagIndex, 1);
  }
}
