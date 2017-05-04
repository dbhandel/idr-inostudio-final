import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { connect } from 'shared/store';

/* stores */
import DocStore from 'stores/doc';

/* components */
import DocItems from 'views/dashboard/items/old-doc-items/doc-items';

/* init */
const doc = new DocStore();
doc.items = [
  {
    id: '1',
    text: 'Doc #1',
  },
  {
    id: '2',
    text: 'Doc #2',
  },
  {
    id: '3',
    text: 'Doc #3',
  },
  {
    id: '4',
    text: 'Doc #4',
  },
  {
    id: '5',
    text: 'Doc #5',
  },
];

const handleToggleSelected = item => {
  doc.toggleSelected(item);
  actionLogger('Doc-Item -> handleToggleSelected()')(doc.selected);
};

const handleCreateClick = val => {
  actionLogger('Doc-Item -> handleCreateClick()')(val);
};

const handleDeleteClick = val => {
  actionLogger('Doc-Item -> handleDeleteClick()')(val);
};

const handleClick = val => {
  actionLogger('Doc-Item -> handleClick()')(val);
};

const Element = connect(() => (
  <div>
    <span style={{ display: 'none' }}>{`${doc.selected.length}`}</span>
    <DocItems
      items={doc.getAll()}
      isSelected={item => doc.isSelected(item)}
      toggleSelected={handleToggleSelected}
      onClick={handleClick}
      createClick={handleCreateClick}
      deleteClick={handleDeleteClick} />
  </div>
  ));

export default (
  <Element />
);
