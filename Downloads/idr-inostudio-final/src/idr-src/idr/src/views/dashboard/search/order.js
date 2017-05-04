/* eslint-disable jsx-a11y/no-static-element-interactions */

// React libraries
import React from 'react';

// SVGs
import SortDown from 'views/icons/sort-down';
import SortUp from 'views/icons/sort-up';

// css
import css from './order.css';

const OrderControl = props => {
  let orderingasc = null;
  /*
  If the component to render is currently selected in state as being sorted on,
  set it to active (a class) and show the appropriate arrow asc.

  Otherwise, simply display the arrows pointing down for non-active controls.
  */
  if (props.sort) {
    if (props.active === props.column) {
      // the asc of an arrow for ascending or descending was taken from http://ux.stackexchange.com/a/38654/38192
      orderingasc = props.asc
        ? <SortUp className={css['active-control']} /> : <SortDown className={css['active-control']} />;
    } else {
      orderingasc = <SortDown />;
    }
  }

  return (
    <div
      className={css['ordering-control']}
      style={props.style}
      onClick={() => props.handleChange(props.column)}>
      {props.name}
      {orderingasc}
    </div>
  );
};

OrderControl.propTypes = {

  /* strings */
  name: React.PropTypes.string.isRequired,
  column: React.PropTypes.string.isRequired,
  active: React.PropTypes.string.isRequired,

  /* bools */
  sort: React.PropTypes.bool.isRequired,
  asc: React.PropTypes.bool.isRequired,

  /* objects */
  style: React.PropTypes.object,

  /* functions */
  handleChange: React.PropTypes.func,
};

export default OrderControl;
