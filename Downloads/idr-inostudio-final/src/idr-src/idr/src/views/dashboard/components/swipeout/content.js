/* eslint-disable global-require, jsx-a11y/no-static-element-interactions */

import React from 'react';
import cn from 'classnames';

import css from './swipeout.css';

class SwipeoutContent extends React.Component {

  componentDidMount() {
    const Hammer = require('hammerjs');

    const mc = new Hammer(this.main);

    // On long press, select item, also
    // Collapse expanded left/right actions
    mc.on('press', ev => {
      this.props.onPress(ev);
      this.resetActions();
    });

    // Collapse expanded left/right actions
    mc.on('tap', e => {
      if (e.target.id === 'icon' || e.target.parentElement.id === 'icon') {
        this.props.onPress(e);
      } else {
        this.props.onClick();
      }
      this.resetActions();
    });
  }

  resetActions = () => {
    if (this.props.leftActionActive || this.props.rightActionActive) {
      this.props.setLeftAction(null);
      this.props.setRightAction(null);
    }
  }

  registerMain = ref => {
    this.main = ref;
  }

  // Removes activated state to avoid issues where one of actions is activated
  // and user tries to swipe again
  handleTouchStart = () => {
    this.resetActions();
  }

  render() {
    // Override slide CSS rules
    // For example, Recall item actions are wider and thus require bigger sliding offset than
    // doc item actions.
    if (this.props.css) {
      css.slideRightLong = this.props.css.slideRightLong;
      css.slideLeftLong = this.props.css.slideLeftLong;
    }

    let mainClasses;
    if (this.props.id && this.props.leftActionActive && this.props.rightActionActive) {
      mainClasses = cn(css.main, this.props.css.main, {
        [css.slideRightLong]:
        this.props.leftActionActive.split('_')[0] === this.props.id.split('_')[0] && // parent_id
        this.props.leftActionActive.split('_')[1] === 'child0', // child_id (equals left action)
        [css.slideLeftLong]:
        this.props.rightActionActive.split('_')[0] === this.props.id.split('_')[0] && // parent_id
        this.props.rightActionActive.split('_')[1] === 'child2', // child_id (equals right action)
      });
    } else {
      mainClasses = cn(css.main, this.props.css.main);
    }

    return (
      <div
        id={this.props.id}
        ref={this.registerMain}
        className={mainClasses}
        onTouchStart={this.handleTouchStart}>
        {this.props.children}
      </div>
    );
  }
}

SwipeoutContent.propTypes = {
  children: React.PropTypes.node.isRequired,
  onPress: React.PropTypes.func,
  onClick: React.PropTypes.func,
  id: React.PropTypes.string,
  css: React.PropTypes.object.isRequired,

  /* swipeout action */
  leftActionActive: React.PropTypes.string,
  rightActionActive: React.PropTypes.string,
  setLeftAction: React.PropTypes.func,
  setRightAction: React.PropTypes.func,
};

export default SwipeoutContent;
