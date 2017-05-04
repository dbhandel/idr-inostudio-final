import React from 'react';

import Button from 'views/front/components/button';
import iphoneImage from 'assets/images/illustrations/iphone.svg';
import css from './remember.css';

export default () => (
  <section className={css.section}>
    <article>
      <h2>Remember<br />everything<br />you learn.<br /><em>Forever.</em></h2>
      <div>
        <p>
          As you get in the habit of uploading all your study content
          into iDoRecall, you can efficiently train your brain on the very
          knowledge that you want to have at your fingertips.
        </p>
        <p>
          Based upon the latest advances in neuroscience, cognitive psychology
          and education science, iDoRecall helps you capture key information,
          develop robust mental models and perfect your natural ability to
          recall everything you learn. iDoRecall helps you develop the knowledge
          foundation required to become a more creative person.
        </p>
      </div>
      <div>
        <Button size="small">Try the app</Button>
      </div>
    </article>
    <aside>
      <img src={iphoneImage} alt="iPhone screenshot" />
    </aside>
  </section>
);
