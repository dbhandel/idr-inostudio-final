import { observable, action, asMap } from 'mobx';
import Swipeout from 'stores/swipeout';

export default class Recall extends Swipeout {
  @observable numberToPractice = 78;
  @observable ratings = asMap();
  @observable recalls = asMap();

  /* RATINGS */
  @action setRating(id, rating) {
    this.ratings.set(id, rating);
  }

  getRating(id) {
    return this.ratings.get(id) || 0;
  }

  /* STATISTICS */
  @action setNumberToPractice(num = 0) {
    this.numberToPractice = num;
  }

  getNumberToPractice() {
    return this.numberToPractice;
  }
}
