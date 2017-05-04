import React from 'react';

import { frontAnonymous, frontLoggedIn } from 'config/links';
import { connect } from 'shared/store';

/* stores */
import MenuStore from 'stores/front/menu';
import UserStore from 'stores/user';

/* components */
import TopMenu from 'views/front/layout/top-menu';

@connect class RenderedTopMenu extends React.Component {
  getLinks = () => {
    if (!this.context.store(UserStore).isLoggedIn()) {
      return Array.from(frontAnonymous).map(this.eachLink);
    }
    // Logged in user
    return Array.from(frontLoggedIn).map(this.eachLink);
  }

  eachLink = link => ({
    text: link.text,
    url: link.url,
    type: link.type,
    onClick: () => {
      if (link.type === 'logout') {
        this.context.store(UserStore).logout();
      } else {
        this.context.router.push(link.url);
      }
    },
  })

  render() {
    const menu = this.context.store(MenuStore);

    return (
      <TopMenu
        links={this.getLinks()}
        menuClick={() => menu.on()} />
    );
  }
}

export default RenderedTopMenu;
