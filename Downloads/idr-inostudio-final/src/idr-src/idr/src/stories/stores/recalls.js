/* eslint-disable no-restricted-syntax, guard-for-in */

import { observable, action, asMap } from 'mobx';
import CreateRecallStore from 'stories/stores/create-recall';
import Swipeout from 'stores/swipeout';

export default class Recalls extends Swipeout {
  @observable current = asMap();

  @observable deadline = [{
    label: '', date: null,
  }];

  init() {
    const recalls = [];
    for (let i = 0; i < 5; i++) {
      const r = new CreateRecallStore();
      r.id = i.toString();
      r.text = `Question_${i}`;
      r.answer = `Answer_${i}`;
      r.source = {
        link: 'google.com',
        text: 'Google link',
      };
      r.tags = ['css', 'javascript'];
      r.views = 7;
      r.progress = {
        to: 4,
        from: 8,
      };
      recalls.push(r);
    }
    this.items = recalls;
    this.resetCurrent();
  }

  resetCurrent() {
    // maybe change this later

    const item = this.items[0];
    for (const key in item) {
      if (typeof item[key] === 'object') {
        this.current.set(key, {});
      } else {
        this.current.set(key, null);
      }
    }
  }

  getAll() {
    return this.items.toJS();
  }

  @action add(recall) {
    this.items.push(recall);
  }

  @action remove(index) {
    this.items.splice(index, 1);
  }

  /* CURRENT */

  setCurrent(id) {
    this.items.forEach(recall => {
      if (recall.id === id) {
        for (const key in recall) {
          this.current.set(key, recall[key]);
        }
      }
    });
  }

  getCurrent() {
    return this.current.toJS();
  }

  updateCurrent(key, value) {
    this.current.set(key, value);

    const id = this.current.get('id');
    this.items.forEach(recall => {
      if (recall.id === id) {
        recall[key] = value;
      }
    });
  }

  updateResponse(id, value) {
    this.items.forEach(recall => {
      if (recall.id === id) {
        recall.response = value;
      }
    });
  }
}
