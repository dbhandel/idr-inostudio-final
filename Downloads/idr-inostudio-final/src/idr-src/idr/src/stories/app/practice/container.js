import React from 'react';
import { connect } from 'shared/store';
import { action as actionLogger, linkTo } from '@kadira/storybook';

/* stores */
import RecallsStore from 'stories/stores/recalls';
import RecallStore from 'stories/stores/recall';
import TagStore from 'stories/stores/tags';

/* components */
import PracticeContainer from 'views/dashboard/practice/container/index';

/* init */
const recalls = new RecallsStore();
const recall = new RecallStore();
const tags = new TagStore();

recalls.init();

const setRatingHandler = (idTack, rating) => {
  recall.setRating(idTack, rating);
  actionLogger('Rating -> handleSetRating()')(idTack, rating);
};

const setResponseHandler = (value, practice) => {
  actionLogger('Response -> handleChangeResponse()')(value);
  recalls.updateResponse(practice.id, value);
};

const Element = connect(() => (
  <PracticeContainer
    closeClick={linkTo('App - Items', 'Recall items')}
    recall={recall}
    recalls={recalls.getAll()}
    setRating={(id, rating) => setRatingHandler(id, rating)}
    changeResponse={setResponseHandler}
    tags={tags.getTags()} />
));

export default (
  <Element />
);
