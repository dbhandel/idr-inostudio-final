import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { observable, action } from 'mobx';

import { connect } from 'shared/store';

/* components */
import Header from 'views/dashboard/practice/header';

class Count {
  @observable count = 78;
  @observable completed = 27;

  @action update(type, count) {
    const parsed = parseInt(count, 10);
    this[type] = !isNaN(parsed) ? parsed : 0;
  }
}

const store = new Count();

@connect class HeaderMock extends React.Component {
  update = type => ev => {
    store.update(type, ev.target.value);
  }

  render() {
    return (
      <div>
        <Header
          count={store.count}
          completed={store.completed}
          closeClick={actionLogger('Recalls -> handleCloseClick()')} />
        <hr />
        Count: <input type="text" onChange={this.update('count')} value={store.count} />
        <br />
        Completed: <input type="text" onChange={this.update('completed')} value={store.completed} />
      </div>
    );
  }
}

export default <HeaderMock />;
