import React from 'react';
import { provideHooks } from 'redial';

import { connect } from 'shared/store';

/* stores */
import RecallItems from 'stores/dashboard/items/recalls';
import RecallSearch from 'stores/dashboard/search/recalls';

/* handlers */
import Nav from 'handlers/dashboard/layout/nav-docs';
import Container from 'handlers/dashboard/layout/containers/plain';

/* views */
import NoDocs from 'views/dashboard/docs/no-docs';
import Inbox from 'views/dashboard/docs/inbox/';

const hooks = {
  async fetch({ store }) {
    return Promise.all([
      store(RecallItems).fetchInitial(),
      store(RecallSearch).fetchSuggestions(),
    ]);
  },
};

const Handler = connect((props, ctx) => {
  const docs = ctx.store(RecallItems);

  return (
    <Container nav={<Nav />}>
      {docs.getTotalCount() ? <Inbox /> : <NoDocs />}
    </Container>
  );
});

export default provideHooks(hooks)(Handler);
