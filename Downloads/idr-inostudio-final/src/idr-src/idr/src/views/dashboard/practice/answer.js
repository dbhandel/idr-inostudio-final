/* eslint-disable react/no-danger */
import React from 'react';

import TagIcon from 'views/icons/tag';
import LinkIcon from 'views/icons/link';
import DocsIcon from 'views/icons/docs';
import ProgressIcon from 'views/icons/progress';
import cn from 'classnames';
import css from './answer.css';

const classes = cn(css.row, {
  [css.additionally]: css.additionally,
});

function createMarkup(text) {
  return { __html: text };
}

const Answer = props => {
  const tag = props.tags.map((item, index) => (
    <span key={index} className={css.tag}>{item}</span>
  ));
  return (
    <div className={css.answer}>
      <div className={css.controls}>
        <button className={css.button} onClick={props.onReveal}>Reveal the answer</button>
      </div>
      <div className={css['answer-block']}>
        <div className={css.row}>
          <div className={css.icon}>Q</div>
          <div className={css.text}>
            <p dangerouslySetInnerHTML={createMarkup(props.question)} />
          </div>
        </div>
        {props.response && <div className={css.row}>
          <div className={css.icon}>R</div>
          <div className={css.text}>
            <p>{props.response}</p>
          </div>
        </div>}
        <div className={css.row}>
          <div className={css.icon}>A</div>
          <div className={css.text}>
            <p className={css.text_answer}>{props.answer}</p>
          </div>
        </div>
        <div className={classes}>
          <TagIcon className={css.rotate} />
          {tag}
        </div>
        <div className={classes}>
          <LinkIcon className={css.rotate} />
          <div className={css.source}>
            Source: <a href={props.source.link} target="_blank" rel="noopener noreferrer">{props.source.text}</a>
          </div>
        </div>
        {false &&
        <div className={classes}>
          <DocsIcon className={css.docs_icon} />
          <div className={css.docs}>
            <p className={css.docs_title}>{props.documents.title}</p>
            {props.documents.content}
          </div>
        </div>}
        <div className={classes}>
          <ProgressIcon />
          <div className={css.progress}>
            <span>You saw this Recall {props.views} times.</span>
            <span>Progress Level is {props.progress.to}/{props.progress.from}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Answer.propTypes = {
  question: React.PropTypes.string.isRequired,
  answer: React.PropTypes.string.isRequired,
  response: React.PropTypes.string,
  tags: React.PropTypes.array.isRequired,
  source: React.PropTypes.shape({
    link: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
  }),
  documents: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.object.isRequired,
  }),
  views: React.PropTypes.number.isRequired,
  progress: React.PropTypes.shape({
    to: React.PropTypes.number.isRequired,
    from: React.PropTypes.number.isRequired,
  }),
  onReveal: React.PropTypes.func,
};

export default Answer;
