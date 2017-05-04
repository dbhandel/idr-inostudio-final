import { observable } from 'mobx';
import SearchStore from './search';
import suggestions from './suggestions';

export default class SearchRecalls extends SearchStore {

  @observable selectAll = false;
  @observable isSelect = false;

  constructor(init = {}) {
    super(init);
    this.numberOfResults = 10587;
    this.suggestions = suggestions;
    this.order = {
      on: 'Due',
      asc: false,
    };
    this.filters = ['A-Z', 'Added', 'Due'];
  }
}
