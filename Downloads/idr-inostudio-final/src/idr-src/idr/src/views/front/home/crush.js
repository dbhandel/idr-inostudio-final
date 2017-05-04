import React from 'react';

import Button from 'views/front/components/button';
import iPadImage from 'assets/images/illustrations/rocket-ipad.svg';
import css from './crush.css';

const Crush = props => (
  <section className={css.section}>
    <article>
      <h2>Crush procrastination.</h2>
      <h3>Master time management.</h3>
      <div>
        <p>
          As you get in the habit of uploading all your study content into
          iDoRecall, you can efficiently train your brain on the very
          knowledge that you want to have at your fingertips.
        </p>
        <p>
          Based upon the latest advances in neuroscience, cognitive
          psychology and education science, iDoRecall helps you capture key
          information, develop robust mental models and perfect your
          natural ability to recall everything you learn. iDoRecall helps
          you develop the knowledge foundation required to become a more
          creative person.
        </p>
      </div>
      <div>
        <Button size="small" color="pink" onClick={props.clickButton}>Sign up now</Button>
      </div>
    </article>
    <aside>
      <img src={iPadImage} alt="iPad screenshot" />
    </aside>
  </section>
);

Crush.propTypes = {
  /* functions */
  clickButton: React.PropTypes.func.isRequired,
};

export default Crush;
