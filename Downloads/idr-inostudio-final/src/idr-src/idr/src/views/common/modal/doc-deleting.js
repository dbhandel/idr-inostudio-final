// React libraries
import React from 'react';
import Modal from 'react-modal';

import css from './doc-deleting.css';

class ModalDocDeleting extends React.Component {

  afterOpenFn = () => {
  }

  requestCloseFn = () => {
  }

  render() {
    const showAdditional = !!this.props.params.recallsNumber;
    const recallsText = this.props.params.recallsNumber > 1 ?
      `${this.props.params.recallsNumber} recalls linked` :
      '1 recall linked';
    const docName = `"${this.props.params.docName}"`;
    const mainText =
      `${this.props.params.userName ? `${this.props.params.userName}, you` : 'You'}
      are about to delete the doc`;
    return (
      <div className={css['modal-wrapper']}>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenFn}
          onRequestClose={this.requestCloseFn}
          className={css['modal-content']}
          overlayClassName={css['modal-overlay']}
          contentLabel={this.props.contentLabel || 'doc-deleting'}>
          <div className={css.container}>
            <div className={css.content}>
              <div className={css['main-text']}>
                {mainText}
                <span className={css['doc-name']}> {this.props.params.docName ? docName : ''}</span>
              </div>
              {showAdditional &&
                (<div className={css['additional-text']}>
                  Attention:<span className={css.recalls}> {recallsText} </span>
                  to this document will remain in your library but will lose the
                  link to this document as a source
                </div>)
              }
            </div>
            <div className={css.buttons}>
              <button onClick={this.props.cancel} className={css.cancel}>cancel</button>
              <button onClick={this.props.confirm} className={css.confirm}>delete</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ModalDocDeleting.propTypes = {
  contentLabel: React.PropTypes.string,
  isOpen: React.PropTypes.bool,

  confirm: React.PropTypes.func,
  cancel: React.PropTypes.func,

  params: React.PropTypes.shape({
    userName: React.PropTypes.string,
    docName: React.PropTypes.string,
    recallsNumber: React.PropTypes.number,
  }),
};

ModalDocDeleting.defaultProps = {
  params: {
    userName: '',
    docName: '',
    recallsNumber: null,
  },
};

export default ModalDocDeleting;
