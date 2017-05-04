import React from 'react';

import Button from 'views/front/components/button';
import playIcon from 'assets/images/icons/play.svg';
import css from './hero.css';

const Hero = props => (
  <section className={css.wrapper}>
    <div className={css.content}>
      <div className={css.headline}>
        <h1>Study <em>harder</em> smarter<sup>&#8480;</sup></h1>
        <h2>Remember everything you learn. Forever.</h2>
      </div>
      <div className={css.play} >
        <div className={css.circle}>
          <img src={playIcon} alt="Play" />
        </div>
        <h3>Watch demo</h3>
      </div>
      <div className={css.button}>
        <Button onClick={props.clickButton}>Get started!</Button>
      </div>
    </div>
  </section>
);

Hero.propTypes = {
  /* functions */
  clickButton: React.PropTypes.func.isRequired,
};

export default Hero;
