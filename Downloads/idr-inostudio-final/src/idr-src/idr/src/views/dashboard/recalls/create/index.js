/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import { connect } from 'shared/store';
/* components */
/* stores */
import RecallStore from 'stores/dashboard/recall';

/* components */
import CreateRecallMain from './main';

const CreateRecallContainer = connect(props => (
  <CreateRecallMain
    buttonPosition="base"
    recall={props.recall}
    onSave={props.onSave}
    onCancel={props.onCancel} />
));

CreateRecallContainer.propTypes = {
  /* stores */
  recall: React.PropTypes.instanceOf(RecallStore),

  /* bools */
  isMobile: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,

  /* functions */
  onCancel: React.PropTypes.func,
  onSave: React.PropTypes.func,
};

CreateRecallMain.defaultProps = {
  recall: new RecallStore(),
  isMobile: false,
  isEdit: false,
  onCancel: () => { /* intentionally blank */ },
  onSave: () => { /* intentionally blank */ },
};

export default CreateRecallContainer;
