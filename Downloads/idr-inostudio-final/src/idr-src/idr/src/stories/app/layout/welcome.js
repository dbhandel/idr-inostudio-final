import React from 'react';
import { action } from '@kadira/storybook';
import { connect } from 'shared/store';

/* stores */
import UserStore from 'stores/user';

/* components */
import Header from 'views/dashboard/layout/header';
import WelcomePage from 'views/dashboard/layout/welcome-page';

/* init */

const Element = connect((_, ctx) => {
  const user = ctx.store(UserStore);
  return (
    <div>
      <Header
        hashedEmail={user.getHashedEmail()}
        handleRecalls={action('clicked Recalls')}
        handleDocs={action('clicked Docs')}
        handleProfile={action('clicked Profile')}
        handleSettings={action('clicked Settings')}
        handleLogout={action('clicked Sign Out')} />
      <WelcomePage email="lee@leebenson.com" />
    </div>
  );
});

export default (
  <div>
    <Element />
  </div>
);
