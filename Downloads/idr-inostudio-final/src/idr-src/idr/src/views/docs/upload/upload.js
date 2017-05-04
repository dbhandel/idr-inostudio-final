/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import DropzoneUploader from 'views/common/dropzone-uploader';
import { connect } from 'shared/store';

import css from './upload.css';

const Upload = (props, ctx) => (
  <div className={css['upload-container']}>
    <DropzoneUploader ctx={ctx} />
  </div>
);

export default connect(Upload);
