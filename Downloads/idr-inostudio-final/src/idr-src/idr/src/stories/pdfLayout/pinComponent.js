import React from 'react';
import { action } from '@kadira/storybook';

import PinComponent from 'views/dashboard/components/pdf/pinComponent';

const handleEditClick = () => {
  action('handleEditClick')();
};

const Element = () => (
  <div style={{ marginTop: 30 }}>
    <PinComponent handleEditClick={handleEditClick} />
  </div>
);

export default <Element />;
