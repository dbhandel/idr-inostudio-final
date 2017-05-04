import React from 'react';
import { connect } from 'shared/store';

/* components */
import Container from 'views/dashboard/layout/container';
import NoRecalls from 'views/dashboard/recalls/no-recalls';
import Header from '../layout/header';
import Nav from '../layout/nav';

/* init */

const Element = connect(() => (
  <Container header={Header} nav={Nav} >
    <NoRecalls />
  </Container>
));

export default (
  <Element />
);
