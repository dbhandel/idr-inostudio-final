import React from 'react';

import spacedPracticeImage from 'assets/images/illustrations/spaced-practice.svg';
import interleavingImage from 'assets/images/illustrations/interleaving.svg';
import variationImage from 'assets/images/illustrations/variation.svg';
import reflectionImage from 'assets/images/illustrations/reflection.svg';
import generationImage from 'assets/images/illustrations/generation.svg';
import elaborationImage from 'assets/images/illustrations/elaboration.svg';
import css from './benefits.css';

export default () => (
  <section className={css.section}>
    <header>
      <h2>Leverage cutting edge</h2>
      <h3>learning techniques</h3>
    </header>
    <article>
      <p>
        Without a deep and broad knowledge base, there is no foundation for
        creativity nor the framework for attaching new learnings. When we
        possess a large quantity of easily retrievable knowledge and robust
        mental models on a subject matter, we become capable of inventing
        creative and novel solutions to future problems.
      </p>
      <p>
        IDoRecall utilizes these and many other scientifically proven
        strategies for effective learning and long-term recall
      </p>
    </article>
    <article>
      <figure>
        <img src={spacedPracticeImage} alt="Spaced practice" />
        <h4>Spaced practice</h4>
        <p>
          Despite popular belief, reviewing, rereading and highlighting do not
          create durable long-term memory.
          <em>Only practicing retrieval from memory</em>, especially when
            practice is spaced over time, creates the pathways needed to
            easily recall what you have learned.
        </p>
      </figure>
      <figure>
        <img src={interleavingImage} alt="Interleaving" />
        <h4>Interleaving</h4>
        <p>
          Switching practice between different subjects and topic areas
          fortifies your recall skills. Interleaving <em>strengthens memory
          associations</em> by training your brain to einforce neural
          connections between different tasks and correct responses.
        </p>
      </figure>
      <figure>
        <img src={variationImage} alt="Variation" />
        <h4>Variation</h4>
        <p>
          Variation in your practice approach increases the <em>mental
          flexibility required to solve new problems</em> which arise in life
          that often don’t follow the rigid rules of textbook learning. If
          you want to become proficient at 3 foot putts, practice more 2 and
          4 foot putts.
        </p>
      </figure>
      <figure>
        <img src={reflectionImage} alt="Reflection" />
        <h4>Reflection</h4>
        <p>
          Recall information and events and then <em>analyze the what, how and
          why</em>. Ask yourself these questions and consider future
          alternative solutions in order to create supercharged mental models.
          IDoRecall’s in-app coach will guide you to reflect.
        </p>
      </figure>
      <figure>
        <img src={generationImage} alt="Generation" />
        <h4>Generation</h4>
        <p>
          Come up with answers to questions you’ve never even faced before.
          <em>Even a failed attempt helps create the infrastructure for new
          learning</em>. Finding new solutions to a problem prompts your
          brain to activate all relevant memories and makes it more receptive
          to the new materials.
        </p>
      </figure>
      <figure>
        <img src={elaborationImage} alt="Elaboration" />
        <h4>Elaboration</h4>
        <p>
          Elaboration is the expression of concepts, facts and ideas in your
          own words and then tying additional layers of information that
          you already know to the subject at hand. This results in far
          <em>richer mental models</em> that prepare your brain for
            internalizing new content.
        </p>
      </figure>
    </article>
  </section>
);
