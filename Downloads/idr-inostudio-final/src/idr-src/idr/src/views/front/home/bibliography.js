import React from 'react';

import learningHowToLearn1xImage from 'assets/images/ext/learning-how-to-learn.png';
import learningHowToLearn2xImage from 'assets/images/ext/learning-how-to-learn@2x.png';
import peak1xImage from 'assets/images/ext/peak-secrets.png';
import peak2xImage from 'assets/images/ext/peak-secrets@2x.png';
import makeItStick1xImage from 'assets/images/ext/make-it-stick.png';
import makeItStick2xImage from 'assets/images/ext/make-it-stick@2x.png';
import mindset1xImage from 'assets/images/ext/mindset.png';
import mindset2xImage from 'assets/images/ext/mindset@2x.png';
import css from './bibliography.css';

// Image src sets
const learningHowToLearnSrcSet = `${learningHowToLearn1xImage} 1x, ${learningHowToLearn2xImage} 2x`;
const peakSrcSet = `${peak1xImage} 1x, ${peak2xImage} 2x`;
const makeItStickSrcSet = `${makeItStick1xImage} 1x, ${makeItStick2xImage} 2x`;
const mindsetSrcSet = `${mindset1xImage} 1x, ${mindset2xImage} 2x`;

export default () => (
  <section className={css.section}>
    <header>
      <h2>Read more about</h2>
      <h3>The core learning strategies</h3>
    </header>
    <figure>
      <img src={learningHowToLearn1xImage} srcSet={learningHowToLearnSrcSet} alt="Learning How To Learn" />
      <figcaption>
        <p>
          &ldquo;Experts in any domain generally have great swaths of memorized
          information directly at their fingertips. The memorization process
          can, perhaps surprisingly, lead to deeper understanding. It might
          seem counterintuitive, but it&lsquo;s true!&rdquo;
        </p>
        <p className={css.name}>Professor Barbara Oakley</p>
        <p className={css.byline}>
          Co-creator of the &ldquo;Learning How To Learn&rdquo; MOOC at
          Coursera.com
        </p>
      </figcaption>
    </figure>
    <figure>
      <img src={peak1xImage} srcSet={peakSrcSet} alt="Learning How To Learn" />
      <figcaption>
        <p>
          &ldquo;Learning isn’t a way of reaching one’s potential but rather
          a way of developing it. We can create our own potential. The right
          sort of practice carried out over a sufficient period of time leads
          to improvement. Nothing else.&rdquo;
        </p>
        <p className={css.name}>Professor Anders Ericsson and Robert Pool</p>
      </figcaption>
    </figure>
    <figure>
      <img src={makeItStick1xImage} srcSet={makeItStickSrcSet} alt="Make It Stick" />
      <figcaption>
        <p>
          &ldquo;It turns out that much of what we’ve been doing as teachers
          and students isn’t serving us well, but some comparatively simple
          changes could make a big difference.&rdquo;
        </p>
        <p className={css.name}>Professors Henry Roediger and Mark McDaniel</p>
      </figcaption>
    </figure>
    <figure>
      <img src={mindset1xImage} srcSet={mindsetSrcSet} alt="Mindset" />
      <figcaption>
        <p>
          &ldquo;A few modern philosophers ... assert that an individual’s
          intelligence is a fixed quantity, a quantity which cannot be increased.
          We must protest and react against this brutal pessimism.... With
          practice, training, and above all, method, we manage to increase
          our attention, our memory, our judgment and literally to become
          more intelligent than we were before.&rdquo;
        </p>
        <p className={css.name}>Professor Carol Dweck</p>
      </figcaption>
    </figure>
  </section>
);
