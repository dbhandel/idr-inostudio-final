/* eslint-disable arrow-body-style */

import React from 'react';

import { connect } from 'shared/store';

/* stores */
import Recalls from 'stores/search/recalls';

/* components */
import RecallItem from 'views/dashboard/items/recall-item';
import ButtonsContainer from 'views/dashboard/layout/buttons-container';
import NoSearchResult from '../no-search-result';

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
      { title: 'Practice Selected', handleClick: () => {} },
      { title: `Practice ${recalls.getAll().length - selectedItemsLength} Due`, handleClick: () => {} },
    ];
    const buttonsIsDelete = [
      { title: 'CANCEL', handleClick: () => {} },
      { title: 'DELETE', handleClick: () => {} },
    ];
    const showButtons = recalls.isDelete
      ? <ButtonsContainer titleType="warning" position="left" title={`Delete ${selectedItemsLength} selected Recalls?`} buttons={buttonsIsDelete} />
      : <ButtonsContainer position="left" title={`${selectedItemsLength} selected Recalls`} buttons={buttonsArray} />;
    return (
      <div className={css['recall-items']}>
        {recalls.getAll().map(recall => {
          return (
            <RecallItem
              id={recall.id}
              key={recall.id}>
              {recall.question_plain}
            </RecallItem>);
        })}
        {recalls.getAll().length === 0 &&
        <NoSearchResult />
        }
        {selectedItemsLength > 0 && showButtons }
      </div>
    );
  }
}

export default connect(RecallItems);
