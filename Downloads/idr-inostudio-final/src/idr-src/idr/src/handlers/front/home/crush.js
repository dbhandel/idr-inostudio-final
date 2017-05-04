import React from 'react';

import { links } from 'config/links';
import { connect } from 'shared/store';

/* components */
import Crush from 'views/front/home/crush';

function navigateSignup(router) {
  return () => {
    router.push(links.get('register'));
  };
}

export default connect((_, ctx) => (
  <Crush
    clickButton={navigateSignup(ctx.router)} />
));
