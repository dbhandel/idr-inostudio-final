import React from 'react';
import { action } from '@kadira/storybook';

/* components */
import Nav from 'views/dashboard/layout/nav';

export default (
  <Nav
    toPractice={1000}
    handleExplore={action('clicked Explore')}
    handleCreate={action('clicked Create')}
    handlePractice={action('clicked Practice')}
    handleProgress={action('clicked Progress')}
    handleMore={action('clicked More')} />
);
