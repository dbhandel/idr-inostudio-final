import { observable, computed, action, asMap, toJS } from 'mobx';
import omit from 'lodash.omit';

// Stores
import Request from 'stores/request';
import FormStore from 'stores/common/form';
import RecallItems from 'stores/dashboard/items/recalls';
import RecallSearch from 'stores/dashboard/search/recalls';

export default class RecallStore extends FormStore {
  @observable recall = asMap();
  @observable tags = [];
  @observable deadlines = [];
  @observable isError = {};
  @observable source = asMap({
    label: 'N/A',
    link: null,
  });
  @observable file = asMap({
    name: '',
  });

  constructor(init = {}) {
    super(init);

    this.questionRef = null;
    this.answerRef = null;
  }

  /* SETTERS */
  mergeData = action(data => {
    this.recall.merge(omit(data, 'tags', 'deadlines'));
    if (data.tags) this.tags.replace(data.tags);
    if (data.deadlines) this.deadlines.replace(data.deadlines);

    // Update the recalls store
    this.store(RecallItems).mergeData(data);

    return this;
  });

  /* GETTERS */

  @computed get id() {
    return this.recall.get('id');
  }

  @computed get questionPlain() {
    return this.recall.get('question_plain');
  }

  @computed get questionHTML() {
    return this.recall.get('question_html');
  }

  @computed get answerPlain() {
    return this.recall.get('answer_plain');
  }

  @computed get answerHTML() {
    return this.recall.get('answer_html');
  }

  @computed get fileName() {
    return this.file.get('name');
  }

  @computed get sourceLabel() {
    return this.source.get('label');
  }

  @computed get sourceLink() {
    return this.source.get('link');
  }

  /* TAGS */

  getTags() {
    return this.tags.slice();
  }

  addTag = action(tag => {
    const lc = tag.toLowerCase();
    if (tag && !this.tags.includes(lc)) {
      this.tags.push(lc);
    }
  })

  removeTag = action(index => {
    this.tags.splice(index, 1);
  })

  /* DEADLINES */
  getDeadlines() {
    return toJS(this.deadlines);
  }

  addDeadline = action((label = '', date = null) => {
    this.deadlines.push({
      label,
      date,
    });
  });

  removeDeadline = action(index => {
    this.deadlines.splice(index, 1);
  });

  setDeadlineLabel = action((index, label) => {
    this.deadlines[index].label = label;
  });

  setDeadlineDate = action((index, momentDate) => {
    this.deadlines[index].date = momentDate.toDate();
  });

  setFileName = action(value => {
    this.file.set('name', value);
  });

  /* REFS */
  setQuestionRef = ref => {
    this.questionRef = ref;
  }

  setAnswerRef = ref => {
    this.answerRef = ref;
  }

  /* REQUESTS */
  getRequest = action(() => {
    const tags = this.getTags();
    const deadlines = this.getDeadlines();
    return {
      questionHTML: this.questionRef.getContent(),
      answerHTML: this.answerRef.getContent(),
      tags: tags.length ? tags : null,
      deadlines: deadlines.length ? deadlines : null,
    };
  });

  create = action(async () => {
    this.errors.clear();
    return this.check(async () => {
      const res = await this.store(Request)
        .post('/recall', this.getRequest())
        .catch(e => { this.isError = e; });
      this.mergeData(res);

      // Update tags
      await this.store(RecallSearch).fetchSuggestions();

      return true;
    });
  });

  update = action(async () => {
    this.errors.clear();

    return this.check(async () => {
      const res = await this.store(Request).put(
        `/recall/${this.recall.get('id')}`,
        this.getRequest(),
      ).catch(e => { this.isError = e; });
      this.mergeData(res);

      // Update tags
      await this.store(RecallSearch).fetchSuggestions();

      return true;
    });
  })
}
