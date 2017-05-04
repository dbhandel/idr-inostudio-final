import React from 'react';
import cn from 'classnames';

import css from './swipeout.css';

const SwipeoutHover = props => {
  // "active" is reserved for opened state in master/detail view
  const hoverActionsClasses = cn(css.hoverActions, {
    [css.fadeIn]: props.isHovered,
  });

  return (
    <div className={hoverActionsClasses} id={props.id}>
      {props.children}
    </div>
  );
};

SwipeoutHover.propTypes = {
  children: React.PropTypes.node.isRequired,
  id: React.PropTypes.string,
  isHovered: React.PropTypes.bool,
};

export default SwipeoutHover;
