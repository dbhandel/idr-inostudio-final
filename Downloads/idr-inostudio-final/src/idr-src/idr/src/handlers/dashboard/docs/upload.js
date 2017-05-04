import React from 'react';
import { connect } from 'shared/store';

import Nav from 'handlers/dashboard/layout/nav-docs';
import Container from 'handlers/dashboard/layout/containers/plain';

import Upload from 'views/docs/upload/upload';

const Handler = connect(() => (
  <Container nav={<Nav />}>
    <Upload />
  </Container>
));

export default Handler;
