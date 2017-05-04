import React from 'react';
import { action as actionLogger } from '@kadira/storybook';
import { connect } from 'shared/store';

/* stores */
import RecallStore from 'stories/stores/recall';

/* components */
import Rating from 'views/dashboard/recalls/rating';

/* init */
const recalls = new RecallStore();
const id = 1;

const handleSetRating = (idTack, rating) => {
  recalls.setRating(idTack, rating);
  actionLogger('Rating -> handleSetRating()')(idTack, rating);
};

const Element = connect(() => (
  <Rating
    rating={recalls.getRating(id)}
    setRating={rating => handleSetRating(id, rating)} />
));

export default (
  <div>
    <Element />
    <button
      style={{ marginTop: 25 }}
      onClick={() => {
        handleSetRating(id, null);
      }}>Reset</button>
  </div>
);
