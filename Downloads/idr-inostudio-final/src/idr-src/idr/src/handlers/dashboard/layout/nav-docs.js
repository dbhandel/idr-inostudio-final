import React from 'react';

import { connect } from 'shared/store';
import { dashboardDocs } from 'config/links';

/* components */
import Nav from 'views/dashboard/layout/nav-docs';

/* init */
function noop(msg) {
  return () => {
    // eslint-disable-next-line
    console.log(`clicked ${msg}`);
  };
}

@connect class NavHandler extends React.Component {
  constructor() {
    super();
    this.state = {
      more: false,
    };
  }
  handleMore = () => this.setState({ more: !this.state.more });
  link = url => () => {
    this.context.router.push(dashboardDocs.get(url));
  }
  render() {
    return (
      <Nav
        toInbox={0}
        handleExplore={this.link('explore')}
        handleUpload={this.link('upload')}
        handleInbox={this.link('inbox')}
        handleProgress={noop('clicked Progress')}
        handleMore={this.handleMore}
        more={this.state.more} />
    );
  }
}

export default NavHandler;
