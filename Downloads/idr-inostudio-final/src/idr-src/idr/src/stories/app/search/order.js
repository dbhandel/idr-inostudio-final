import React from 'react';
import { action } from '@kadira/storybook';
import { observer } from 'mobx-react';

/* stores */
import SearchStore from 'stories/stores/search/search';

/* components */
import Order from 'views/dashboard/search/order';

/* init */
const search = new SearchStore();
search.order.on = 'test1';

// Action helper
function updateOrder(title) {
  search.updateOrder(title);
  action('Updated order ->')(search.order);
}

function* getComponents(count) {
  for (let i = 1; i <= count; i++) {
    const Control = observer(() => (
      <Order
        style={{ padding: 10 }}
        title={`Test${i}`}
        key={i}
        defaultOrder={{
          on: search.order.on,
          asc: search.order.asc,
        }}
        changeAction={updateOrder} />
    ));

    yield <Control key={i} />;
  }
}

export default (
  <div>
    {[...getComponents(5)]}
  </div>
);
