import React from 'react';
import Rocket from 'views/icons/rocket';
import Trash from 'views/icons/trash';

import css from './selected.css';

const selectComponnet = items => (
  <div>
    <div className={css.selected}>
      <Rocket width={20} />
      <span className={css.bold}>{items.selected.length} Selected</span> Recalls
    </div>
    <div className={css.due}>
      <Rocket width={20} />
      <span className={css.bold}>{items.due.length} Due</span> Recalls
    </div>
  </div>
);

const deleteComponent = (items, action) => (
  <div>
    <div className={css.selected}>
      <span className={css.bold}>Delete {items.selected.length} Selected</span> Recalls
    </div>
    <div className={css.groupButtons}>
      <button className={css.delete} onClick={() => action.deleteSelected()}>
        <Trash />DELETE
      </button>
      <button className={css.cancel} onClick={() => action.cancelDeleteSelected()}>
        CANCEL
      </button>
    </div>
  </div>
);

const Selected = props => {
  let components;
  const action = {
    deleteSelected: props.deleteSelected,
    cancelDeleteSelected: props.cancelDeleteSelected,
  };

  if (props.actionFilterType === 'SELECT') {
    components = selectComponnet(props.items);
  } else if (props.actionFilterType === 'DELETE') {
    components = deleteComponent(props.items, action);
  }

  return (
    <div className={css.panel}>
      {props.items.selected.length > 0 ? components : null}
    </div>
  );
};

Selected.propTypes = {
  items: React.PropTypes.object,
  actionFilterType: React.PropTypes.string,
  deleteSelected: React.PropTypes.func,
  cancelDeleteSelected: React.PropTypes.func,
};

export default Selected;
