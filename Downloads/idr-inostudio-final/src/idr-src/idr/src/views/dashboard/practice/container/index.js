/* eslint-disable no-alert, no-undef, react/jsx-no-bind */

import React from 'react';
import cn from 'classnames';
import HammerCarousel from './carousel';

// components
import Header from '../header';
import Response from '../response';
import Answer from '../answer';
import Rating from '../rating';

// styles
import css from './index.css';

class PracticeContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      lastRevealIndex: -1,
    };

    this.practiceContainerId = 'practice-container';
    this.rating = 0;

    this.onRevealHandler = this.onRevealHandler.bind(this);
    this.onPanendHandler = this.onPanendHandler.bind(this);
    this.getCurrentRating = this.getCurrentRating.bind(this);
    this.onNextHandler = this.onNextHandler.bind(this);
    this.resizeWindow = this.resizeWindow.bind(this);
  }

  componentDidMount() {
    this.outer = new HammerCarousel(
      document.getElementById(this.practiceContainerId),
      Hammer.DIRECTION_HORIZONTAL,
      css.animate,
      this.getCurrentRating);

    this.outer.hammer.on('panend', this.onPanendHandler);
    window.addEventListener('resize', this.resizeWindow);
  }

  componentWillUnmount() {
    this.outer.hammer.off('panend', this.onPanendHandler);
    window.removeEventListener('resize', this.resizeWindow);
  }

  onPanendHandler() {
    // set rating 0 for next practice
    if (this.outer.currentIndex !== this.state.currentIndex) {
      this.rating = 0;
      this.setState({ currentIndex: this.outer.currentIndex });
    }
  }

  onRevealHandler() {
    this.setState({ lastRevealIndex: this.state.currentIndex });
  }

  onNextHandler() {
    this.outer.showNext();
    this.onPanendHandler();
  }

  getCurrentRating() {
    return this.rating;
  }

  setRatingHandler(id, rating) {
    this.rating = rating;
    this.props.setRating(Number(id), rating);
  }

  resizeWindow() {
    this.outer.setPosition(this.state.currentIndex);
  }

  render() {
    const practices = this.props.recalls.map(function recallMap(it, index) {
      return (
        <article className={css.practice} key={index}>
          <Response
            question={it.text}
            response={it.response}
            changeResponse={val => this.props.changeResponse(val, it)} />
          <div className={cn(css.answer, { [css.expanded]: index <= this.state.lastRevealIndex })}>
            <Answer
              question={it.text}
              response={it.response}
              answer={it.answer}
              tags={it.tags}
              source={it.source}
              documents={it.documents}
              views={it.views}
              progress={it.progress}
              onReveal={this.onRevealHandler} />
          </div>
          <div className={cn(css.rating, { [css.expanded]: index <= this.state.lastRevealIndex })}>
            <Rating
              setRating={this.setRatingHandler.bind(this, it.id)}
              onNext={this.onNextHandler}
              count={this.props.recalls.length}
              current={this.state.currentIndex + 1} />
          </div>
        </article>);
    }, this);
    return (
      <div className={css.wrapper}>
        <div className={css.header}>
          <Header
            completed={this.state.currentIndex + 1}
            count={this.props.recalls.length}
            closeClick={this.props.closeClick} />
        </div>
        <div className={css.container} id={this.practiceContainerId}>
          {practices}
        </div>
      </div>
    );
  }
}

PracticeContainer.propTypes = {
  recalls: React.PropTypes.array,
  changeResponse: React.PropTypes.func,
  setRating: React.PropTypes.func,
  closeClick: React.PropTypes.func,
};

export default PracticeContainer;
