import React from 'react';
import { action } from '@kadira/storybook';

/* components */
import Toggle from 'views/dashboard/components/toggle';

export default (
  <Toggle onClick={action('toggled')} />
);
