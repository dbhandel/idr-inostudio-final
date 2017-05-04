/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import cn from 'classnames';
import Gravatar from 'react-gravatar';

import { connect } from 'shared/store';

/* components */
import ProfileImage from 'assets/images/icons/gravatar-blank.png';
import DocsIcon from 'views/icons/docs';
import LeafIcon from 'views/icons/leaf';
import SortDown from 'views/icons/sort-down';

/* styles */
import css from './header.css';

function getProfileIcon(hashedEmail) {
  // Do we have a hash?  If so, get the gravatar!
  if (hashedEmail) {
    return (
      <Gravatar md5={hashedEmail} size={30} default="mm" />
    );
  }

  // No hash - so let's throw back the 'anonymous' icon
  return (
    <img src={ProfileImage} alt="No profile" />
  );
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }

  hideDropdown = event => {
    // Auto-hide when dropdown is open and user clicks outside the dropdown area
    if (this.state.isVisible && event.target !== this.dropdownRef) {
      this.hide();
    }
  }

  toggle = event => {
    const isVisible = this.state.isVisible;

    if (isVisible) {
      this.hide();
    } else {
      this.show();
    }

    // Prevent event bubbling to top-level "document" event listener
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  show = () => {
    this.setState({ isVisible: true });

    // Attach event listener to auto-hide dropdown when clicked outside
    document.addEventListener('click', this.hideDropdown, false);
  }

  hide = () => {
    this.setState({ isVisible: false });

    // Clean up event listener
    document.removeEventListener('click', this.hideDropdown, false);
  }

  registerDropdown = ref => {
    this.dropdownRef = ref;
  }

  render() {
    const { isVisible } = this.state;

    return (
      <div
        ref={this.registerDropdown}
        className={cn([css.dropdown], { [css.dropdownOpen]: isVisible })}>
        <div className={css.dropdownToggle} onClick={this.toggle}>
          {this.props.component}
        </div>
        <div className={css.dropdownMenu}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: React.PropTypes.node,
  component: React.PropTypes.element,
};

const Header = (props, ctx) => {
  const { location } = ctx.router;
  const searchingDocs = location.pathname.search(/docs/);
  let searchingRecalls = location.pathname.search(/recalls/);
  if (searchingDocs === searchingRecalls) searchingRecalls = 1;

  const accountDropdown = (
    <nav>
      <ul className={css.accountList}>
        <li>
          <h3 className={css.accountTitle}>{props.firstName ? `${props.firstName}'s` : 'Your'} Account</h3>
          {getProfileIcon(props.hashedEmail)}
          <SortDown />
        </li>
      </ul>
    </nav>
  );

  return (
    <header className={css.section}>
      <div className={css.logo} />
      <nav>
        <ul>
          <li
            onClick={props.handleRecalls}
            className={searchingRecalls > 0 ? css.active : ''}>
            <LeafIcon />
            <h3>Recalls</h3>
          </li>
          <li
            onClick={props.handleDocs}
            className={searchingDocs > 0 ? css.active : ''}>
            <DocsIcon />
            <h3>Docs</h3>
          </li>
        </ul>
      </nav>
      <aside>
        <Dropdown component={accountDropdown}>
          <div onClick={props.handleProfile}>Profile</div>
          <div onClick={props.handleSettings}>Settings</div>
          <div onClick={props.handleLogout}>Sign out</div>
        </Dropdown>
      </aside>
    </header>
  );
};

Header.propTypes = {
  /* strings */
  firstName: React.PropTypes.string,
  hashedEmail: React.PropTypes.string,
  /* functions */
  handleDocs: React.PropTypes.func.isRequired,
  handleRecalls: React.PropTypes.func.isRequired,
  handleProfile: React.PropTypes.func.isRequired,
  handleSettings: React.PropTypes.func.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
};

export default connect(Header);
