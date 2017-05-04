import React from 'react';

import css from './style.css';

export default () => (
  <div className={css['no-search-result']}>
    <h2>No search results</h2>
    <h3>Try another keywords search</h3>
  </div>
);
