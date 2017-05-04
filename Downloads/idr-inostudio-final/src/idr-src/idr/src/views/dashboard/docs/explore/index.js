/* eslint-disable react/prop-types */
import React from 'react';

import { connect } from 'shared/store';

// Stores
import Doc from 'stores/doc';

/* components */
import PdfViewer from 'views/dashboard/docs/viewer';

// Images
import MasterDetail from 'views/dashboard/components/layout/master-detail';

// CSS
import css from './edit.css';

const Explore = connect((props, ctx) => {
  const docs = ctx.store(Doc);

  const currentDoc = docs.getCursor();
  const detailView = (
    <div className={css.container}>
      <div className={css.content}>
        <PdfViewer doc={currentDoc} />
      </div>
    </div>
  );

  const masterView = (
    <div>
      {docs.getAll().map(doc => {
        return (
          <div
            style={{
              height: '2.5rem',
              display: 'flex',
              backgroundColor: '#f2f2f2',
              borderBottom: '.0625rem solid #b3b3b3',
              width: '100%',
              padding: '11px 10px',
            }}
            id={doc.id}
            key={doc.id}
            onClick={() => {
              docs.setCursor(doc.id);
            }}>
            {doc.name}
          </div>);
      })}
    </div>
  );

  return (
    <MasterDetail
      masterView={masterView}
      detailView={detailView} />
  );
});

export default Explore;
