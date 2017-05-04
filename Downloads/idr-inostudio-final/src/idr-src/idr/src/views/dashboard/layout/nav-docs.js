import React from 'react';
import cn from 'classnames';

import MagnifyIcon from 'views/icons/magnify';
import UploadIcon from 'views/icons/upload';
import InboxIcon from 'views/icons/inbox';
import ProgressIcon from 'views/icons/progress';
import MenuIcon from 'views/icons/menu';
import StarIcon from 'views/icons/star';
import PinIcon from 'views/icons/pin';
import RocketIcon from 'views/icons/rocket';
import ProfileIcon from 'views/icons/profile';
import CloseIcon from 'views/icons/close';

import { connect } from 'shared/store';
import { dashboardDocs } from 'config/links';

import NavButton from './nav-button';

import css from './nav.css';

const Inbox = props => {
  const numDisplay = props.number > 99 ? '99+' : props.number;

  const classes = cn(css.circled, {
    [css.show]: props.number > 0,
  });

  return (
    <div className={classes}>
      <InboxIcon />
      <div>{numDisplay}</div>
    </div>
  );
};

Inbox.propTypes = {
  /* numbers */
  number: React.PropTypes.number,
};

Inbox.defaultProps = {
  number: 0,
};

const renderButtonMore = (
  <div className={cn(css.button_group, css['animation-up'])}>
    <NavButton
      component={<StarIcon />}
      links={dashboardDocs}
      onClick={() => {}}>Star</NavButton>
    <NavButton
      component={<PinIcon />}
      links={dashboardDocs}
      onClick={() => {}}>Pin</NavButton>
    <NavButton
      component={<RocketIcon />}
      links={dashboardDocs}
      onClick={() => {}}>Rocket</NavButton>
    <NavButton
      component={<ProfileIcon />}
      links={dashboardDocs}
      onClick={() => {}}>Profile</NavButton>
  </div>
);

const Container = props => (
  <nav className={css.section}>
    <NavButton
      component={<MagnifyIcon />}
      links={dashboardDocs}
      onClick={props.handleExplore}>explore</NavButton>
    <NavButton
      component={<UploadIcon />}
      links={dashboardDocs}
      onClick={props.handleUpload}>upload</NavButton>
    <NavButton
      component={<Inbox number={props.toInbox} />}
      links={dashboardDocs}
      onClick={props.handleInbox}>inbox</NavButton>
    <NavButton
      component={<ProgressIcon />}
      links={dashboardDocs}
      onClick={props.handleProgress}>progress</NavButton>
    {props.more ? renderButtonMore : null}
    <div className={css.secondary}>
      <NavButton
        component={props.more ? <CloseIcon /> : <MenuIcon />}
        links={dashboardDocs}
        onClick={props.handleMore}>{props.more ? 'close' : 'more'}</NavButton>
    </div>
  </nav>
);

Container.propTypes = {
  /* numbers */
  toInbox: React.PropTypes.number,
  /* boolean */
  more: React.PropTypes.bool,
  /* functions */
  handleExplore: React.PropTypes.func.isRequired,
  handleUpload: React.PropTypes.func.isRequired,
  handleInbox: React.PropTypes.func.isRequired,
  handleProgress: React.PropTypes.func.isRequired,
  handleMore: React.PropTypes.func.isRequired,
};

export default connect(Container);
