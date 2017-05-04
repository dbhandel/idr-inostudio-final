function errorLoading(err) {
  // eslint-disable-next-line no-console
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return module => cb(null, module.default);
}

export default [
  {
    getComponent(location, cb) {
      System.import('handlers/front/index')
       .then(loadRoute(cb))
       .catch(errorLoading);
    },
    childRoutes: [
      {
        path: '/',
        getComponent(location, cb) {
          System.import('handlers/front/home')
           .then(loadRoute(cb))
           .catch(errorLoading);
        },
      },
      {
        path: '/login',
        getComponent(location, cb) {
          System.import('handlers/front/login')
           .then(loadRoute(cb))
           .catch(errorLoading);
        },
      },
      {
        path: '/register',
        getComponent(location, cb) {
          System.import('handlers/front/register')
           .then(loadRoute(cb))
           .catch(errorLoading);
        },
      },
    ],
  },
  {
    path: '/dashboard',
    IndexRoute: {
      onEnter(_, replace) {
        return replace('recalls/explore');
      },
    },
    getComponent(location, cb) {
      System.import('handlers/dashboard/index')
       .then(loadRoute(cb))
       .catch(errorLoading);
    },
    childRoutes: [
      {
        path: 'recalls/explore',
        getComponent(location, cb) {
          System.import('handlers/dashboard/recalls/explore')
           .then(loadRoute(cb))
           .catch(errorLoading);
        },
      },
      {
        path: 'recalls/create',
        getComponent(location, cb) {
          System.import('handlers/dashboard/recalls/create')
           .then(loadRoute(cb))
           .catch(errorLoading);
        },
      },
      {
        path: 'docs/explore',
        getComponent(location, cb) {
          System.import('handlers/dashboard/docs/explore')
           .then(loadRoute(cb))
           .catch(errorLoading);
        },
      },
      {
        path: 'docs/upload',
        getComponent(location, cb) {
          System.import('handlers/dashboard/docs/upload')
           .then(loadRoute(cb))
           .catch(errorLoading);
        },
      },
      {
        path: 'docs/inbox',
        getComponent(location, cb) {
          System.import('handlers/dashboard/docs/inbox')
           .then(loadRoute(cb))
           .catch(errorLoading);
        },
      },
    ],
  },
];
