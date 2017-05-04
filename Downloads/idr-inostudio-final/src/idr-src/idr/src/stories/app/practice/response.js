import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { observable, action } from 'mobx';

import { connect } from 'shared/store';

/* components */
import Response from 'views/dashboard/practice/response';

class ResponseStore {
  @observable inner = '';

  @action update(val) {
    this.inner = val;
  }
}

const store = new ResponseStore();

const changeResponseHandler = val => {
  store.update(val);
  actionLogger('Response -> handleChangeResponse()')(store.inner);
};

const ResponseMock = connect(() => (
  <Response
    question={'What is parseInt() function?'}
    response={store.inner}
    changeResponse={changeResponseHandler} />
));

export default <ResponseMock />;
