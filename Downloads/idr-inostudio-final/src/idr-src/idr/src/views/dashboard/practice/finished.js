import React from 'react';
import PracticeCompleteIcon from 'assets/images/illustrations/practice_complete.svg';
import css from './finished.css';

const finished = () => (
  <div className={css.finished}>
    <div className={css['finished-container']}>
      <img src={PracticeCompleteIcon} alt="Practice CompleteIcon" />
      <p className={css.title}>Practice complete!</p>
      <p>That`s all for today.</p>
      <p>We`ll  e-mail you when it`s time for your next session</p>
    </div>
    <button>finish</button>
  </div>
);

export default finished;
