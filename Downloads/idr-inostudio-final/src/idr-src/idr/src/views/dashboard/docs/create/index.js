/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import { connect } from 'shared/store';
/* components */
/* stores */
import RecallStore from 'stores/dashboard/recall';

/* components */
import CreateDocMain from './main';

const CreateDocContainer = connect(props => (
  <CreateDocMain
    recall={props.recall}
    onSave={props.onSave}
    onCancel={props.onCancel} />
));

CreateDocContainer.propTypes = {
  /* stores */
  recall: React.PropTypes.instanceOf(RecallStore),

  /* bools */
  isMobile: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,

  /* functions */
  onCancel: React.PropTypes.func,
  onSave: React.PropTypes.func,
};

CreateDocMain.defaultProps = {
  recall: new RecallStore(),
  isMobile: false,
  isEdit: false,
  onCancel: () => { /* intentionally blank */ },
  onSave: () => { /* intentionally blank */ },
};

export default CreateDocContainer;
