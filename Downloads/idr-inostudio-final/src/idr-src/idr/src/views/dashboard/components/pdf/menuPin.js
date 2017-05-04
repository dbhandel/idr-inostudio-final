import React from 'react';
import LeafIcon from 'views/icons/leaf';
import DialogIcon from 'views/icons/dialog';

import css from './menuPin.css';

const MenuPin = ({ handleMenuClick }) => (
  <div className={css['pin-menu']} id="pin">
    <button onClick={() => handleMenuClick('dialog')}><DialogIcon /></button>
    <button onClick={() => handleMenuClick('notes')}><LeafIcon /></button>
  </div>
);

MenuPin.propTypes = {
  handleMenuClick: React.PropTypes.func,
};

export default MenuPin;
