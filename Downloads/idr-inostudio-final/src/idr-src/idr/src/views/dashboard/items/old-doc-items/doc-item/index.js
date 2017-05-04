/* eslint-disable jsx-a11y/no-static-element-interactions, no-alert, react/no-string-refs */

import React from 'react';

// components
import DocsIcon from 'views/icons/docs';
import TrashIcon from 'views/icons/trash';
import CreateIcon from 'views/icons/create';
import {
  Swipeout,
  SwipeoutAction,
  SwipeoutContent,
  SwipeoutHover,
} from 'views/dashboard/components/swipeout';

// styles
import css from './index.css';

const DocItem = props => (
  <Swipeout
    id={props.id}
    selected={props.isSelected}
    className={css['doc-item']}
    leftActionActive={props.leftActionActive}
    rightActionActive={props.rightActionActive}
    setLeftAction={props.setLeftAction}
    setRightAction={props.setRightAction}>
    <SwipeoutAction position="left" onClick={props.createClick}>
      <h3>Create recall</h3>
      <CreateIcon />
    </SwipeoutAction>
    <SwipeoutContent css={css} onPress={props.toggleSelected} onClick={props.onClick} position="center">
      <DocsIcon onClick={e => { e.stopPropagation(); props.toggleSelected(); }} />
      <p>{props.children}</p>
    </SwipeoutContent>
    <SwipeoutAction position="right" onClick={props.deleteClick}>
      <TrashIcon />
      <h3>Delete this doc</h3>
    </SwipeoutAction>
    <SwipeoutHover>
      <div className={css.icon} onClick={props.createClick}>
        <DocsIcon className={css.doc} />
      </div>
      <div className={css.icon} onClick={props.deleteClick}>
        <TrashIcon className={css.trash} />
      </div>
    </SwipeoutHover>
  </Swipeout>
);

DocItem.propTypes = {
  children: React.PropTypes.node,
  id: React.PropTypes.string,
  isSelected: React.PropTypes.object,

  /* functions */
  onClick: React.PropTypes.func.isRequired,
  createClick: React.PropTypes.func.isRequired,
  deleteClick: React.PropTypes.func.isRequired,
  toggleSelected: React.PropTypes.func.isRequired,

  /* swipeout action */
  leftActionActive: React.PropTypes.string,
  rightActionActive: React.PropTypes.string,
  setLeftAction: React.PropTypes.func,
  setRightAction: React.PropTypes.func,
};

export default DocItem;
