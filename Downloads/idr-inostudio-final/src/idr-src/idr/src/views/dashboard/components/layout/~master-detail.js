import React from 'react';
import cn from 'classnames';

import css from './master-detail.css';

const MasterDetail = props => {
  const detailViewClasses = cn(css.detail, {
    [css.show]: props.isOpen,
    [css.none]: props.current,
  });

  const masterViewClasses = cn(css.master, {
    [css.hide]: props.isOpen,
    [css.none]: !props.current,
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
  isOpen: React.PropTypes.bool,
  current: React.PropTypes.bool,
};

export default MasterDetail;
