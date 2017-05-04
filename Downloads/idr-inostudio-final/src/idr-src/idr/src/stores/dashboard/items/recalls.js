import { observable, action } from 'mobx';

/* stores */
import Request from 'stores/request';
import RecallStore from 'stores/dashboard/recall';
import UserStore from 'stores/user';
import ItemStore from './index';

export default class RecallsStore extends ItemStore {
  @observable isDelete = false;
  @observable isModalDeleting = false;

  /* GETTERS */
  getCurrent() {
    if (!this.current) return null;
    const recall = new RecallStore(this.context);
    recall.mergeData(this.data.get(this.current));
    return recall;
  }

  /* SETTERS */
  @action setCurrent(id) {
    this.current = id;
  }

  @action removeCurrent() {
    this.current = 0;
  }

  @action switchDelete() {
    this.isDelete = true;
  }

  @action cancelDelete() {
    this.isDelete = false;
  }

  @action deleteAll() {
    this.selected.map(async item => {
      await this.store(Request).send({
        uri: `/recall/${item}`,
        method: 'DELETE',
      });
      this.removeCurrent();
      this.ids.remove(item);
      this.data.delete(item);
      return true;
    });
    this.isDelete = false;
    this.selected = []; // plug
  }

  mergeData = action(data => {
    this.data.set(data.id, data);
    if (!this.ids.includes(data.id)) {
      this.ids.push(data.id);
    }
  });

  fetchInitial = action(async () => {
    if (!this.getTotalCount()) {
      return this.store(UserStore).runWhenUser(async () => {
        const res = await this.store(Request).get('/recalls');
        if (res) {
          return res.forEach(this.mergeData);
        }
        return true;
      });
    }
    return false;
  });

  @action async deleteWithConfirm(id) {
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure?')) {
      try {
        await this.store(Request).delete(`/recall/${id}`);
        // this.data.delete(id);
        this.removeCurrent();
        this.ids.remove(id);
        this.data.delete(id);
        return true;
      } catch (e) { /* ignore result */ }
    }
    return false;
  }

  @action async delete(id) {
    // eslint-disable-next-line no-alert
    try {
      await this.store(Request).delete(`/recall/${id}`);
      // this.data.delete(id);
      this.removeCurrent();
      this.ids.remove(id);
      this.data.delete(id);
      return true;
    } catch (e) { /* ignore result */ }

    return false;
  }

  @action toggleModalDeleting() {
    this.isModalDeleting = !this.isModalDeleting;
  }
}
