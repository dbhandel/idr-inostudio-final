import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { links } from 'config/links';

/* components */
import Hero from 'views/front/home/hero';

/* init */
function navigateSignup() {
  actionLogger('Click Get Started ->')(links.get('register'));
}

export default (
  <Hero
    clickButton={navigateSignup} />
);
