/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';

import css from './froala.css';

const ViewOnlyRte = props =>
(
  <div
    className={`fr-element ${css['froala-editor']}`}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: props.content }} />
);

ViewOnlyRte.propTypes = {
  /* strings */
  content: React.PropTypes.string,
};

export default ViewOnlyRte;
