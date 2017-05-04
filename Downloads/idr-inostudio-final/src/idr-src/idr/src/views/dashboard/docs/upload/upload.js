/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Dropzone from 'react-dropzone';
import cn from 'classnames';

import CloseIcon from 'views/icons/close';
import PdfIcon from 'views/icons/pdf';
import ComputerIcon from 'views/icons/social/computer';
import FbIcon from 'views/icons/social/fb';
import GoogleDriveIcon from 'views/icons/social/google-drive';
import BoxIcon from 'views/icons/social/box';
import OneDriveIcon from 'views/icons/social/oneDrive';
import GooglePhotosIcon from 'views/icons/social/google-photos';
import InstagramIcon from 'views/icons/social/instagram';
import FlickrIcon from 'views/icons/social/flickr';
import LinkIcon from 'views/icons/link';
import GitHubIcon from 'views/icons/social/gitHub';

import css from './upload.css';

const renderPreviewFiles = (preview, removeFiles) => (
  <div className={css.preview}>
    {preview.map((item, i) => (
      <div key={i} className={css.previewIMG}>
        {item.type === 'image/jpeg' ? <img src={item.preview} alt="img" /> : <PdfIcon style={{ width: 70 }} />}
        <CloseIcon onClick={() => removeFiles(i)} />
      </div>
    ))}
  </div>
);

const Upload = props => {
  const className = id => cn({
    [css.active]: id === props.selectedOption ? 1 : false,
  });
  return (
    <div className={css.upload}>
      <div className={css.label}>
        <span>Choose File</span>
        <CloseIcon onClick={props.handleCloseClock} />
      </div>
      <div className={css['upload-container']}>
        <div className={css.nav}>
          <ul onClick={props.uploadOption}>
            <li value={0} className={className(0)}><ComputerIcon />My Computer</li>
            <li value={1} className={className(1)}><FbIcon />Facebook</li>
            <li value={2} className={className(2)}><GoogleDriveIcon />Google Drive</li>
            <li value={3} className={className(3)}><BoxIcon />Box</li>
            <li value={4} className={className(4)}><OneDriveIcon />OneDrive</li>
            <li value={5} className={className(5)}><GooglePhotosIcon />Google Photos</li>
            <li value={6} className={className(6)}><InstagramIcon />Instagram</li>
            <li value={7} className={className(7)}><FlickrIcon />Flickr</li>
            <li value={8} className={className(8)}><LinkIcon />Link (URL)</li>
            <li value={9} className={className(9)}><GitHubIcon />Github</li>
          </ul>
        </div>
        <div className={css.content}>
          <p className={css['content-title']}>Upload from your computer</p>
          <div className={css.dnd}>
            <div className={css['dnd-container']}>
              <Dropzone
                className={css.dropzone}
                onDrop={props.onDrop}>
                { props.preview.length > 0 ?
                  renderPreviewFiles(props.preview, props.removeFiles) : null}
                <p>Drag file here</p>
                <span className={css.or}>- or -</span>
                <div className={css['btn-upload']}>
                  <span>Choose file</span>
                  <input type="file" className={css['input-upload']} onChange={props.addOnClick} />
                </div>
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Upload.propTypes = {
  handleCloseClock: React.PropTypes.func,
  addOnClick: React.PropTypes.func,
  preview: React.PropTypes.array,
  removeFiles: React.PropTypes.func,
  onDrop: React.PropTypes.func,
  uploadOption: React.PropTypes.func,
  selectedOption: React.PropTypes.number,
};

export default Upload;
