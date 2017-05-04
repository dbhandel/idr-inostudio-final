import { observable, action } from 'mobx';

/* stores */
import ContextStore from 'stores/common/context';
import UserStore from 'stores/user';

export default class TagStore extends ContextStore {
  @observable recallTags = [];

  getRecallTags() {
    return this.recallTags.splice();
  }

  @action fetchInitial() {
    if (!this.getRecallTags().length) {
      return this.store(UserStore).runWhenUser(async () => {
        const res = await this.request.get('/tags/recall');
        this.recallTags.replace(res);
        return true;
      });
    }
    return false;
  }
}
