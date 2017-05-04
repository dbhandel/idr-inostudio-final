import React from 'react';
import cn from 'classnames';

import css from './button.css';

const ButtonComponent = props => {
  const className = cn(
    {
      [css.disabled]: props.disabled,
    },
    {
      [css.success]: !props.disabled && props.success,
    },
    {
      [css.danger]: !props.disabled && props.danger,
    },
  );

  return (
    <div className={css.button}>
      <button
        onClick={props.onClick}
        className={className}>
        {props.label}
      </button>
    </div>
  );
};

ButtonComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  success: React.PropTypes.bool,
  danger: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};

export default ButtonComponent;
