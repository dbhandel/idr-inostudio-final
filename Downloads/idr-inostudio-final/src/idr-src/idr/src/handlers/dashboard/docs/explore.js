import React from 'react';
import { provideHooks } from 'redial';

import { connect } from 'shared/store';

/* stores */
import Docs from 'stores/doc';

/* handlers */
import Nav from 'handlers/dashboard/layout/nav-docs';
import Container from 'handlers/dashboard/layout/containers/plain';

/* views */
import NoRecalls from 'views/dashboard/recalls/no-recalls';
import Explore from 'views/dashboard/docs/explore/';

const hooks = {
  async fetch({ store }) {
    return Promise.all([
      store(Docs).fetchInitial(),
    ]);
  },
};

const Handler = connect((props, ctx) => {
  const docs = ctx.store(Docs);

  return (
    <Container nav={<Nav />}>
      {docs.getAll().length ? <Explore /> : <NoRecalls />}
    </Container>
  );
});

export default provideHooks(hooks)(Handler);

