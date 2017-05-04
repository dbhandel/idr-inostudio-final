import React from 'react';
import { action } from '@kadira/storybook';

/* components */
import RichTextEditor from 'views/dashboard/components/rte';

let richTextEditor;

const content = '<p>This is a <em>standalone</em> test of <strong>Froala</strong></p>';

const getJSON = () => richTextEditor.getContent();

export default (
  <div>
    <RichTextEditor
      ref={c => { richTextEditor = c; }}
      name="rte-test"
      content={content}
      placeholderText="Enter your text here" />
    <hr />
    <button onClick={() => action('button clicked!')(getJSON())}>Save data as JSON</button>
  </div>
);
