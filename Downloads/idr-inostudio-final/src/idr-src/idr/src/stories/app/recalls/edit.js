import React from 'react';
import { connect } from 'shared/store';
import { action } from '@kadira/storybook';

/* store */
import RecallsStore from 'stories/stores/recalls';

import Container from 'views/dashboard/layout/container';
import Explore from 'views/dashboard/recalls/explore/';

import Header from '../layout/header';
import Nav from '../layout/nav';

/* init */
const recalls = new RecallsStore();

recalls.init();

const handleEdit = () => {
  action('Edit button clicked.')();
};

const handleCancel = () => {
  action('Cancel button clicked.')();
};

const handleRunSelected = () => {
  action('Recall-Item -> handleRunSelected()')();
};

const handleRunDue = () => {
  action('Recall-Item -> handleRunDue()')();
};

const Element = connect(() =>
  (
    <Container
      header={Header}
      nav={Nav}>
      <Explore
        onSave={handleEdit}
        onCancel={handleCancel}
        runSelected={handleRunSelected}
        runDue={handleRunDue} />
    </Container>
  ),
);

export default (
  <Element />
);
