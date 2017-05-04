import React from 'react';

import { connect } from 'shared/store';

/* components */
import Profile from 'views/dashboard/profile';

/* handlers */
import Nav from 'handlers/dashboard/layout/nav';
import Container from 'handlers/dashboard/layout/containers/plain';

/* stores */
import ProfileStore from 'stores/dashboard/profile';

@connect class ProfileHandler extends React.Component {
  constructor(props, context) {
    super(props);
    context.store(ProfileStore).fetchInitial();
  }

  handleUpdateProfile = () => {
    this.context.store(ProfileStore).updateProfile();
  };

  render() {
    const store = this.context.store(ProfileStore);

    return (
      <Container
        nav={<Nav />} >
        <Profile
          fields={store.getFields()}
          errors={store.getErrors()}
          updateField={store.updateField}
          submit={this.handleUpdateProfile}
          delete={() => true}
          hasChanged={store.hasChanged} />
      </Container>
    );
  }

}

export default ProfileHandler;
