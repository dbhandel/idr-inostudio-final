import React from 'react';
import cn from 'classnames';

import LeafIcon from 'views/icons/leaf';

import css from './editRecall.css';

const EditRecall = ({ reverse, handleClick }) => (
  <div className={css['recall-edit']}>
    <div className={cn(css['recall-edit_conteiner'], { [css.reverse]: reverse })}>
      <button className={css['recall-edit_title']} onClick={handleClick}>edit the recall</button>
      <p className={css['recall-edit_text']}>
        Add the ability to restrict answers in the Open-ended
        questions and Open-ended answers to special types (number, zip, phone#, email).
        Input field would have to be smaller, and input would have to be validated.
      </p>
    </div>
    <button><LeafIcon /></button>
  </div>
);

EditRecall.defaultProps = {
  reverse: false,
};

EditRecall.propTypes = {
  reverse: React.PropTypes.bool,
  handleClick: React.PropTypes.func,
};

export default EditRecall;
