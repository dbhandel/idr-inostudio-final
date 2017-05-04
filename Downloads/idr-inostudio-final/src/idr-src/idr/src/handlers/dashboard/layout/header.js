import React from 'react';

import { connect } from 'shared/store';
import { links, dashboard } from 'config/links';

/* stores */
import UserStore from 'stores/user';

/* components */
import Header from 'views/dashboard/layout/header';

/* init */
function noop(msg) {
  return () => {
    // eslint-disable-next-line
    console.log(`clicked ${msg}`);
  };
}

@connect class HeaderHandler extends React.Component {
  // TODO fix syntax after https://github.com/gaearon/react-hot-loader/issues/391
  handleLogout = () => (async () => {
    await this.context.store(UserStore).logout();
    this.context.router.push(links.get('login'));
  })()

  handleProfile = () => (async () => {
    this.context.router.push(dashboard.get('profile'));
  })()

  selectedMode = mode => {
    this.context.router.push(dashboard.get(mode));
    this.context.store(UserStore).setRouterMode(mode);
  }

  render() {
    const user = this.context.store(UserStore);

    return (
      <Header
        firstName={user.firstName}
        hashedEmail={user.getHashedEmail()}
        handleRecalls={() => this.selectedMode('recalls')}
        handleDocs={() => this.selectedMode('docs')}
        mode={user.getRouterMode()}
        handleProfile={this.handleProfile}
        handleSettings={noop('clicked Settings')}
        handleLogout={this.handleLogout} />
    );
  }
}

export default HeaderHandler;
