import React from 'react';
import { action } from '@kadira/storybook';

/* components */
import Nav from 'views/dashboard/layout/nav-docs';

export default (
  <Nav
    toInbox={123}
    handleExplore={action('clicked Explore')}
    handleUpload={action('clicked Upload')}
    handleInbox={action('clicked Inbox')}
    handleProgress={action('clicked Progress')}
    handleMore={action('clicked More')} />
);
