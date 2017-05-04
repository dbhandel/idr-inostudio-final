import React from 'react';
import cn from 'classnames';

import css from './button.css';

const Button = props => {
  const classes = cn({
    [css.button]: true,
    [css.small]: props.size === 'small',
    [css.pink]: props.color === 'pink',
    [css['dark-grey']]: props.color === 'dark-grey',
    [css.yellow]: props.color === 'yellow',

  });

  const filteredProps = {
    onClick: props.onClick,
  };

  return (
    <button className={classes} {...filteredProps}>{props.children}</button>
  );
};

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  size: React.PropTypes.string,
  color: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Button;
