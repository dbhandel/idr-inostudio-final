import { observable, computed, action, asMap, toJS } from 'mobx';

// Stores
import Request from 'stores/request';
import FormStore from 'stores/common/form';
import Recalls from 'stores/search/recalls';

export default class RecallStore extends FormStore {
  @observable data = {};
  @observable tags = [];
  @observable deadlines = [];
  @observable source = asMap({
    label: 'N/A',
    link: null,
  });
  @observable file = asMap({
    name: '',
  });

  /* GETTERS */
  @computed get id() {
    return this.data.id;
  }

  @computed get questionHTML() {
    return this.data.question_html;
  }

  @computed get answerHTML() {
    return this.data.answer_html;
  }

  @computed get fileName() {
    return this.file.get('name');
  }

  @computed get sourceLabel() {
    return this.source.get('label');
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
  });

  removeTag = action(index => {
    this.tags.splice(index, 1);
  });

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

  /* HTML */
  setQuestionHTML(html) {
    this.data.question_html = html;
  }

  setAnswerHTML(html) {
    this.data.answer_html = html;
  }

  /* MERGE */
  @action merge(data) {
    this.data = data;
    if (data.tags) this.tags.replace(data.tags);
    if (data.deadlines) this.deadlines.replace(data.deadlines);
  }

  /* REQUESTS */
  getRequest = action(() => {
    const tags = this.getTags();
    const deadlines = this.getDeadlines();

    return {
      questionHTML: this.data.question_html,
      answerHTML: this.data.answer_html,
      tags: tags.length ? tags : null,
      deadlines: deadlines.length ? deadlines : null,
    };
  });

  async onUpdate() {
    const recalls = this.store(Recalls);

    // Update search view + tags
    return Promise.all([
      recalls.search(),
      recalls.suggest(),
    ]);
  }

  create = action(async () => {
    this.errors.clear();
    return this.check(async () => {
      await this.store(Request).post('/recall', this.getRequest());
      await this.onUpdate();
      return true;
    });
  });

  update = action(async () => {
    this.errors.clear();

    return this.check(async () => {
      await this.store(Request).put(
        `/recall/${this.id}`,
        this.getRequest(),
      );
      await this.onUpdate();
      return true;
    });
  })
}
