/* global SERVER */
/* eslint-disable global-require */

import React from 'react';

/*
If we're on the server, just render a readonly version of the content.
Otherwise render the content within the Froala RichTextEditor
*/
let TextEditor;
if (SERVER) {
  TextEditor = require('views/dashboard/components/viewonly-rte').default;
} else {
  TextEditor = require('views/dashboard/components/froala').default;
}

class TextEditorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.froalaEditor = null;
  }

  /*
  If we're on the server, just fetch the content passed in as a prop as it wouldn't have changed.
  Otherwise fetch the content from the model state (from the Froala component).
  */
  getContent = () => (SERVER ? this.props.content : this.froalaEditor.state.model);

  render() {
    return (
      <TextEditor
        ref={c => { this.froalaEditor = c; }}
        name={this.props.name}
        content={this.props.content}
        handleChange={html => this.props.handleChange(html)}
        placeholderText={this.props.placeholderText} />
    );
  }
}

TextEditorWrapper.propTypes = {
  /* strings */
  placeholderText: React.PropTypes.string,
  content: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,

  /* functions */
  handleChange: React.PropTypes.func,
};

TextEditorWrapper.defaultProps = {
  handleChange: () => {},
};

export default TextEditorWrapper;
