import React from 'react';
import { action } from '@kadira/storybook';
import { observer } from 'mobx-react';

/* stores */
import SearchStore from 'stories/stores/search/search';

/* components */
import Search from 'views/dashboard/search';

/* init */
const search = new SearchStore();

search.order = {
  on: 'Filter1',
  asc: true,
};
search.suggestions = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9'];
search.searchTags = search.suggestions.slice(0, 2);
search.filters = ['filter1', 'filter2'];

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
    placeholder="Search"
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
