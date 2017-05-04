import React from 'react';
import LeafAddIcon from 'views/icons/leafAdd';

import css from './pdf.css';

const CreateRecall = ({ handleCreateClick }) => (
  <div className={css['recall-create']}>
    <button className={css['recall-create_title']} onClick={handleCreateClick}>
      create recall
    </button>
    <button><LeafAddIcon /></button>
  </div>
);

CreateRecall.propTypes = {
  handleCreateClick: React.PropTypes.func,
};

export default CreateRecall;
