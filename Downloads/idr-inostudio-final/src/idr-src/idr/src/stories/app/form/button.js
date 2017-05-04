import React from 'react';
import { action } from '@kadira/storybook';

/* components */
import ButtonComponent from 'views/common/form/button';

export default (
  <div style={{ margin: '1rem auto', width: '22rem' }}>
    <ButtonComponent
      success
      label="default success"
      onClick={action('clicked on default success')} />
    <ButtonComponent
      success
      disabled
      label="disabled success"
      onClick={action('clicked on disabled success')} />
    <ButtonComponent
      danger
      label="default danger"
      onClick={action('clicked on default danger')} />
    <ButtonComponent
      danger
      disabled
      label="disabled danger"
      onClick={action('clicked on disabled danger')} />
  </div>
);
