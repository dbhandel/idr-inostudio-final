import React from 'react';

/* handlers */
import FrontWrapper from 'views/front/wrapper';
import Footer from './layout/footer';

/* local components */
import TopMenu from './layout/top-menu';
import MobileMenu from './layout/mobile-menu';

const Front = props => (
  <FrontWrapper>
    <MobileMenu />
    <TopMenu />
    {props.children}
    <Footer />
  </FrontWrapper>
);

Front.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Front;
