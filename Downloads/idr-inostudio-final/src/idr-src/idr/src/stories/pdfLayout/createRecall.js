import React from 'react';
import { action } from '@kadira/storybook';

import CreateRecall from 'views/dashboard/components/pdf/createRecall';

const handleCreateClick = () => {
  action('handleCreateClick')();
};

const Element = () => (
  <div style={{ marginTop: 30 }}>
    <CreateRecall handleCreateClick={handleCreateClick} />
  </div>
);

export default <Element />;
