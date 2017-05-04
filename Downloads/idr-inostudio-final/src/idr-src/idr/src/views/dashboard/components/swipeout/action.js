/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import cn from 'classnames';

import css from './swipeout.css';

// Swipeout component for handling left and right action buttons
class SwipeoutAction extends React.Component {
  // This is for an alternative behavior to long swipe where you can
  // swipe the small icon first, then tap it to expand full text.
  handleClick = event => {
    if (this.props.position === 'left') {
      // Are we ready to confirm the action?
      if (this.props.leftActionActive === this.props.id) {
        this.props.setLeftAction(null);
        // Call parent's onClick handler
        return this.props.onClick(event);
      }
      // Nope, so first set to activated
      this.props.setLeftAction(this.props.id);
    } else {
      // Are we ready to confirm the action?
      if (this.props.rightActionActive === this.props.id) {
        this.props.setRightAction(null);
        // Call parent's onClick handler
        return this.props.onClick(event);
      }
      // Nope, so first set to activated
      this.props.setRightAction(this.props.id);
    }
    return true;
  }
  render() {
    const isLeft = this.props.position === 'left';
    const isRight = this.props.position === 'right';

    // "slide" class slides out the action button when it is tapped
    const actionClasses = cn(css.action, {
      [css.left]: isLeft,
      [css.right]: isRight,
      [css.slide]:
        (isLeft && this.props.leftActionActive === this.props.id)
        || (isRight && this.props.rightActionActive === this.props.id),
    });

    // Invisible action button wrapper. It allows us to "stretch" action's background color on swipe
    const actionContainerClasses = isLeft ? css.actionContainerLeft : css.actionContainerRight;

    return (
      <div className={actionContainerClasses} id={this.props.id}>
        <div className={actionClasses} onClick={this.handleClick}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

SwipeoutAction.propTypes = {
  children: React.PropTypes.node,
  id: React.PropTypes.string,
  position: React.PropTypes.string,

  /* functions */
  onClick: React.PropTypes.func,

  /* swipeout action */
  leftActionActive: React.PropTypes.string,
  rightActionActive: React.PropTypes.string,
  setLeftAction: React.PropTypes.func,
  setRightAction: React.PropTypes.func,
};

export default SwipeoutAction;
