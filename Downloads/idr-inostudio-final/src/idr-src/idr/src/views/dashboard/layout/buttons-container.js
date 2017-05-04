/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import cn from 'classnames';

/* selectors for hide bottom panel om mobile when keyboard is active */
import layout from './container.css';
/* styles for view */
import css from './buttons-container.css';

/*  */
const ButtonsContainer = props => (
  <section
    className={cn(css.container, layout['buttons-container'], {
      [css['right-half']]: props.position === 'right',
      [css['left-half']]: props.position === 'left',
      [css.base]: props.position === 'base',
    })}>
    {props.title &&
    <div className={cn(css.title, { [css['title-red']]: props.titleType === 'warning' })}>{props.title}</div>}
    <div className={css['buttons-wrapper']}>
      {props.buttons.map((component, index) => (
        <button
          key={index}
          className={css.button}
          onClick={component.handleClick}>{component.title}</button>
      ))}
    </div>
  </section>
);

ButtonsContainer.propTypes = {
  /* arrays */
  buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired,
  })),
  title: React.PropTypes.string,
  /* warning - red bg, default - yellow bg*/
  titleType: React.PropTypes.oneOf(['warning']),
  /* right - 50% width and right align, left - 50% width and left align default - 100% width */
  position: React.PropTypes.oneOf(['right', 'left', 'base']),
};

export default ButtonsContainer;
