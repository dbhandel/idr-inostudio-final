import React from 'react';
import { connect } from 'shared/store';
import userAgent from 'shared/env';
import { action } from '@kadira/storybook';

/* stores */
import RecallStore from 'stores/dashboard/recall';

/* components */
import CreateDoc from 'views/dashboard/docs/create/';

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
    <CreateDoc
      recall={recall}
      isMobile={isMobile}
      onEdit={handleEdit}
      onCancel={handleCancel} />
  );
});

export default (
  <Element />
);
