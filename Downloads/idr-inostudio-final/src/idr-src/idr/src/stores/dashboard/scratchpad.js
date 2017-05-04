/* stores */
import ContextStore from 'stores/common/context';
import Recall from 'stores/dashboard/recall';

export default class Scratchpad extends ContextStore {
  getRecall() {
    if (!this.recall) this.recall = this.copy(Recall);
    return this.recall;
  }

  resetRecall() {
    this.recall = null;
  }
}
