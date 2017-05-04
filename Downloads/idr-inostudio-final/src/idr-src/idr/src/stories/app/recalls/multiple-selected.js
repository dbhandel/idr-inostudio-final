import React from 'react';
// import { observer } from 'mobx-react';
import { action as actionLogger } from '@kadira/storybook';
import { connect } from 'shared/store';
import userAgent from 'shared/env';
/* store */
import RecallsStore from 'stories/stores/recalls';
import TagStore from 'stories/stores/tags';
import SearchRecallsStore from 'stories/stores/search/search-recalls';

import Search from 'views/dashboard/search';
import Container from 'views/dashboard/layout/container';
import Selected from 'views/dashboard/items/selected';
import EditRecall from 'views/dashboard/recalls/explore/';
import Header from '../layout/header';
import Nav from '../layout/nav';

/* init */
const recalls = new RecallsStore();
const tags = new TagStore();
const search = new SearchRecallsStore();

const isMobil = userAgent.isAnyMobile;

recalls.init();

const filterSelectAll = () => {
  if (search.selectAll === true) {
    recalls.selected = [];
    search.selectAll = !search.selectAll;
    search.isDelete = search.selectAll;
  } else {
    recalls.filterSelectAll();
    search.selectAll = !search.selectAll;
    search.deleteAll = !search.deleteAll;
    search.isDelete = search.selectAll;
  }
};

const handleToggleSelected = item => {
  recalls.toggleSelected(item);
  const selected = recalls.selected;
  const items = recalls.items;

  if (selected.length > 0) {
    search.isDelete = true;
  } else {
    search.isDelete = false;
  }

  if (selected.length === items.length) {
    search.deleteAll = true;
    search.selectAll = true;
  } else {
    search.selectAll = false;
    search.deleteAll = false;
  }

  actionLogger('Recall-Item -> handleToggleSelected() ', recalls)(recalls.selected);
};

const handlePracticeClick = val => {
  actionLogger('Recall-Item -> handlePracticeClick()')(val);
};

const handleDeleteClick = val => {
  actionLogger('Recall-Item -> handleDeleteClick()')(val);
};

const handleClick = val => {
  actionLogger('Recall-Item -> handleClick()')(val);
  recalls.setCurrent(val);
};

const handleQuestion = val => {
  recalls.updateCurrent('text', val);
  actionLogger('handleQuestion ->')(val);
};

const handleAnswer = val => {
  recalls.updateCurrent('answer', val);
  actionLogger('handleAnswer ->')(val);
};

const handleAddTag = tag => {
  tags.addTag(tag);
  actionLogger('handleAddTag ->')(tag);
};

const handleRemoveTag = index => {
  tags.removeTag(index);
  actionLogger('handleRemoveTag ->')(index);
};

const handleEdit = () => {
  actionLogger('handleEdit ->')();
};

const handleCancel = () => {
  recalls.resetCurrent();
  actionLogger('handleCancel ->')();
};

const handleRemoveDate = key => {
  recalls.deadline.splice(key, 1);
  actionLogger('delete DeadlineDate', key)(key);
};

const handleAddNewDate = () => {
  recalls.deadline.push({
    label: '',
    date: null,
  });
  actionLogger('handleAddNewDate')();
};

const handleEditLabel = (val, index) => {
  const date = recalls.deadline[index].date;
  recalls.deadline.splice(index, 1, {
    label: val,
    date,
  });
  actionLogger('edit label', val)(val);
};

const handleChangeDeadlineDate = (deadlineDate, index) => {
  const label = recalls.deadline[index].label;
  recalls.deadline.splice(index, 1, {
    label,
    date: isMobil ? deadlineDate : deadlineDate.toDate(),
  });
  actionLogger('Deadline change.')(deadlineDate);
};

// SearchRecallsStore
const handleAdd = tag => {
  search.attemptToAddSearchTag(tag);
  actionLogger('handle add ->')(search.searchTags);
};

const handleDelete = tagIndex => {
  search.removeSearchTag(tagIndex);
  actionLogger('handle delete ->')(search.searchTags);
};

const handleInput = searchString => {
  search.updateCurrentSearchString(searchString);
  actionLogger('handle input ->')(search.currentSearchString);
};

const handleOrderChange = title => {
  search.updateOrder(title);
  actionLogger('handle updated order ->')(search.order);
};

const deleteRecalls = () => {
  recalls.filterDeleteSelected();
  actionLogger('deleteRecalls')();
};

const deleteSelected = () => {
  search.isDelete = false;
  recalls.deleteSelected();
  actionLogger('deleteSelected')();
};
const Element = connect(() =>
  (
    <Container
      header={Header}
      nav={Nav}
      buttons>
      <Search
        placeholder="Search all your docs"
        results={search.numberOfResults}
        searchTags={search.searchTags.toJS()}
        suggestions={search.suggestions.toJS()}
        filters={search.filters}
        defaultOrder={{ on: search.order.on, asc: search.order.asc }}
        changeAction={handleOrderChange}
        magnify={actionLogger('magnify')}
        add={handleAdd}
        delete={handleDelete}
        input={handleInput}
        selectedItems={search.selected}
        filterSelectAll={filterSelectAll}
        selectAll={search.selectAll}
        deleteAll={search.deleteAll}
        isDelete={search.isDelete}
        deleteRecalls={deleteRecalls} />
      <span style={{ display: 'none' }}>{`${recalls.selected.length}`}</span>
      <EditRecall
        actionFilterType={recalls.getActionFilterType()}
        items={recalls.getAll()}
        isSelected={item => recalls.isSelected(item)}
        onClick={handleClick}
        toggleSelected={handleToggleSelected}
        practiceClick={handlePracticeClick}
        deleteClick={handleDeleteClick}
        isOpen={!!recalls.getCurrent().id}
        selected={recalls.selected.toJS()}
        addTag={handleAddTag}
        removeTag={handleRemoveTag}
        getTags={tags.getTags()}
        handleQuestion={handleQuestion}
        handleAnswer={handleAnswer}
        handleDate={handleChangeDeadlineDate}
        handleQuestionPhoto={actionLogger('Question photo handler called')}
        handleAnswerPhoto={actionLogger('Answer photo handler called')}
        recall={recalls.getCurrent()}
        deadline={recalls.deadline.toJS()}
        removeDeadline={key => handleRemoveDate(key)}
        addNewDate={handleAddNewDate}
        editLabel={handleEditLabel}
        onEdit={handleEdit}
        onCancel={handleCancel} />
      <Selected
        deleteSelected={() => deleteSelected()}
        cancelDeleteSelected={() => recalls.cancelDeleteSelected()}
        actionFilterType={recalls.getActionFilterType()}
        items={{ selected: recalls.selected, due: recalls.items }} />
    </Container>
  ),
);

export default (
  <Element />
);
