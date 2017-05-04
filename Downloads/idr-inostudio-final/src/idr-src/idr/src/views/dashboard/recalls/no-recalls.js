/* eslint-disable global-require */

import React from 'react';

import iconIdr from 'assets/images/logo/img.svg';
import arrowImage from 'assets/images/illustrations/arrow.svg';

import css from './no-recalls.css';

const NoRecalls = () => (
  <div className={css.container}>
    <div className={css.content}>
      <img className={css.arrowNav} src={arrowImage} alt="Arrow" />
      <div className={css.text}>
        <p className={css.noRecalls}>No recalls</p>
        <p>To get started, click <span className={css.create}>{'"Create"'}</span> on the toolbar</p>
      </div>
      <div className={css.image}>
        <img src={iconIdr} alt="IDR" />
      </div>
    </div>
  </div>
);

NoRecalls.propTypes = {

};

export default NoRecalls;
