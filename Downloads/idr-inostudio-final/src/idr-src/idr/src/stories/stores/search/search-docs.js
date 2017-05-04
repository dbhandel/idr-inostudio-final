import SearchStore from './search';
import suggestions from './suggestions';

export default class SearchDocs extends SearchStore {
  constructor() {
    super();
    this.numberOfResults = 748;
    this.suggestions = suggestions;
    this.order = {
      on: 'A-Z',
      asc: true,
    };
    this.filters = ['A-Z', 'Added'];
  }
}
