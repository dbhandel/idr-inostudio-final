import React from 'react';
import { action } from '@kadira/storybook';

import MenuPin from 'views/dashboard/components/pdf/menuPin';

const handleMenuClick = () => {
  action('handleMenuClick')();
};

export default <div style={{ marginTop: 30 }}><MenuPin handleMenuClick={handleMenuClick} /></div>;
