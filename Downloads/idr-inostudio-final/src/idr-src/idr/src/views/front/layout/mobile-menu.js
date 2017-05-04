/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cn from 'classnames';

/* assets */
import idrLogo from 'assets/images/logo/idr-black.svg';
import XIcon from 'views/icons/x';

/* components */
import Link from 'views/common/link';

/* css */
import css from './mobile-menu.css';

const Divider = props => {
  const noHover = ['close', 'logo', 'end'];
  const noBorder = ['close', 'end'];
  const noPadding = ['close'];
  const endMargin = ['end'];
  const alignRight = ['close'];
  const classes = cn({
    [css.divider]: true,
    [css.noHover]: noHover.includes(props.type),
    [css.noBorder]: noBorder.includes(props.type),
    [css.noPadding]: noPadding.includes(props.type),
    [css.endMargin]: endMargin.includes(props.type),
    [css.alignRight]: alignRight.includes(props.type),
  });

  return (
    <div className={classes} onClick={props.onClick}>
      <div />
      <div />
      <div>
        {props.children}
      </div>
    </div>
  );
};

Divider.propTypes = {
  children: React.PropTypes.node,
  type: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

function getLink(link) {
  return (
    <Divider key={link.url} type="nav" onClick={link.onClick}>
      <Link>{link.text}</Link>
    </Divider>
  );
}

const MobileMenu = props => {
  const classes = cn(css.section, {
    [css.hide]: !props.active,
  });

  return (
    <section className={classes}>
      <Divider type="close">
        <div className={css.xIcon}>
          <XIcon onClick={props.close} />
        </div>
      </Divider>
      <Divider type="logo">
        <img src={idrLogo} alt="IDR" className={css.idrLogo} />
      </Divider>
      {props.links.map(link => getLink(link))}
      <Divider type="end" />
    </section>
  );
};

MobileMenu.propTypes = {
  /* bools */
  active: React.PropTypes.bool,

  /* objects */
  links: React.PropTypes.arrayOf(React.PropTypes.shape({
    /* eslint-disable */
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    url: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    /* eslint-enable */
  })),

  /* functions */
  close: React.PropTypes.func.isRequired,
};

MobileMenu.defaultProps = {
  active: false,
};

export default MobileMenu;
