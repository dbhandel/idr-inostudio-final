/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import logo from 'assets/images/logo/idorecall-darkbg.svg';
import MenuIcon from 'views/icons/menu';

/* components */
import Link from 'views/common/link';

/* css */
import css from './top-menu.css';

function getLink(link) {
  const props = {
    key: link.url,
  };

  // Do we have a type?
  if (link.type) {
    // eslint-disable-next-line
    props['data-type'] = link.type;
  }

  return (
    <li {...props}>
      <Link
        onClick={link.onClick}>{link.text}</Link>
    </li>
  );
}

const TopMenu = props => (
  <header className={css.header}>
    <img src={logo} alt="iDoRecall" />
    <ul className={css.nav}>
      {props.links.map(link => getLink(link))}
    </ul>
    <div className={css.menu}>
      <MenuIcon onClick={props.menuClick} />
    </div>
  </header>
);

TopMenu.propTypes = {
  /* arrays */
  links: React.PropTypes.arrayOf(React.PropTypes.shape({
    /* eslint-disable */
    onClick: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    /* eslint-enable */
  })),

  /* functions */
  menuClick: React.PropTypes.func.isRequired,
};

export default TopMenu;
