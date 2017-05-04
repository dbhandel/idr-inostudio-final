import React from 'react';

import desktopImage from 'assets/images/illustrations/desktop.svg';
import Button from 'views/front/components/button';
import css from './organized.css';

export default () => (
  <section className={css.section}>
    <article>
      <header>
        <h2>Get organized.</h2>
        <h3>Stay organized.</h3>
      </header>
      <p>
        Students today are faced with a wider range of study content than
        ever before. It has become near impossible to organize the wide array
        of class notes, handouts, assigned reading, physical books, ebooks,
        slide presentations, PDFs, videos, images, smart- phone photos of
        content, web page reading, results of Google searches, and many
        other learning sources. How can students keep all this disparate
        yet related content and study material organized? The answer for
        you is iDoRecall. Upload all your study content into iDoRecall and
        we’ll make it super easy to keep everything tightly organized
        and easily searchable.
      </p>
      <Button size="small">Track your progress</Button>
    </article>
    <figure>
      <img src={desktopImage} alt="Desktop screenshot" />
    </figure>
  </section>
);
