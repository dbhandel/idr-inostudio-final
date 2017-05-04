/* eslint-disable global-require */

import React from 'react';
import cn from 'classnames';

import StarIcon from 'views/icons/star';
import css from './rating.css';

function isMovingOverStar(element, left, top) {
  const d = element.getBoundingClientRect();
  return top >= d.top && left >= d.left &&
    left <= (d.left + element.offsetWidth) &&
    top <= (d.top + element.offsetHeight);
}

class Star extends React.Component {

  setRating = () => {
    this.props.setRating(this.props.id);
  }

  setHover = () => {
    this.props.setHover(this.props.id);
  }

  registerRef = ref => {
    this.ref = ref;
  }

  // Reset the temporary rating (on mouse-out)
  resetHoverRating = () => {
    this.props.setHover(0);
  }

  render() {
    const classes = {
      [css.star]: true,
    };

    if (this.props.rating >= this.props.id) {
      Object.assign(classes, {
        [css[`rate${this.props.rating}`]]: true,
      });
    }

    return (
      <div className={cn(classes)} ref={this.registerRef}>
        <StarIcon
          onMouseOver={this.setHover}
          onMouseOut={this.resetHoverRating}
          onClick={this.setRating} />
      </div>
    );
  }
}

Star.propTypes = {
  /* numbers */
  id: React.PropTypes.number.isRequired,
  rating: React.PropTypes.number.isRequired,

  /* functions */
  setRating: React.PropTypes.func.isRequired,
  setHover: React.PropTypes.func.isRequired,
};


class Rating extends React.Component {

  constructor() {
    super();
    this.stars = [];
    this.state = {
      hover: 0,
    };
  }

  componentDidMount() {
    const Hammer = require('hammerjs');

    const mc = new Hammer(this.ratingRef);
    // Add a rating when moving over a star
    mc.on('pan', ev => {
      this.stars.forEach((star, index) => {
        if (isMovingOverStar(star.ref, ev.center.x, ev.center.y)) {
          this.props.setRating(index + 1);
        }
      });
    });
  }

  * getStars() {
    for (let i = 1; i <= 5; i++) {
      yield <Star
        ref={this.registerStar}
        id={i}
        key={i}
        rating={this.getRating()}
        setHover={this.handleHoverRating}
        setRating={this.handleSetRating} />;
    }
  }

  getRating = () => this.props.rating || this.state.hover;

  handleHoverRating = hover => {
    this.setState({
      hover,
    });
  }

  handleSetRating = rating => {
    this.props.setRating(rating);
  }

  registerStar = ref => {
    this.stars.push(ref);
  }

  registerRatingRef = ref => {
    this.ratingRef = ref;
  }

  render() {
    return (
      <section ref={this.registerRatingRef} className={css.section}>
        {[...this.getStars()]}
      </section>
    );
  }
}

Rating.propTypes = {
  /* numbers */
  rating: React.PropTypes.number,

  /* functions */
  setRating: React.PropTypes.func.isRequired,
};

export default Rating;
