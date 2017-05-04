/* eslint-disable global-require */

import React from 'react';
import Rating from 'views/dashboard/recalls/rating';
import Label from './label';

class RatingView extends React.Component {

  constructor() {
    super();
    this.state = { rating: 0 };
    this.changeRatingHandler = this.changeRatingHandler.bind(this);
    this.onNextHandler = this.onNextHandler.bind(this);
  }

  onNextHandler() {
    this.props.onNext();
  }

  changeRatingHandler(rating) {
    this.setState({ rating });
    this.props.setRating(rating);
  }

  render() {
    return (
      <div>
        <Label
          rating={this.state.rating}
          onNext={this.onNextHandler}
          count={this.props.count}
          current={this.props.current} />
        <Rating
          rating={this.state.rating}
          setRating={this.changeRatingHandler} />
      </div>);
  }
}

RatingView.propTypes = {
  /* number */
  count: React.PropTypes.number,
  current: React.PropTypes.number,

  /* functions */
  setRating: React.PropTypes.func.isRequired,
  onNext: React.PropTypes.func.isRequired,
};

export default RatingView;
