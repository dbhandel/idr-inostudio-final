import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { action } from 'mobx';
import { connect } from 'shared/store';

/* stores */
import ProfileStore from 'stores/dashboard/profile';

/* components */
import Profile from 'views/dashboard/profile';

/* init */
class ProfileMock extends ProfileStore {
  submit = () => {
    actionLogger('Clicked Update Profile')(this.getFields());
  }

  delete = () => {
    actionLogger('Clicked Delete Account')(this.getFields());
  }

  update = action((field, val) => {
    this.updateField(field, val);
    actionLogger(`Updated '${field}' with ${val}`)(this.getFields());
    actionLogger('hasChanged?')(this.hasChanged);
  })
}

const store = new ProfileMock();

const Element = connect(() => (
  <Profile
    fields={store.getFields()}
    errors={store.getErrors()}
    updateField={store.update}
    submit={store.submit}
    delete={store.delete}
    hasChanged={store.hasChanged} />
));

export default (
  <Element />
);
