/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';

import { connect } from 'shared/store';

// Stores
import Recalls from 'stores/search/recalls';

/* components */
import Search from 'views/dashboard/search';

// Images
import pileImage from 'assets/images/illustrations/pile-of-recalls.svg';
import MasterDetail from 'views/dashboard/components/layout/master-detail';
import RecallItems from 'views/dashboard/items/recall-items';
import CreateRecallMain from 'views/dashboard/recalls/create/main';

// CSS
import css from './edit.css';

const Explore = connect((props, ctx) => {
  const recalls = ctx.store(Recalls);

  let detailView = (
    <div className={css.placeholder}>
      <img className={css.cards} src={pileImage} alt="Pile of Recalls" />
      <h2 className={css.title}>
        {`Found - ${recalls.results} matching recalls. ${recalls.selectedCount} selected.`}
      </h2>
      <h3 className={css.subtitle}>
        Tap a recall on the left to edit here, slide right to practice,
        slide left to delete.
      </h3>
    </div>
  );

  if (recalls.hasCursor()) {
    const recall = recalls.cursorToRecall();

    detailView = (
      <div className={css.container}>
        <div className={css.content}>
          <CreateRecallMain
            recall={recall}
            onCancel={() => recalls.resetCursor()}
            onSave={async () => {
              await recall.update();
              recalls.resetCursor();
            }}
            buttonPosition="right"
            isEdit />
        </div>
      </div>
    );
  }
  const masterView = (
    <div
      className={cn(css['master-view'], {
        [css['master-view-with-buttons']]: recalls.selectedCount > 0,
      })}>
      <Search
        store={recalls} />
      <RecallItems />
    </div>
  );

  return (
    <MasterDetail
      masterView={masterView}
      detailView={detailView} />
  );
});

export default Explore;
