import React from 'react';
import { provideHooks } from 'redial';

import { connect } from 'shared/store';

/* stores */
import Recalls from 'stores/search/recalls';

/* handlers */
import Nav from 'handlers/dashboard/layout/nav';
import Container from 'handlers/dashboard/layout/containers/plain';

/* views */
import NoRecalls from 'views/dashboard/recalls/no-recalls';
import Explore from 'views/dashboard/recalls/explore/';

const hooks = {
  async fetch({ store }) {
    return Promise.all([
      store(Recalls).fetchInitial(),
      store(Recalls).suggest(),
    ]);
  },
};

const Handler = connect((props, ctx) => {
  const recalls = ctx.store(Recalls);

  return (
    <Container nav={<Nav />}>
      {recalls.total ? <Explore /> : <NoRecalls />}
    </Container>
  );
});

export default provideHooks(hooks)(Handler);
