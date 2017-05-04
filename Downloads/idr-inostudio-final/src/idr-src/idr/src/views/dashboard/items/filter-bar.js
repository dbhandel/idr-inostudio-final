import React from 'react';

import css from './filter-bar.css';

const Filterbar = ({ onClick }) => (
  <ul className={css['filter-bar']}>
    <li><button onClick={() => onClick('SELECT_ALL')}>SELECT ALL</button></li>
    <li><span>|</span></li>
    <li><button onClick={() => onClick('DESELECT_ALL')}>DESELECT ALL</button></li>
    <li><span>|</span></li>
    <li><button onClick={() => onClick('DELETE_SELECTED')}>DELETE SELECTED</button></li>
  </ul>
);

Filterbar.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export default Filterbar;
