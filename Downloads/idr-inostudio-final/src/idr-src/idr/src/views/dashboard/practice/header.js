import React from 'react';

import Rocket from 'views/icons/rocket';
import ProgressBar from './progress-bar';

import css from './header.css';

const Header = props => (
  <header>
    <div className={css.rocket}>
      <Rocket width={20} />
    </div>
    <ProgressBar
      count={props.count}
      completed={props.completed}
      closeClick={props.closeClick} />
  </header>
);

Header.propTypes = {
  /* numbers */
  count: React.PropTypes.number.isRequired,
  completed: React.PropTypes.number.isRequired,

  /* functions */
  closeClick: React.PropTypes.func,
};

export default Header;
