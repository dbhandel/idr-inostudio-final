/* eslint-disable jsx-a11y/no-static-element-interactions, no-alert, react/no-string-refs */

import React from 'react';

import { connect } from 'shared/store';

// stores
import Recalls from 'stores/search/recalls';

// components
import LeafIcon from 'views/icons/leaf';
import TrashIcon from 'views/icons/trash';
import RocketIcon from 'views/icons/rocket';
import RecallImage from 'assets/images/illustrations/img.jpg';
import {
  Swipeout,
  SwipeoutAction,
  SwipeoutContent,
  SwipeoutHover } from 'views/dashboard/components/swipeout';

// styles
import css from './index.css';

const RecallItem = connect((props, ctx) => {
  const { id } = props;
  const recalls = ctx.store(Recalls);

  return (
    <Swipeout
      id={id}
      selected={recalls.isSelected(id)}
      actionFilterType={props.actionFilterType}
      className={css['recall-item']}
      leftActionActive={props.leftActionActive}
      rightActionActive={props.rightActionActive}
      setLeftAction={props.setLeftAction}
      setRightAction={props.setRightAction}>
      <SwipeoutAction position="left" onClick={() => recalls.practice(id)}>
        <h3>Practice this recall</h3>
        <RocketIcon />
      </SwipeoutAction>
      <SwipeoutContent
        css={css}
        onPress={() => recalls.toggleSelected(id)}
        onClick={() => {
          if (!recalls.hasCursor()) {
            recalls.setCursor(id);
          }
        }}
        position="center">
        <LeafIcon id="icon" />
        <img className={css.picture} src={RecallImage} alt="Recall" />
        <p>{props.children}</p>
      </SwipeoutContent>
      <SwipeoutAction position="right" onClick={() => recalls.deleteWithConfirm(id)}>
        <TrashIcon />
        <h3>Delete this recall</h3>
      </SwipeoutAction>
      <SwipeoutHover>
        <div className={css.icon} onClick={() => recalls.practice(id)}>
          <RocketIcon className={css.rocket} />
        </div>
        <div className={css.icon} onClick={() => recalls.deleteWithConfirm(id)}>
          <TrashIcon className={css.trash} />
        </div>
      </SwipeoutHover>
    </Swipeout>
  );
});

RecallItem.propTypes = {
  children: React.PropTypes.node,
  id: React.PropTypes.string.isRequired,
};

export default RecallItem;
