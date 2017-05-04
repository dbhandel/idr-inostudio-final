export const links = new Map()
  .set('home', '/')
  .set('how-it-works', '/how-it-works')
  .set('pricing', '/pricing')
  .set('resources', '/resources')
  .set('register', '/register')
  .set('login', '/login')
  .set('forgotPassword', '/forgot-password')
  .set('dashboard', '/dashboard/recalls/explore')
  .set('logout', '/logout');

export const dashboard = new Map()
  .set('explore', '/dashboard/recalls/explore')
  .set('create', '/dashboard/recalls/create')
  .set('profile', '/dashboard/profile')
  .set('recalls', '/dashboard/recalls/explore')
  .set('docs', '/dashboard/docs/explore');

export const dashboardDocs = new Map()
  .set('explore', '/dashboard/docs/explore')
  .set('upload', '/dashboard/docs/upload')
  .set('inbox', '/dashboard/docs/inbox')
  .set('progress', '/dashboard/docs/progress')
  .set('more', '/dashboard/docs/more');

const frontCommon = new Set()
  .add({
    url: links.get('home'),
    text: 'Home',
  })
  .add({
    url: links.get('how-it-works'),
    text: 'How it works',
  })
  .add({
    url: links.get('pricing'),
    text: 'Pricing',
  })
  .add({
    url: links.get('resources'),
    text: 'Resources',
  });

export const frontAnonymous = new Set(frontCommon)
  .add({
    url: links.get('register'),
    text: 'Get started',
    type: 'cta',
  })
  .add({
    url: links.get('login'),
    text: 'Sign in',
    type: 'login',
  });

export const frontLoggedIn = new Set(frontCommon)
  .add({
    url: links.get('dashboard'),
    text: 'Dashboard',
    type: 'cta',
  })
  .add({
    url: links.get('logout'),
    text: 'Logout',
    type: 'logout',
  });
