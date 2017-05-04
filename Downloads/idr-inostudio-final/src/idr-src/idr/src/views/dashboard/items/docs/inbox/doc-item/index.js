/* eslint-disable jsx-a11y/no-static-element-interactions, no-alert, react/no-string-refs */

import React from 'react';

import { connect } from 'shared/store';

// stores
import RecallItems from 'stores/dashboard/items/recalls';

// components
import LeafIcon from 'views/icons/leaf';
import TrashIcon from 'views/icons/trash';
import FilePlusIcon from 'views/icons/filePlus';
import ModalDocDeleting from 'views/common/modal/doc-deleting';

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
  const recalls = ctx.store(RecallItems);

  return (
    <div>
      <ModalDocDeleting
        isOpen={recalls.isModalDeleting}
        confirm={() => recalls.delete(id)}
        cancel={() => recalls.toggleModalDeleting()} />
      <Swipeout
        id={id}
        selected={recalls.isSelected(id)}
        actionFilterType={props.actionFilterType}
        className={css['doc-item']}
        leftActionActive={props.leftActionActive}
        rightActionActive={props.rightActionActive}
        setLeftAction={props.setLeftAction}
        setRightAction={props.setRightAction}>
        <SwipeoutAction position="left" onClick={() => recalls.setCurrent(id)}>
          <h3 className={css['swipeout-text']}>MARK AS PROCESSED</h3>
          <FilePlusIcon style={{ width: '1.9rem', height: '1.9rem', marginTop: '-5px' }} />
        </SwipeoutAction>
        <SwipeoutContent
          css={css}
          onPress={() => recalls.toggleSelected(id)}
          onClick={() => recalls.setCurrent(id)}
          position="center">
          <LeafIcon id="icon" />
          <img className={css.picture} src={RecallImage} alt="Recall" />
          <p>{props.children}</p>
        </SwipeoutContent>
        <SwipeoutAction position="right" onClick={() => recalls.toggleModalDeleting()}>
          <TrashIcon />
          <h3>Delete this recall</h3>
        </SwipeoutAction>
        <SwipeoutHover>
          <div className={css.icon} onClick={() => recalls.practice(id)}>
            <FilePlusIcon className={css.file} />
          </div>
          <div className={css.icon} onClick={() => recalls.toggleModalDeleting()}>
            <TrashIcon className={css.trash} />
          </div>
        </SwipeoutHover>
      </Swipeout>
    </div>
  );
});

RecallItem.propTypes = {
  children: React.PropTypes.node,
  id: React.PropTypes.string.isRequired,
};

export default RecallItem;
