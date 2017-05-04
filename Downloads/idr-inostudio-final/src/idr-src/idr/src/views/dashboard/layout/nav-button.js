import React from 'react';
import cn from 'classnames';

import { connect } from 'shared/store';

import css from './nav.css';

const NavButton = (props, ctx) => {
  const { location } = ctx.router;
  const { links, children } = { ...props };
  const isActive = links.get(children) === location.pathname || false;
  return (
    <button className={cn(css.button, { [css.active]: isActive })} onClick={props.onClick}>
      {props.component}
      <h3>{props.children}</h3>
    </button>
  );
};

NavButton.propTypes = {
  children: React.PropTypes.node.isRequired,
  component: React.PropTypes.element.isRequired,
  onClick: React.PropTypes.func,
};

export default connect(NavButton);
