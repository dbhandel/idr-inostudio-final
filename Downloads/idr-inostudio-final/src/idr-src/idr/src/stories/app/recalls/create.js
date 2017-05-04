import React from 'react';
import { connect } from 'shared/store';
import userAgent from 'shared/env';
import { action } from '@kadira/storybook';

/* stores */
import RecallStore from 'stores/dashboard/recall';

/* components */
import Container from 'views/dashboard/layout/container';
import CreateRecall from 'views/dashboard/recalls/create/';
import Header from '../layout/header';
import Nav from '../layout/nav';

/* init */
const isMobile = userAgent.isAnyMobile;

const handleEdit = () => {
  action('Save button clicked.')();
};

const handleCancel = () => {
  action('Cancel button clicked.')();
};

const Element = connect((_, ctx) => {
  const recall = ctx.store(RecallStore);
  return (
    <Container
      header={Header}
      nav={Nav}>
      <CreateRecall
        recall={recall}
        isMobile={isMobile}
        onEdit={handleEdit}
        onCancel={handleCancel} />
    </Container>
  );
});

export default (
  <Element />
);
