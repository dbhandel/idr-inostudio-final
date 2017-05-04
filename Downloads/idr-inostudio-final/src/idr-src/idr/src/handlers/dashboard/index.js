/* global SERVER */
import React from 'react';

import { connect } from 'shared/store';

/* stores */
import UserStore from 'stores/user';

/* components */
const DashboardHandler = connect((props, ctx) => {
  const user = ctx.store(UserStore);
  if (!user.isLoggedIn()) {
    // The user is unauthorized, and should never get here.  Blank div.
    return <div>Not logged in</div>;
  }

  return props.children;
});

DashboardHandler.propTypes = {
  /* nodes */
  children: React.PropTypes.node.isRequired,
};

export default DashboardHandler;
