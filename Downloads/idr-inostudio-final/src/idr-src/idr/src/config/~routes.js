import React from 'react';

// Let's grab Route, which is React Router's higher-level component for
// handling a route.  Plus, we'll use IndexRoute, which allows us to create
// nested routes and have a 'default' page load for the top-level route
import { Route, IndexRoute } from 'react-router';

/* front */
import Front from 'handlers/front/index';
import Home from 'handlers/front/home';
import Login from 'handlers/front/login';
import Register from 'handlers/front/register';
import ForgotPassword from 'handlers/front/forgot-password';

/* dashboard */
import Dashboard from 'handlers/dashboard/index';
import Explore from 'handlers/dashboard/recalls/explore';
import Create from 'handlers/dashboard/recalls/create';
import Profile from 'handlers/dashboard/profile/edit';

import ExploreDocs from 'handlers/dashboard/docs/explore';
import UploadDocs from 'handlers/dashboard/docs/upload';
import InboxDocs from 'handlers/dashboard/docs/inbox';
// import Upload from 'views/docs/upload';

// Export an array of routes.  These can be individual routes or nested
// routes - React Router is smart enough to figure out what's going on.
export default [
  <Route path="/" component={Front}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="forgot-password" component={ForgotPassword} />
  </Route>,
  <Route path="/dashboard" component={Dashboard}>
    <Route path="recalls/create" component={Create} />
    <Route path="recalls/explore" component={Explore} />
    <Route path="docs/explore" component={ExploreDocs} />
    <Route path="docs/upload" component={UploadDocs} />
    <Route path="docs/inbox" component={InboxDocs} />
    <Route path="profile" component={Profile} />
    <IndexRoute component={Explore} />
  </Route>,
];
