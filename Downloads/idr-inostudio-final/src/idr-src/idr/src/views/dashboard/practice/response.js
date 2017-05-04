/* eslint-disable no-alert */

import React from 'react';
import cn from 'classnames';

// styles
import styling from 'views/dashboard/recalls/create/main.css';
import stylingInner from './response.css';

const Response = props => (
  <div className={cn(styling['create-recall'], stylingInner['create-recall-short'])}>
    <div className={styling.row}>
      <div className={styling.icon}>Q</div>
      <div className={stylingInner.question}>{props.question}</div>
    </div>
    <div className={styling.row}>
      <div className={styling.icon}>R</div>
      <textarea
        rows="4"
        placeholder="Type your response here"
        value={props.response}
        onChange={event => { props.changeResponse(event.target.value); }} />
    </div>
  </div>
);

Response.propTypes = {
  /* strings */
  question: React.PropTypes.string.isRequired,
  response: React.PropTypes.string,

  /* functions */
  changeResponse: React.PropTypes.func.isRequired,
};

export default Response;
