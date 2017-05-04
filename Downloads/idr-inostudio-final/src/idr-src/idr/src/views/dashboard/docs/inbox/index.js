/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';

import { connect } from 'shared/store';

// Stores
import Recalls from 'stores/dashboard/items/recalls';
import RecallSearch from 'stores/dashboard/search/recalls';

/* components */
import Search from 'views/dashboard/search';

// Images
import pileImage from 'assets/images/illustrations/pile-of-recalls.svg';
import MasterDetail from 'views/dashboard/components/layout/master-detail';
import DocItems from 'views/dashboard/items/docs/inbox/doc-items';
import CreateRecallMain from 'views/dashboard/docs/create/main';

// CSS
import css from './edit.css';

const Explore = connect((props, ctx) => {
  const recalls = ctx.store(Recalls);
  const store = ctx.store(RecallSearch);
  const current = recalls.getCurrent();

  let detailView = (
    <div className={css.placeholder}>
      <img className={css.cards} src={pileImage} alt="Pile of Recalls" />
      <h2 className={css.title}>
        {`You have - ${recalls.getTotalCount()} in your library. ${recalls.getSelectedCount()} selected.`}
      </h2>
      <h3 className={css.subtitle}>
        Tap a recall on the left to edit here, slide right to practice,
        slide left to delete.
      </h3>
    </div>
  );

  if (current) {
    detailView = (
      <div className={css.container}>
        <div className={css.content}>
          <CreateRecallMain
            recall={current}
            onCancel={() => recalls.removeCurrent()}
            onSave={async () => {
              await current.update();
              recalls.removeCurrent();
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
        [css['master-view-with-buttons']]: recalls.getSelectedCount() > 0,
      })}>
      <Search
        store={store}
        itemStore={recalls} />
      <DocItems />
    </div>
  );

  return (
    <MasterDetail
      isOpen={false}
      current={!current}
      masterView={masterView}
      detailView={detailView} />
  );
});

export default Explore;
