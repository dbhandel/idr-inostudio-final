import React from 'react';

// styles
import css from './welcome-page.css';

const WelcomePage = props => (
  <div>
    <div className={css.title}>Thanks - Almost there...</div>
    <div className={css.content}>
      <p>Your new account is set-up and ready to go.</p>
      <p>Just one (quick) last step.
      We’ve zapped a special link to <span className={css.email}>{props.email}</span>.
      Clicking it confirms that we’ve got the right e-mail for you, and will shuttle
      you over to your personal iDoRecall dashboard instantly.</p>
      <p>Go ahead and check for it now
      <span className={css.subjectLine}> &quot;Welcome To iDoRecall&quot;</span>,
      and we’ll see you inside!</p>
    </div>
  </div>
);

WelcomePage.propTypes = {
  email: React.PropTypes.string,
};

export default WelcomePage;
