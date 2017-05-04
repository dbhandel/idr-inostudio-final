import { observable, computed } from 'mobx';

export default class CreateRecall {
  @observable question = '<p><span style="color: rgb(147, 101, 184);"><em>What is this life thing?</em></span></p>';
  @observable answer = '<p>The answer to life the universe and everything is <strong>42</strong>.</p>';

  // assume no default for deadline date.
  @observable deadline = [{
    label: '', date: null,
  }];
  @observable source = {
    text: '',
    link: '',
  };

  @computed get deadlineMoment() {
    return this.deadline;
  }
}
