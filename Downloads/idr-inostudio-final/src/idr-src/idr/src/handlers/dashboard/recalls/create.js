import React from 'react';

import { connect } from 'shared/store';
import { dashboard } from 'config/links';

/* components */
import CreateRecall from 'views/dashboard/recalls/create/';

/* handlers */
import Nav from 'handlers/dashboard/layout/nav';
import Container from 'handlers/dashboard/layout/containers/plain';

/* stores */
import Scratchpad from 'stores/dashboard/scratchpad';

export default connect((_, ctx) => {
  const scratchpad = ctx.store(Scratchpad);
  const recall = scratchpad.getRecall();

  return (
    <Container
      nav={<Nav />} >
      <CreateRecall
        recall={recall}
        onCancel={() => ctx.router.push(dashboard.get('explore'))}
        onSave={async () => {
          if (await recall.create()) {
            scratchpad.resetRecall();
            ctx.router.push(dashboard.get('explore'));
          }
        }} />
    </Container>
  );
});
