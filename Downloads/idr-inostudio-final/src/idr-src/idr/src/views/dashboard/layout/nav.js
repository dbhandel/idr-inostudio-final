import React from 'react';
import cn from 'classnames';

import MagnifyIcon from 'views/icons/magnify';
import CreateIcon from 'views/icons/create';
import RocketIcon from 'views/icons/rocket';
import ProgressIcon from 'views/icons/progress';
import MenuIcon from 'views/icons/menu';
import StarIcon from 'views/icons/star';
import PinIcon from 'views/icons/pin';
import ProfileIcon from 'views/icons/profile';
import CloseIcon from 'views/icons/close';

import { dashboard } from 'config/links';
import { connect } from 'shared/store';

import NavButton from './nav-button';

/* styles for view */
import layout from './container.css';
import css from './nav.css';

const PracticeRocket = props => {
  const numDisplay = props.number > 999 ? '999+' : props.number;

  const classes = cn(css.circled, {
    [css.show]: props.number > 0,
    [css.circle]: props.number < 9,
  });

  return (
    <div className={classes}>
      <RocketIcon />
      <div>{numDisplay}</div>
    </div>
  );
};

PracticeRocket.propTypes = {
  /* numbers */
  number: React.PropTypes.number,
};

PracticeRocket.defaultProps = {
  number: 0,
};

const renderButtonMore = (
  <div className={cn(css.button_group, css['animation-up'])}>
    <NavButton
      component={<StarIcon />}
      links={dashboard}
      onClick={() => {
      }}>Star</NavButton>
    <NavButton
      component={<PinIcon />}
      links={dashboard}
      onClick={() => {
      }}>Pin</NavButton>
    <NavButton
      component={<ProfileIcon />}
      links={dashboard}
      onClick={() => {
      }}>Profile</NavButton>
    <NavButton
      component={<RocketIcon />}
      links={dashboard}
      onClick={() => {
      }}>Rocket</NavButton>
  </div>
);

const Container = props => (
  <nav className={cn(css.section, layout['nav-container'])}>
    <NavButton
      component={<MagnifyIcon />}
      links={dashboard}
      onClick={props.handleExplore}>explore</NavButton>
    <NavButton
      component={<CreateIcon />}
      links={dashboard}
      onClick={props.handleCreate}>create</NavButton>
    <NavButton
      component={<PracticeRocket number={props.toPractice} />}
      links={dashboard}
      onClick={props.handlePractice}>Practice</NavButton>
    <NavButton
      component={<ProgressIcon />}
      links={dashboard}
      onClick={props.handleProgress}>Progress</NavButton>
    {props.more ? renderButtonMore : null}
    <div className={css.secondary}>
      <NavButton
        component={props.more ? <CloseIcon /> : <MenuIcon />}
        links={dashboard}
        onClick={props.handleMore}>{props.more ? 'Close' : 'More'}</NavButton>
    </div>
  </nav>
);

Container.propTypes = {
  /* numbers */
  toPractice: React.PropTypes.number,
  /* boolean */
  more: React.PropTypes.bool,

  /* functions */
  handleExplore: React.PropTypes.func.isRequired,
  handleCreate: React.PropTypes.func.isRequired,
  handlePractice: React.PropTypes.func.isRequired,
  handleProgress: React.PropTypes.func.isRequired,
  handleMore: React.PropTypes.func.isRequired,
};

export default connect(Container);
