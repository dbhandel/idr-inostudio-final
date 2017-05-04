import { asMap, observable, action } from 'mobx';

/* stores */
import ContextStore from 'stores/common/context';
import Request from 'stores/request';

export default class ItemStore extends ContextStore {
  @observable data = asMap();
  @observable ids = [];
  @observable selected = [];
  @observable current = 0;

  /* GETTERS */

  // ids
  getIds() {
    return this.ids.slice();
  }

  getTotalCount() {
    return this.getIds().length;
  }

  // selected
  getSelected() {
    return this.selected.slice();
  }

  getSelectedCount() {
    return this.getSelected().length;
  }

  hasSelected() {
    return !!this.getSelectedCount();
  }

  // data
  getAll() {
    return this.getIds().map(id => this.data.get(id));
  }

  /* SELECTION */
  isSelected(id) {
    return this.selected.includes(id);
  }

  isAllSelected() {
    return this.getTotalCount() === this.getSelectedCount();
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

  @action selectAll() {
    this.ids.map(item => (
      this.selected.push(item)
    ));
  }

  /* DELETE */
  @action async deleteSelected(url) {
    if (this.getSelectedCount()) {
      const ids = this.getSelected();
      await this.store(Request).post(url, { ids });
      ids.forEach(id => {
        this.ids.remove(id);
        this.data.delete(id);
      });
      this.selected.clear();
    }
  }

  /* SERIALIZERS */
  dehydrate() {
    return {
      data: this.data,
      ids: this.ids,
      selected: this.selected,
    };
  }
}
