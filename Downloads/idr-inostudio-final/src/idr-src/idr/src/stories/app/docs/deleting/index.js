/* eslint-disable no-alert, no-undef, react/jsx-no-bind */

import React from 'react';

import ModalDocDeleting from 'views/common/modal/doc-deleting';

class ModalDocDeletingContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      isModalDeleting: false,
    };
    this.showModal = this.showModal.bind(this);
    this.confirmModal = this.confirmModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
  }

  showModal() {
    this.setState({ isModalDeleting: true });
  }

  confirmModal() {
    this.setState({ isModalDeleting: false });
  }

  cancelModal() {
    this.setState({ isModalDeleting: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.showModal}>SHOW MODAL</button>
        <ModalDocDeleting
          isOpen={this.state.isModalDeleting}
          params={{
            userName: 'Alex',
            docName: 'test doc #1',
            recallsNumber: 9,
          }}
          confirm={this.confirmModal}
          cancel={this.cancelModal} />
      </div>
    );
  }
}

export default <ModalDocDeletingContainer />;
