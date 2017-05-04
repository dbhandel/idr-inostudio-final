import React from 'react';
import { action } from '@kadira/storybook';

import PinToolbar from 'views/dashboard/components/pdf/pin';

const handleClick = () => {
  action('handleClick')();
};

export default <PinToolbar handleClick={handleClick} />;
