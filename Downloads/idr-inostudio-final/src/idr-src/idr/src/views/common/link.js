/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cn from 'classnames';

/* css */
import css from './link.css';

// Key codes
const sap = {
  ui: {
    keycodes: {
      SPACE: 32,
      ENTER: 13,
    },
  },
};

// Handle key presses (for accesibility)
function handleKeyDown(action) {
  return ev => {
    if (ev.keyCode === sap.ui.keycodes.SPACE ||
      ev.keyCode === sap.ui.keycodes.ENTER) {
      ev.preventDefault();
      action();
    }
  };
}

const Link = props => (
  <span
    role="link"
    tabIndex={props.tabIndex}
    onClick={props.onClick}
    onKeyDown={handleKeyDown(props.onClick)}
    className={cn(css.link, props.className)}>{props.children}</span>
);

Link.propTypes = {
  /* nodes */
  children: React.PropTypes.node.isRequired,

  /* strings */
  className: React.PropTypes.string,

  /* numbers */
  tabIndex: React.PropTypes.number,

  /* functions */
  onClick: React.PropTypes.func.isRequired,
};

Link.defaultProps = {
  tabIndex: 0,
};

export default Link;
