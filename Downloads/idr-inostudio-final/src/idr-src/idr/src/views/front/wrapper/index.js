import React from 'react';
import css from './index.css';

const FrontWrapper = props => (
  <div className={css['front-wrapper']}>
    {props.children}
  </div>
);

FrontWrapper.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default FrontWrapper;
