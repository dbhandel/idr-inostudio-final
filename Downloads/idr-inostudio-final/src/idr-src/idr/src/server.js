/* global API_URL */
/* eslint-disable no-console */

// Isomorphic fetch means we can use `fetch()` on both the server and the
// client, which will be our mechanism for talking to the API server
import 'isomorphic-fetch';

// React -- our UI engine
import React from 'react';
import ReactDOM from 'react-dom/server';

// Routing and route matching
import { match, RouterContext } from 'react-router';

// Redial is a lib that allows us to run lifecycle methods when a component
// is rendered, on both the server and the client.  This is useful for checking
// for things like user permissions, since we can await on those Promises
import { trigger } from 'redial';

// The Bluebird Promise lib has a useful method for 'promisifying' a regular
// callback-style Node function.  We'll it alongside our match methods to make
// it easier to work with async
import P from 'bluebird';

// Express web server, for handling server-side HTTP requests
import express from 'express';

// Cookie parser.  We'll use this to extract the client-side auth token, and
// re-use it in our requests back to the API server
import cookieParser from 'cookie-parser';

// Global CSS styles.  Since we're on the server-side, webpack will parse
// these out into a separate .css file, loaded from our HTML response
import 'styles/global.css';

// Mobx store loader
import { Provider, createStore } from 'shared/store';

// All routes
import routes from 'config/routes';

// Stores we need to use initially
import RequestStore from 'stores/request';
import UserStore from 'stores/user';

// Common paths used in the application
import PATHS from '../paths';

// Default port to spawn the web server on
const PORT = 4000;

// Promisif the match library, so we can use it with async/await
const matchPromise = P.promisify(match, { multiArgs: true });

// Self-running async function to spawn the server
(async function start() {
  try {
    // Start an express instance, with static file system and /ping routes
    const app = express();
    app
      .use(express.static(PATHS.distPublic))
      .get('/ping', (req, res) => {
        res.send('pong');
      })
      // Parse cookies
      .use(cookieParser())
      // Function to match and respond to the current routes
      .use(async (req, res) => {
        // Build the location query based on routes and location
        const query = {
          routes,
          location: req.url,
        };

        // Wrap the route matching in a try/catch block, so that any errors
        // from our React component chain don't kill the server
        try {
          // Attempt the route match
          const [redir, renderProps] = await matchPromise(query);

          // If the `redir` param is filled, it means we have a redirection
          // route -- so instead issue a 302
          if (redir) {
            return res.redirect(redir.pathname + redir.search);
          }

          // If `renderProps` is blank, it means we don't have a route hit --
          // therefore, it's a 404
          if (!renderProps) {
            res.status(404).send("Oops, looks like you're lost! Nothing to see here");
          }

          // Get the `components` from renderProps - this is our hierarchy of
          // React components
          const { components } = renderProps;

          // Create a store, unique to this HTTP request
          const store = createStore();

          // Do we have a token? If so, try to auth against the API server
          if (req.cookies.token) {
            store(RequestStore).setToken(req.cookies.token);
            await store(UserStore).attemptTokenAuth();
          }

          // Trigger 'fetch' in Redial on component tree
          await trigger('fetch', components, {
            path: renderProps.location.pathname,
            query: renderProps.location.query,
            params: renderProps.params,
            store,
          });

          // Render the React chain to plain HTML, wrapping it in a
          // store provider so that `this.context.store` is available to those
          // React components that specifically use our store `connect()`
          // higher-order function.
          const html = ReactDOM.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>,
          );

          // Dump the rendered HTML back to the client, including all of the
          // required <head> content, CSS assets, and the current store state
          // so that the client can pick up from where the server left off
          res.send(
            `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
                <title>iDoRecall.com</title>
                <link rel="stylesheet" href="/assets/css/style.css" media="screen">
              </head>
              <body>
                <div id="root">
                  ${html}
                </div>
              </body>
              <script>
                window.__STATE__ = ${store.dehydrate()};
              </script>
              <script src="/vendor.js"></script>
              <script src="/client.js"></script>
            </html>`,
          );
        } catch (e) {
          // If we have an error at this point, it's because there was a problem
          // inside the React chain rendering.  So just dump that error out to
          // the screen and let any upstream loggers catch it
          console.log('500 error:', e);
        }
        return true;
      });

    // Spawn on our default port
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (e) {
    // Should never get here - but just in case...
    console.log('general error: ', e);
  }
}());
