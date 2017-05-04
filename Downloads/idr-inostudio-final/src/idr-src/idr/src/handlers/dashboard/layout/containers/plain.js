import React from 'react';

/* components */
import Container from 'views/dashboard/layout/container';

/* handlers */
import Header from '../header';

const ContainerHandler = props => (
  <Container
    header={<Header />}
    nav={props.nav} >
    {props.children}
  </Container>
);

ContainerHandler.propTypes = {
  /* elements */
  nav: React.PropTypes.element.isRequired,
  children: React.PropTypes.node.isRequired,
};

export default ContainerHandler;
