import { action } from 'mobx';

/* stores */
import Request from 'stores/request';
import Recall from 'stores/dashboard/recall';

/* components */
import Search from './index';

export default class Recalls extends Search {

  /* OVERRIDDEN */

  constructor(init) {
    super(init);
    this.filters = [
      {
        name: 'Best match',
        column: 'match',
        sort: false,
      },
      {
        name: 'A-Z',
        column: 'question',
        sort: true,
      },
      {
        name: 'Updated',
        column: 'updated',
        sort: true,
      },
    ];
    this.column = '';
  }

  search() {
    return super.search('/recalls');
  }

  suggest() {
    return super.suggest('/tags/recall');
  }

  /* CUSTOM */

  cursorToRecall() {
    const recall = this.copy(Recall);

    if (this.hasCursor()) {
      recall.merge(this.getCursor());
    }

    return recall;
  }

  @action async deleteWithConfirm(id) {
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure?')) {
      try {
        await this.store(Request).delete(`/recall/${id}`);
        this.clearId(id);
        await this.search();
        return true;
      } catch (e) { /* ignore result */ }
    }
    return false;
  }

  @action async deleteSelected() {
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure?')) {
      const request = this.store(Request);
      try {
        if (this.isAllSelected()) {
          // Delete all
          await request.delete('/recalls');
        } else {
          // Get just the selected
          await request.post('/recalls/delete', {
            ids: this.getSelected(),
          });
        }
        this.clearSelected();
        await this.search();
        return true;
      } catch (e) { /* ignore result */ }
    }
    return false;
  }
}
