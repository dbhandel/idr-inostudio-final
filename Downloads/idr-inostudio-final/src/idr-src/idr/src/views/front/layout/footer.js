import facebookImage from 'assets/images/socials/facebook.svg';
import instagramImage from 'assets/images/socials/instagram.svg';
import twitterImage from 'assets/images/socials/twitter.svg';

import React from 'react';
import css from './footer.css';

const year = (new Date()).getFullYear();

export default () => (
  <footer className={css.footer}>
    <div className={css.footerRow}>
      <div className={css.footerLeftColumn}>
        <ul>
          <li>Benefits</li>
          <li>Pricing</li>
          <li>How it works</li>
          <li>FAQ</li>
          <li>Blog</li>
          <li>Resources</li>
          <li>About</li>
          <li>Terms</li>
          <li>Privacy</li>
        </ul>
      </div>
      <div className={css.footerRightColumn}>
        <ul>
          <li><a className={css.socialIcon}><img src={facebookImage} alt="Our facebook" /></a></li>
          <li><a className={css.socialIcon}><img src={instagramImage} alt="Our instagram" /></a></li>
          <li><a className={css.socialIcon}><img src={twitterImage} alt="Our twitter" /></a></li>
        </ul>
        <aside>
          <p>
            Copyright &copy; I Do Recall, Inc. {year}.
          </p>
        </aside>
      </div>
    </div>
  </footer>
);
