import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
/* components */
import Spinner from 'views/common/spinner';

class Mock {
  @observable visible = false;

  @action toggle() {
    this.visible = !this.visible;
  }
}

const store = new Mock();

function handleClick() {
  store.toggle();
  actionLogger('Spinner was toggled ->')(store.visible);
}

const Element = observer(() => (
  <div style={{ height: '100%', width: '100%' }}>
    <div style={{ height: '300px', width: '300px' }}>
      <Spinner visible={store.visible}>
        Content behind
      </Spinner>
    </div>
    <div>
      <button onClick={handleClick}>Toggle spinner</button>
    </div>
  </div>
));

export default (
  <Element />
);
