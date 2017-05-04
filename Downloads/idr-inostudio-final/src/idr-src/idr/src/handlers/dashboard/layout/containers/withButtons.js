import React from 'react';

/* components */
import Container from 'views/dashboard/layout/container';
import ButtonsContainer from 'views/dashboard/layout/buttons-container';

/* handlers */
import Header from '../header';

const ContainerWithButtonsHandler = props => (
  <Container
    header={<Header />}
    nav={props.nav}
    buttons={<ButtonsContainer buttons={props.buttons} />} >
    {props.children}
  </Container>
);

ContainerWithButtonsHandler.propTypes = {
  /* elements */
  nav: React.PropTypes.element.isRequired,
  children: React.PropTypes.node.isRequired,

  /* arrays */
  buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired,
  })),
};

export default ContainerWithButtonsHandler;
