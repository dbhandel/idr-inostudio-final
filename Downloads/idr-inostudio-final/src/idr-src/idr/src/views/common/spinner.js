/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cn from 'classnames';

import SpinnerImager from 'assets/images/spinner/spinner.svg';

import css from './spinner.css';

const Spinner = props => (
  <div className={css.container}>
    {props.visible &&
      <div className={css.spinner}>
        <img src={SpinnerImager} alt="spinner" />
      </div>}
    <div className={cn(css.content, { [css['content-behind']]: props.visible })}>
      {props.children}
    </div>
  </div>
);

Spinner.propTypes = {
  visible: React.PropTypes.bool,
  /* children */
  /* should be element or array of elements*/
  children: React.PropTypes.element.isRequired,
};

export default Spinner;
