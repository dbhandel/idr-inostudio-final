/* eslint-disable arrow-body-style */

import React from 'react';

import { connect } from 'shared/store';

/* stores */
import RecallStore from 'stores/dashboard/recall';
import Recalls from 'stores/dashboard/items/recalls';

/* components */
import RecallItem from 'views/dashboard/items/docs/inbox/doc-item';
import ButtonsContainer from 'views/dashboard/layout/buttons-container';

/* styles */
import css from './index.css';

class RecallItems extends React.Component {

  constructor() {
    super();
    this.state = {
      leftActionActive: null,
      rightActionActive: null,
    };
  }

  setLeftAction = val => {
    this.setState({ leftActionActive: val });
  }

  setRightAction = val => {
    this.setState({ rightActionActive: val });
  }

  render() {
    const recalls = this.context.store(Recalls);
    const selectedItemsLength = recalls.selected.length;
    const buttonsArray = [
      { title: 'Practice Selected', handleClick: this.props.runSelected },
      { title: `Practice ${recalls.getAll().length - selectedItemsLength} Due`, handleClick: this.props.runDue },
    ];
    const buttonsIsDelete = [
      { title: 'CANCEL', handleClick: this.props.cancelDelete },
      { title: 'DELETE', handleClick: this.props.deleteAll },
    ];
    const showButtons = recalls.isDelete
      ? <ButtonsContainer titleType="warning" position="left" title={`Delete ${selectedItemsLength} selected Recalls?`} buttons={buttonsIsDelete} />
      : <ButtonsContainer position="left" title={`${selectedItemsLength} selected Recalls`} buttons={buttonsArray} />;
    return (
      <div className={css['recall-items']}>
        {recalls.getAll().map((data, i) => {
          const recall = new RecallStore(recalls.context);
          recall.mergeData(data);
          return (
            <RecallItem
              id={recall.id}
              key={i}>
              {recall.questionPlain}
            </RecallItem>);
        })}
        {selectedItemsLength > 0 && showButtons }
      </div>
    );
  }
}
RecallItems.propTypes = {
  runSelected: React.PropTypes.func,
  runDue: React.PropTypes.func,
  cancelDelete: React.PropTypes.func,
  deleteAll: React.PropTypes.func,
};

RecallItems.defaultProps = {
  runSelected: () => {},
  runDue: () => {},
};

export default connect(RecallItems);
