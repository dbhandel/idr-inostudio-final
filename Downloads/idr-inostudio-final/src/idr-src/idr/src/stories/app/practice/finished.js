import React from 'react';
import { action as actionLogger } from '@kadira/storybook';

/* components */
import Header from 'views/dashboard/practice/header';
import PracticeComplete from 'views/dashboard/practice/finished';

const Finished = (
  <div>
    <Header
      count={78}
      completed={70}
      closeClick={actionLogger('Recalls -> handleCloseClick()')} />
    <PracticeComplete />
  </div>
);

export default Finished;
