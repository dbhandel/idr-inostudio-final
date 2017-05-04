import React from 'react';

import { connect } from 'shared/store';
import { dashboard } from 'config/links';

/* components */
import Nav from 'views/dashboard/layout/nav';

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
    this.context.router.push(dashboard.get(url));
  }

  render() {
    return (
      <Nav
        toPractice={0}
        handleExplore={this.link('explore')}
        handleCreate={this.link('create')}
        handlePractice={noop('clicked Practice')}
        handleProgress={noop('clicked Progress')}
        handleMore={this.handleMore}
        more={this.state.more} />
    );
  }
}

export default NavHandler;
