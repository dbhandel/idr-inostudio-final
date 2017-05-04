import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import cn from 'classnames';

import { connect } from 'shared/store';

/* stores */
import SearchStore from 'stores/search/';

/* icons */
import MagnifyIcon from 'views/icons/magnify';
import TrashIcon from 'views/icons/trash';

/* styles */
import css from './index.css';

/* components */
import Order from './order';

const classes = {
  root: css['search-bar'],
  rootFocused: css['search-focused'],
  selected: css.tags,
  selectedTag: css.tag,
  selectedTagName: css['react-tags__selected-tag-name'],
  search: css.search,
  searchInput: css['input-field'],
  suggestions: css['tag-suggestions'],
  suggestionActive: css['suggestion-active'],
};

const SearchBar = props => {
  const { store } = props;
  const placeholderText = store.tagCount ? '' : store.placeholder;

  const renderFilterSelected = (
    <button className={css['filter-select']} onClick={() => store.toggleSelectAll()}>
      {`${store.isAllSelected() ? 'Deselect' : 'Select'} All`}
    </button>
  );

  const renderFilterDeleted = (
    <button className={css['filter-delete']} onClick={() => store.deleteSelected()}>
      {store.isAllSelected() ? 'Delete All' : 'Delete'} <TrashIcon />
    </button>
    );

  return (
    <div className={cn(css['search-bar-component'], { [css.isHidden]: false })}>
      <div className={css['search-bar-row']}>
        <ReactTags
          tags={store.getTagsForSearch()}
          suggestions={store.getSuggestions()}
          handleDelete={index => store.removeTag(index)}
          handleAddition={tag => store.addTag(tag.name)}
          handleInputChange={text => store.setText(text)}
          minQueryLength={1} // display the dropdown after a single character entered
          classNames={classes}
          placeholder={placeholderText}
          autoresize={false}
          autofocus={false} />
        <div className={css['button-and-results']}>
          <MagnifyIcon onClick={() => store.search()} />
          <div className={css['number-of-results']}>
            {store.results}
          </div>
        </div>
      </div>
      <div className={css['ordering-controls']}>
        {renderFilterSelected}
        {
          store.filters.map((filter, index) =>
            <Order
              key={index}
              name={filter.name}
              column={filter.column}
              sort={filter.sort}
              active={store.column}
              asc={store.asc}
              handleChange={column => store.setOrder(column)} />,
          )
        }
        {store.selectedCount ? renderFilterDeleted : null}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  store: React.PropTypes.instanceOf(SearchStore),
};

export default connect(SearchBar);
