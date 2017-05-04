/* eslint-disable no-underscore-dangle, no-console */

// Isomorphic fetch means we can use `fetch()` on both the server and the
// client, which will be our mechanism for talking to the API server
import 'isomorphic-fetch';

// React -- our UI engine
import React from 'react';
import ReactDOM from 'react-dom';

// Code can be 'hot re-loaded' in development.  Any changes made to this code
// when running `npm run dev` will be reflected back in the browser automatically
import { AppContainer } from 'react-hot-loader';

// Routing and route matching
import { applyRouterMiddleware, browserHistory, Router, match } from 'react-router';

// Navigating to routes within React doesn't scroll back up to the top of the
// page by default.  React-router-scroll fixes that
import { useScroll } from 'react-router-scroll';

// Redial is a lib that allows us to run lifecycle methods when a component
// is rendered, on both the server and the client.  This is useful for checking
// for things like user permissions, since we can await on those Promises
import { trigger } from 'redial';

// jQuery is used for some third-party libs, like Froala editor
import jQuery from 'jquery';

// Mobx store loader
import { Provider, createStore } from 'shared/store';

// All routes
import routes from 'config/routes';

// Stores we need to use initially
import UserStore from 'stores/user';

// Global CSS styles
import 'styles/global.css';

// Create a new store, and re-hydrate it with the window state
const store = createStore(window.__STATE__);

// Copy to the window, so we can manipulate it
window.store = store;

// Attempt token auth.  If there's an existing auth token stored locally
// (in localStorage or via a cookie), we'll attempt to auth against the API
// server and log that user in
store(UserStore).attemptTokenAuth();

// Function to match against the current route, and run the `redial`
// lifecycle methods on the component chain.  Pass in a function and it'll
// run as a callback when finished
function handleMatch(func = null) {
  match({
    routes,
    location,
    history: browserHistory,
  }, async (e, _, renderProps) => {
    const { components } = renderProps;
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      store,
    };

    if (window.__STATE__) {
      delete window.__STATE__;
    } else {
      trigger('fetch', components, locals);
    }
    trigger('defer', components, locals);

    return typeof func === 'function' ? func() : null;
  });
}

// Initialize jQuery as a global
window.$ = window.jQuery = jQuery;

// Listen to browser changes
browserHistory.listen(handleMatch);

// Reset the scrollbar position to 0,0 on route navigation
const render = applyRouterMiddleware(useScroll());

// Render initial React
handleMatch(async () => {
  const doRender = () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router
            history={browserHistory}
            routes={routes}
            render={render} />
        </Provider>
      </AppContainer>,
      document.getElementById('root'),
    );
  };

  // For React hot loading.  This blurb allows `react-hot-loader` to do its
  // thing when running in development (via webpack)
  if (module.hot) {
    module.hot.accept('config/routes', () => {
      // eslint-disable-next-line
      require('config/routes').default;
      doRender();
    });
  }

  doRender();
});
