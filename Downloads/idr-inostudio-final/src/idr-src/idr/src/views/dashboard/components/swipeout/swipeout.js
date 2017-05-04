/* eslint-disable */

import React from 'react';
import cn from 'classnames';

import css from './swipeout.css';
import env from 'shared/env';

// Parent which contains SwipeoutAction and SwipeoutContent sub-components
class Swipeout extends React.Component {
  constructor() {
    super();
    this.state = {
      isHovered: false,
    };
    this.isAnyMobile = env.isAnyMobile;
  }

  componentDidMount() {
    const Swiped = require('./swiped');

    const mainElement = document.getElementById(this.props.id + '_child1');
    // 33 px is default value for icon width
    // 40 px is default tolerance
    const swipeMargin = mainElement.offsetHeight < 33 ? 33 : mainElement.offsetHeight;
    const swipeTolerance = swipeMargin > 33 ? (swipeMargin - 1) : 40;

    Swiped.init({
      leftAction: document.getElementById(this.props.id + '_child0').firstChild,
      rightAction: document.getElementById(this.props.id + '_child2').firstChild,
      mainAction: mainElement,
      tolerance: swipeTolerance,
      left: swipeMargin,
      right: swipeMargin,
      duration: 200,
      onLongSwipeComplete: this.onLongSwipe,
    });
  }

  onLongSwipe = direction => {
    // Long swipe behavior similar to the iOS Mail app
    if (direction === 1) {
      this.handleLeftClick();
    }
    if (direction === -1) {
      this.handleRightClick();
    }
  }

  handleMouseEnter = () => {
    // adds light-grey background and actions on mouse over
    this.setState({ isHovered: !this.isAnyMobile && true });
  }

  handleMouseLeave = () => {
    // removes light-grey background and actions on mouse out
    this.setState({ isHovered: !this.isAnyMobile && false });
  }

  render() {
    // Swipeout top-level container classes
    const { actionFilterType } = this.props;

    let borderStyle = 'borderGreen';

    if (actionFilterType == 'DELETE')
      borderStyle = 'borderRed'
    else
      borderStyle = 'borderGreen'

    const swipeoutClasses = cn(css.swipeout, this.props.className, {
      [css.selected]: this.props.selected,
      [css[borderStyle]]: this.props.selected,
      [css.hover]: this.state.isHovered // toggles light-grey background on mouse over
    });



    // Swipeout components should contain three sub-components: SwipeoutAction (x2), SwipeoutContent (x1)
    // We are using Children.map to modify children components with a custom "ref" so that we could
    // use findDOMNode and pass these Node elements to "Swiped" library
    // We also pass the paren'ts store down to children
    return (
      <div
        className={swipeoutClasses}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        {React.Children.map(this.props.children, (component, index) => {
          if (component.props.position === 'left') {
            // get onClick handler reference for the "long swipe" callback
            this.handleLeftClick = component.props.onClick;
          }
          if (component.props.position === 'right') {
            // get onClick handler reference for the "long swipe" callback
            this.handleRightClick = component.props.onClick;
          }

          return React.cloneElement(component, {
            id: this.props.id + '_child' + index, // build new id using parent_id and child_id
            isHovered: this.state.isHovered,
            leftActionActive: this.props.leftActionActive,
            rightActionActive: this.props.rightActionActive,
            setLeftAction: this.props.setLeftAction,
            setRightAction: this.props.setRightAction,
          });
        })}
      </div>
    );
  }
}

Swipeout.propTypes = {
  children: React.PropTypes.node.isRequired,
  id: React.PropTypes.string,

  /* swipeout action */
  leftActionActive: React.PropTypes.string,
  rightActionActive: React.PropTypes.string,
  setLeftAction: React.PropTypes.func,
  setLeftAction: React.PropTypes.func,
};

export default Swipeout;
