/* global SERVER */
import React from 'react';
import cn from 'classnames';

import env from 'shared/env';
import bottomPanel from 'shared/bottomPanel';
import css from './container.css';

class Container extends React.Component {

  constructor() {
    super();
    this.windowHeight = !SERVER ? window.innerHeight : 0;
    this.resizeWindow = this.resizeWindow.bind(this);
  }

  componentDidMount() {
    if (env.isAnyMobile) {
      window.addEventListener('resize', this.resizeWindow);
    }
  }

  componentWillUnmount() {
    if (env.isAnyMobile) {
      window.removeEventListener('resize', this.resizeWindow);
    }
  }

  resizeWindow() {
    // decide to hide bottom panel if window height was decreased
    // due to open keybord on android phones
    if (window.innerHeight < this.windowHeight) {
      bottomPanel.hide();
    } else {
      bottomPanel.show();
    }
  }

  render() {
    const containerClass = cn(
      css.container,
      this.props.containerClass,
    );
    const contentClass = cn(
      css.content,
      this.props.contentClass,
      { [css['content-with-buttons']]: this.props.buttons },
    );

    return (
      <div className={containerClass}>
        {this.props.header}
        {this.props.nav}
        <div className={contentClass}>
          {this.props.searchBar}
          {this.props.children}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  /* elements */
  header: React.PropTypes.element,
  searchBar: React.PropTypes.element,
  nav: React.PropTypes.element,
  buttons: React.PropTypes.bool,

  /* children */
  /* should be element or array of elements*/
  children: React.PropTypes.element.isRequired,

  /* overriden classes */
  containerClass: React.PropTypes.string,
  contentClass: React.PropTypes.string,
};

export default Container;
