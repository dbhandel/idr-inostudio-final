import React from 'react';
import NumberFormat from 'react-number-format';

import Close from 'views/icons/close';
import css from './progress-bar.css';

const ProgressBar = ({ count, completed, closeClick }) => {
  const percent = (completed * 100) / count;
  const calc = `calc(0% + ${percent > 100 ? 100 : percent}%)`;

  return (
    <div className={css.progress_bar}>
      <div className={css.progress_bar_top}>
        <div className={css.progress_bar_status}>
          <NumberFormat value={completed} displayType={'text'} thousandSeparator />
          <span className={css.all_question}>
            <span>/</span>
            <NumberFormat value={count} displayType={'text'} thousandSeparator />
          </span>
        </div>
        <div className={css.btn_close}>
          <Close onClick={closeClick} />
        </div>
      </div>
      <div className={css.line}>
        <div className={css.completed} style={{ width: calc }} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  /* numbers */
  count: React.PropTypes.number.isRequired,
  completed: React.PropTypes.number.isRequired,

  /* functions */
  closeClick: React.PropTypes.func.isRequired,
};

export default ProgressBar;
