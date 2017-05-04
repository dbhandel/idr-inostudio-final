import React from 'react';

import { action as actionLogger } from '@kadira/storybook';
import { connect } from 'shared/store';
import FileStack from 'stores/fileStack';
import Upload from 'views/docs/upload/upload';

const fileStack = new FileStack();

const addOnDrop = acceptedFiles => {
  const file = {
    name: acceptedFiles[0].name,
    type: acceptedFiles[0].type,
    preview: acceptedFiles[0].preview,
  };
  fileStack.addFiles(file);
  actionLogger('addOnDrop')(file);
};

const addOnClick = e => {
  const file = {
    name: e.target.files[0].name,
    type: e.target.files[0].type,
    preview: window.URL.createObjectURL(e.target.files[0]),
  };
  fileStack.addFiles(file);
  actionLogger('addOnClick')(file);
};

const handleDeleteClick = key => {
  fileStack.removeFiles(key);
  actionLogger('handleDeleteClick')();
};

const uploadOption = val => {
  fileStack.changeSelectedOption(val.target.value);
  actionLogger('UploadOption')(val);
};

const Element = connect(() => (
  <Upload
    onDrop={acceptedFiles => addOnDrop(acceptedFiles)}
    addOnClick={file => addOnClick(file)}
    preview={fileStack.getFiles()}
    removeFiles={key => handleDeleteClick(key)}
    uploadOption={val => uploadOption(val)}
    selectedOption={fileStack.selectedOption}
    handleCloseClock={actionLogger('handleCloseClock')} />
));

export default (
  <Element />
);
