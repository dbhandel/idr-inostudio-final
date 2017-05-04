import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { action } from 'mobx';
import { observer } from 'mobx-react';

/* components */
import Register from 'views/front/register';

/* store */
import FormStore from 'stores/common/form';

/* init */
class RegisterMock extends FormStore {

  constructor() {
    super({
      fields: [
        'name',
        'email',
        'password',
      ],
    });
  }

  login = () => {
    actionLogger('Clicked login ->')(this);
  }

  createUser = () => {
    actionLogger('Attempted registration ->')(this.getFields());
    this.errors.set('name', 'Sample name error message');
    this.errors.set('email', 'Sample e-mail error message');
    this.errors.set('password', 'Sample password error message');
  }

  updateLoginField = action((field, val) => {
    this.updateField(field, val);
    this.errors.delete(field);
    actionLogger(`updated field '${field}' with ${val} ->`)(this.getFields());
  });

}

const mock = new RegisterMock();

const Element = observer(() => (
  <Register
    errors={mock.getErrors()}
    fields={mock.getFields()}
    updateField={mock.updateLoginField}
    login={mock.login}
    createUser={mock.createUser} />
));

export default (
  <Element />
);
