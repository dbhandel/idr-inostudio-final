/* global FROALA_KEY */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import cn from 'classnames';
import FroalaEditor from 'react-froala-wysiwyg';

// froala-editor core code
import 'froala-editor/js/froala_editor.pkgd.min.js';

// froala-editor styling and icons
import '!style-loader!css-loader!postcss-loader!froala-editor/css/froala_editor.pkgd.min.css';
import '!style-loader!css-loader!postcss-loader!froala-editor/css/froala_style.min.css';
import '!style-loader!css-loader!postcss-loader!font-awesome/css/font-awesome.min.css';

/* froala-editor plugins */

// emoticons
import 'froala-editor/js/plugins/emoticons.min.js';
import '!style-loader!css-loader!postcss-loader!froala-editor/css/plugins/emoticons.min.css';

import css from './froala.css';

// Config
const configReduced = [
  'bold',
  'italic',
  'underline',
  'fontSize',
  'color',
];

const configMain = [
  'bold',
  'italic',
  'underline',
  'fontSize',
  'color',
  'formatOL',
  'formatUL',
  'insertImage',
  'emoticons',
];

const pluginsEnabled = [
  'image',
  'link',
  'colors',
  'emoticons',
  'fontFamily',
  'fontSize',
  'lists',
];

const config = {
  key: FROALA_KEY,
  toolbarButtons: configMain,
  toolbarButtonsMD: configMain,
  toolbarButtonsSM: configReduced,
  toolbarButtonsXS: configReduced,
  charCounterCount: false,
  pluginsEnabled,
  events: {
    'froalaEditor.initialized': (e, editor) => {
      editor.toolbar.hide();
    },
    'froalaEditor.focus': (e, editor) => {
      editor.toolbar.show();
    },
    'froalaEditor.blur': (e, editor) => {
      editor.toolbar.hide();
    },
  },
};

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.content,
    };
  }

  handleModelChange = model => {
    this.setState({ model });
    if (this.props.handleChange) this.props.handleChange(model);
  }

  render() {
    // docs at https://www.froala.com/wysiwyg-editor/examples/custom-toolbar
    const toolbarId = `${this.props.name}-toolbar`;

    return (
      <div className={css['froala-wrapper']}>
        <div id={toolbarId} className={css['froala-toolbar']} />
        <div className={cn(this.props.name, css['froala-editor'])}>
          <FroalaEditor
            tag={`div.${this.props.name}`}
            config={Object.assign({}, config, {
              placeholderText: this.props.placeholderText,
              toolbarContainer: `#${toolbarId}`,
            })}
            model={this.state.model}
            onModelChange={this.handleModelChange} />
        </div>
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  /* strings */
  placeholderText: React.PropTypes.string,
  content: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,

  /* functions */
  handleChange: React.PropTypes.func,
};

export default RichTextEditor;
