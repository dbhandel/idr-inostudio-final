import React from 'react';
import { action as actionLogger } from '@kadira/storybook';

import { connect } from 'shared/store';

/* get queries */
import sessionQuery from 'queries/getSession.gql';

/* stores */
import SessionStore from 'stores/session';

/* styles */
import css from './sessions.css';

/* functions */
function getAST() {
  actionLogger('Query')(JSON.stringify(sessionQuery, null, 2));
}

const Connected = connect((_, ctx) => {
  const store = ctx.store(SessionStore);

  return (
    <div className={css.sessions}>
      <h3>Session ID: {store.id}</h3>
      <h3>Is logged in?: {JSON.stringify(store.isLoggedIn)}</h3>
      <h3>User: {store.firstName} {store.lastName} {store.email}</h3>
      <button onClick={store.getSession}>Get session</button>
      <button onClick={store.destroySession}>Destroy session</button>
      <button onClick={getAST}>Log session query AST</button>
    </div>
  );
});

export default <Connected />;
