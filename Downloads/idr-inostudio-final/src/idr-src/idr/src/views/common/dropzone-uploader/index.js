/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Dropzone from 'react-dropzone';

import Doc from 'stores/doc';

import CloseIcon from 'views/icons/close';
import PdfIcon from 'views/icons/pdf';

import css from './style.css';

class DropZoneUploader extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = { files: [] };
    this.docStore = props.ctx.store(Doc);
  }

  renderPreviewFiles = () => (
    <div className={css.preview}>
      {this.state.files.map((item, i) => (
        <div key={i} className={css.previewIMG}>
          {item.type === 'image/jpeg'
            ? <img src={item.preview} alt="img" />
            : <PdfIcon style={{ width: 70 }} />}
          <CloseIcon onClick={() => {
          }} />
        </div>
      ))}
    </div>
  );

  render() {
    return (
      <div>
        <Dropzone
          className={css.dropzone}
          disableClick
          onDrop={this.onDrop}>
          { this.state.files && this.renderPreviewFiles() }
          <p>Drag file here</p>
          <span className={css.or}>- or -</span>
          <div className={css['btn-upload']}>
            <span>Choose file</span>
          </div>
        </Dropzone>
        <div className={css['btn-upload']} onClick={this.onUpload}>
          <span>Upload</span>
        </div>
      </div>
    );
  };

  onDrop = (files) => {
    const newState = this.state.files.slice();
    newState.push(files[0]);
    this.setState({ files: newState });
  };

  onUpload = () => {
    const files = this.state.files;
    if (files.length) {
      const data = new FormData();
      files.forEach((file, i) => {
        data.append(`file_ ${i}`, file, file.name);
      });
      this.docStore.addDoc(data);
    }
  };
}
export default DropZoneUploader;
