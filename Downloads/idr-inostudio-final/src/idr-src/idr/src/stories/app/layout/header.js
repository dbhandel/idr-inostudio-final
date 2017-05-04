import React from 'react';
import { action } from '@kadira/storybook';
import { connect } from 'shared/store';

/* stores */
import UserStore from 'stores/user';

/* components */
import Header from 'views/dashboard/layout/header';

/* init */
const handleDocs = () => {
  action('clicked Docs');
};

const handleRecalls = () => {
  action('clicked Recalls');
};

const Element = connect((_, ctx) => {
  const user = ctx.store(UserStore);
  return (
    <Header
      hashedEmail={user.getHashedEmail()}
      handleRecalls={handleRecalls}
      handleDocs={handleDocs}
      handleProfile={action('clicked Profile')}
      handleSettings={action('clicked Settings')}
      handleLogout={action('clicked Sign Out')} />
  );
});

export default (
  <Element />
);
