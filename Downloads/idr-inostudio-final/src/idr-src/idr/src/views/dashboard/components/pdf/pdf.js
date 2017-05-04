import React from 'react';
import Toolbar from './toolbar';

import css from './pdf.css';

const PdfViewer = props => {
  const { url } = props;
  const staticHost = 'http://vagusx.github.io/pdfjs-v0.0.2/viewer.html';
  const src = `${staticHost}?file=${url}`;
  return (
    <div className={css.container}>
      <iframe
        src={src}
        width="100%"
        height="500px"
        style={{ marginBottom: '-2px' }} />
      <Toolbar />
    </div>
  );
};

PdfViewer.defaultProps = {
  url: 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
};

PdfViewer.propTypes = {
  url: React.PropTypes.string.isRequired,
};

export default PdfViewer;
