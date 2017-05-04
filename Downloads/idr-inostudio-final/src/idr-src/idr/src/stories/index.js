import React from 'react';
import { storiesOf, addDecorator } from '@kadira/storybook';
import jQuery from 'jquery';

/* stores */
import { Provider, createStore } from 'shared/store';

/* global styles */
import 'styles/global.css';

/* components */
import appLayout from './app/layout';
import appSearch from './app/search';
import appRecalls from './app/recalls';
import appPractice from './app/practice';
import appControls from './app/controls';
import appItems from './app/items';
import appDocs from './app/docs';
// import answer from './app/answer';
import icons from './app/icons';
import form from './app/form';
import frontHome from './front/home';
import frontUsers from './front/users';
import experiments from './experiments';
import pdfLayout from './pdfLayout';

// Start API

/* helpers */
window.$ = window.jQuery = jQuery;
const store = createStore();

addDecorator(props => (
  <Provider store={store}>
    {props()}
  </Provider>
));

function loadStories(...components) {
  components.forEach(component => {
    if (Array.isArray(component.stories)) {
      component.stories.reduce(
        (func, pair) => func.add(pair.name, () => pair.component),
        (component.loader || storiesOf('Default', module)),
      );
    }
  });
}

/* init */
loadStories(
  appLayout,
  appSearch,
  appRecalls,
  appPractice,
  appControls,
  appItems,
  appDocs,
  // answer,
  frontHome,
  frontUsers,
  icons,
  experiments,
  form,
  pdfLayout,
);
