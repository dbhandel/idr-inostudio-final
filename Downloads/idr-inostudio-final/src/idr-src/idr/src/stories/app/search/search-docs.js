import React from 'react';
import { action } from '@kadira/storybook';
import { observer } from 'mobx-react';

/* stores */
import SearchDocsStore from 'stories/stores/search/search-docs';

/* components */
import Search from 'views/dashboard/search';

/* init */
const search = new SearchDocsStore();

const handleAdd = tag => {
  search.attemptToAddSearchTag(tag);
  action('handle add ->')(search.searchTags);
};

const handleDelete = tagIndex => {
  search.removeSearchTag(tagIndex);
  action('handle delete ->')(search.searchTags);
};

const handleInput = searchString => {
  search.updateCurrentSearchString(searchString);
  action('handle input ->')(search.currentSearchString);
};

const handleOrderChange = title => {
  search.updateOrder(title);
  action('handle updated order ->')(search.order);
};

const Element = observer(() => (
  <Search
    placeholder="Search docs"
    results={search.numberOfResults}
    searchTags={search.searchTags.toJS()}
    suggestions={search.suggestions.toJS()}
    filters={search.filters}
    defaultOrder={{ on: search.order.on, asc: search.order.asc }}
    changeAction={handleOrderChange}
    magnify={action('magnify')}
    add={handleAdd}
    delete={handleDelete}
    input={handleInput} />
));

export default (
  <Element />
);
