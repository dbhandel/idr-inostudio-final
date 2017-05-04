import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { connect } from 'shared/store';

/* stores */
import RecallStore from 'stories/stores/recall';

/* components */
import RecallItems from 'views/dashboard/items/recall-items';

/* init */
const recall = new RecallStore();

recall.items = [
  {
    id: '1',
    text: 'Recall #1',
  },
  {
    id: '2',
    text: 'Recall #2',
  },
  {
    id: '3',
    text: 'Recall #3',
  },
  {
    id: '4',
    text: 'Recall #4',
  },
  {
    id: '5',
    text: 'Recall #5',
  },
];

const handleToggleSelected = item => {
  recall.toggleSelected(item);
  actionLogger('Recall-Item -> handleToggleSelected()')(recall.selected);
};

const handlePracticeClick = val => {
  actionLogger('Recall-Item -> handlePracticeClick()')(val);
};

const handleDeleteClick = val => {
  actionLogger('Recall-Item -> handleDeleteClick()')(val);
};

const handleClick = val => {
  actionLogger('Recall-Item -> handleClick()')(val);
};

const handleRunSelected = () => {
  actionLogger('Recall-Item -> handleRunSelected()')();
};

const handleRunDue = () => {
  actionLogger('Recall-Item -> handleRunDue()')();
};

const Element = connect(() => (
  <div>
    <span style={{ display: 'none' }}>{`${recall.selected.length}`}</span>
    <RecallItems
      items={recall.getAll()}
      isSelected={item => recall.isSelected(item)}
      onClick={handleClick}
      toggleSelected={handleToggleSelected}
      practiceClick={handlePracticeClick}
      deleteClick={handleDeleteClick}
      runSelected={handleRunSelected}
      runDue={handleRunDue} />
  </div>
));

export default (
  <Element />
);
