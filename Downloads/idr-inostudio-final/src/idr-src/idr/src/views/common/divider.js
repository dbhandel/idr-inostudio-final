/* eslint-disable no-alert */

import React from 'react';

import css from './divider.css';

const Divider = props => (
  <div className={css.divider}><span>{props.title}</span></div>
);

Divider.propTypes = {
  title: React.PropTypes.string,
};

export default Divider;
