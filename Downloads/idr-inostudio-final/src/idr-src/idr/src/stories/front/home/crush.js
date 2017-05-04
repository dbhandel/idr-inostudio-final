import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { links } from 'config/links';

/* components */
import Crush from 'views/front/home/crush';

/* init */
function navigateSignup() {
  actionLogger('Navigated to sign-up ->')(links.get('register'));
}

export default (
  <Crush
    clickButton={navigateSignup} />
);
