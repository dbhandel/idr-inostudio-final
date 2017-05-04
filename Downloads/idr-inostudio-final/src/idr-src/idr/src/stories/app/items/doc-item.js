import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { observer } from 'mobx-react';

/* stores */
import DocStore from 'stores/doc';

/* components */
import DocItem from 'views/dashboard/items/old-doc-items/doc-item';

/* init */
const id = 'doc_swipeot_1';
const doc = new DocStore();

const handleCreateClick = () => {
  actionLogger('Doc-item -> handleCreateClick()')();
/*  alert('We would create recall at this point!');*/
};

const handleDeleteClick = () => {
  actionLogger('Doc-item -> handleDeleteClick()')();
/*  alert('Really delete?');*/
};

const toggleSelected = selectedId => {
  const tg = doc.toggleSelected(selectedId);
  actionLogger('Doc-item -> toggleSelected()')(tg);
};

const handleClick = () => {
  actionLogger('Doc-item -> handleClick()')();
  /*  alert('Really delete?');*/
};

const Element = observer(() => (
  <DocItem
    id={id}
    key={id}
    /* swipeout */
    selected={doc.isSelected(id)}
    /* swipeout action */
    isLeftActionActivated={() => doc.isLeftActionActivated(id)}
    isRightActionActivated={() => doc.isRightActionActivated(id)}
    deactivateLeftAction={() => doc.deactivateLeftAction(id)}
    deactivateRightAction={() => doc.deactivateRightAction(id)}
    activateLeftAction={() => doc.activateLeftAction(id)}
    activateRightAction={() => doc.activateRightAction(id)}
    /* on click */
    createClick={handleCreateClick}
    deleteClick={handleDeleteClick}
    toggleSelected={() => toggleSelected(id)}
    click={() => handleClick(id)}
    /* swipeout content */
    hasActivatedActions={() => doc.hasActivatedActions()}
    deactivateAllActions={() => doc.deactivateAllActions()}
    isActive={() => doc.isActive(id)}>
    {'Test doc item'}
  </DocItem>
));

export default (
  <Element />
);
