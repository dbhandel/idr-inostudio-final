/* stores */
import SearchStore from './index';

export default class RecallSearchStore extends SearchStore {

  constructor(init) {
    super(init);
    this.filters = ['A-Z', 'Added', 'Due'];
    this.order.on = 'A-Z';
  }

  fetchSuggestions() {
    return super.fetchSuggestions('/tags/recall');
  }
}
