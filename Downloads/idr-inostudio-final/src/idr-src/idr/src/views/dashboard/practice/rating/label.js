/* global SERVER */
/* eslint-disable global-require, jsx-a11y/no-static-element-interactions */

import React from 'react';

import env from 'shared/env';

import css from './label.css';

class Label extends React.Component {
  constructor() {
    super();
    this.state = {
      isAnyMobile: env.isAnyMobile,
    };
    this.getTitle = this.getTitle.bind(this);
  }

  getTitle = () => (
    this.state.isAnyMobile
      ? <div className={css.next}>SWIPE LEFT FOR NEXT RECALL</div>
      : <div className={css.next} onClick={this.props.onNext}>CLICK FOR NEXT RECALL</div>
  );

  renderLabel = () => (
    (this.props.count === this.props.current)
      ? <div className={css.next}>SUBMIT FINAL RATING</div>
      : this.getTitle()
  );

  render() {
    return (
      <div>
        {this.props.rating
          ? this.renderLabel()
          : <div className={css.label}>RATE YOUR RESPONSE</div>}
      </div>
    );
  }
}

Label.propTypes = {
  /* numbers */
  rating: React.PropTypes.number.isRequired,
  count: React.PropTypes.number.isRequired,
  current: React.PropTypes.number.isRequired,

  /* functions */
  onNext: React.PropTypes.func.isRequired,
};

export default Label;
