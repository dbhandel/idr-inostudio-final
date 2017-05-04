import React from 'react';

import { links } from 'config/links';
import { connect } from 'shared/store';

/* components */
import Hero from 'views/front/home/hero';

function navigateSignup(router) {
  return () => {
    router.push(links.get('register'));
  };
}

export default connect((_, ctx) => (
  <Hero
    clickButton={navigateSignup(ctx.router)} />
));
