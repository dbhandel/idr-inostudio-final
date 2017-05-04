import React from 'react';

// Components
import Topmenu from './components/topmenu';
import MobileMenu from './components/mobile-menu';
import FrontWrapper from './wrapper';

const Front = props => (
  <FrontWrapper>
    <MobileMenu />
    <Topmenu />
    {props.children}
  </FrontWrapper>
);

Front.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Front;
