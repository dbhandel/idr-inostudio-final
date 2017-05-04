import { observable, asMap, computed, action } from 'mobx';

/* stores */
import ContextStore from 'stores/common/context';
import Request from 'stores/request';
import User from 'stores/user';

export default class SearchStore extends ContextStore {
  @observable data = asMap();
  @observable tags = [];
  @observable ids = [];
  @observable selected = [];
  @observable deselected = [];
  @observable suggestions = [];
  @observable text = '';
  @observable all = false;
  @observable column = 'updated';
  @observable asc = true;
  @observable page = 0;
  @observable total = 0;
  @observable results = 0;
  @observable cursor = null;
  @observable placeholder = 'Search';

  constructor(init) {
    super(init);
    this.filters = [];
  }

  /* CLEAR */
  @action clear() {
    [
      'selected',
      'deselected',
      'ids',
      'data',
    ].forEach(prop => this[prop].clear());
    this.page = 0;
    this.results = 0;
    this.total = 0;
  }

  @action clearId(id) {
    if (this.cursor === id) this.resetCursor();
    [
      'selected',
      'deselected',
      'ids',
    ].forEach(prop => this[prop].remove(id));
    this.data.delete(id);
  }

  @action clearSelected() {
    if (this.isAllSelected()) {
      this.clear();
    } else {
      this.getSelected().forEach(id => this.clearId(id));
    }
  }

  /* REQUEST */
  @action async search(url) {
    if (!url) {
      throw new Error('Search URL not implemented!');
    }

    const res = await this.store(Request).get(url, {
      page: this.page,
      column: this.column,
      asc: this.asc ? 1 : 0,
      'tags[]': this.getTags(),
      text: this.text,
    });

    // Clear IDs, if the ordering has changed
    if ((this.lastBy && this.lastBy !== this.by)
      || (this.lastSort && this.lastSort !== this.sort)) {
      this.ids.clear();
    }

    // Set the current search order, so we can determine what's changed
    // next time
    this.lastBy = this.by;
    this.lastSort = this.sort;

    // Update pagination & total
    this.page = res.page;
    this.total = res.total;
    this.results = res.results;

    const newIds = [];

    // Update rows
    res.data.forEach(row => {
      this.data.set(row.id, row);
      newIds.push(row.id);
    });

    this.ids.replace(newIds);
  }

  @action async fetchInitial() {
    if (!this.total) {
      await this.store(User).runWhenUser(async () => this.search());
    }
  }

  /* DATA */

  getAll() {
    return this.ids.map(id => this.data.get(id));
  }

  @action update(row = {}) {
    if (row.id) {
      this.data.set(row.id, row);
    }
  }

  /* TAGS */

  getTags() {
    return this.tags.slice();
  }

  getTagsForSearch() {
    return this.tags.map((name, id) => ({ name, id }));
  }

  @computed get tagCount() {
    return this.getTags().length;
  }

  @action addTag(tag) {
    const lc = tag.toLowerCase();
    if (tag && !this.tags.includes(lc)) {
      this.tags.push(lc);
    }
    // Remove the current text, otherwise we'll have a duplicate
    this.text = '';
    return this.search();
  }

  @action removeTag(index) {
    this.tags.splice(index, 1);
    return this.search();
  }

  /* IDs */
  getIds() {
    return this.ids.slice();
  }

  /* SELECTION */
  getSelected() {
    return this.selected.slice();
  }

  @computed get selectedCount() {
    return this.getSelected().length;
  }

  isSelected(id) {
    return this.selected.includes(id);
  }

  isAllSelected() {
    return this.total === this.selectedCount;
  }

  @action toggleSelected(id) {
    if (!this.isSelected(id)) {
      this.selected.push(id);
    } else {
      this.selected.remove(id);
    }
  }

  @action toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selected.clear();
    } else {
      this.selected.replace(this.getIds());
    }
  }

  /* SUGGESTIONS */
  getSuggestions() {
    return this.suggestions.slice().map((name, id) => ({ name, id }));
  }

  @action async suggest(url) {
    if (!url) {
      throw new Error('Suggestions URL not implemented!');
    }
    const res = await this.store(Request).get(url);
    this.suggestions.replace(res);
  }

  /* ORDERING */
  @action setOrder(column) {
    // If the column is the same, toggle its selection
    if (column === this.column) {
      this.asc = !this.asc;
    } else {
      // Otherwise, update column and set it to asc
      this.column = column;
      this.asc = true;
    }

    return this.search();
  }

  @action setColumn(column) {
    this.column = column;
  }

  /* CURSOR */
  hasCursor() {
    return !!this.cursor;
  }

  setCursor(id) {
    this.cursor = id;
  }

  getCursor() {
    return this.data.get(this.cursor);
  }

  @action resetCursor() {
    this.cursor = null;
  }

  /* INPUT */
  @action setText(text) {
    this.text = text;
  }
}
