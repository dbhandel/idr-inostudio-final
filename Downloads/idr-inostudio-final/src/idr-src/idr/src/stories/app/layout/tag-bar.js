import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { connect } from 'shared/store';

/* stores */
import TagStore from 'stories/stores/tags';

/* components */
import TagBar from 'views/dashboard/layout/tag-bar';

/* init */
const tags = new TagStore();

const Element = connect(() => (
  <TagBar
    tags={tags.getTags()}
    addTag={tag => {
      tags.addTag(tag);
      actionLogger('added tag ->')(tags.tags);
    }}
    removeTag={index => {
      tags.removeTag(index);
      actionLogger('removed tag ->')(tags.tags);
    }} />
));

export default (
  <Element />
);
