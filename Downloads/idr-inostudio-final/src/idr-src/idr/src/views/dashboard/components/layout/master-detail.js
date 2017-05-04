import React from 'react';
import cn from 'classnames';

/* stores */
import Recalls from 'stores/search/recalls';

import { connect } from 'shared/store';
import css from './master-detail.css';

const MasterDetail = (props, ctx) => {
  const recalls = ctx.store(Recalls);

  const detailViewClasses = cn(css.detail, {
    [css.show]: recalls.hasCursor(),
    [css.none]: !recalls.hasCursor(),
  });

  const masterViewClasses = cn(css.master, {
    [css.hide]: recalls.hasCursor(),
    [css.none]: recalls.hasCursor(),
  });

  const masterView = (
    <div className={masterViewClasses}>
      {props.masterView}
    </div>
  );

  const detailView = props.detailView ? (
    <div className={detailViewClasses}>
      {props.detailView}
    </div>
  ) : null;

  return (
    <div className={css['master-detail']}>
      {masterView}
      {detailView}
    </div>
  );
};

MasterDetail.propTypes = {
  masterView: React.PropTypes.oneOfType([
    React.PropTypes.node.isRequired,
    React.PropTypes.array.isRequired,
  ]),
  detailView: React.PropTypes.oneOfType([
    React.PropTypes.node.isRequired,
    React.PropTypes.array.isRequired,
  ]),
};

export default connect(MasterDetail);
