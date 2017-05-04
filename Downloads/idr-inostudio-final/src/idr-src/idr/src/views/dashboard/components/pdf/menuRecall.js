import React from 'react';
import LeafAddIcon from 'views/icons/leafAdd';
import TrashIcon from 'views/icons/trash';

import css from './pdf.css';

const menuRecall = () => (
  <div className={css}>
    <button className={css['recall-create']}><LeafAddIcon /></button>
    <button className={css['recall-delete']}><TrashIcon /></button>
  </div>
);

export default menuRecall;
