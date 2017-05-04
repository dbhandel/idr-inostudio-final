# iDoRecall.com - Front end

Universal front-end code for iDoRecall.com.  Targets two platforms:

### 1. Web server

* Universal code base.  Runs on Node 7.
* Express web server
* React Router routes / tree traversal
* React -> HTML rendering, for native SE/crawability
* Initial SSR that awaits (a)synchronous data loading before return
* In memory - horizontally scalable, no shared FS

### 2. Browser

* Generates webpack bundle for the browser
* Polyfills ES6/7 for compatibility to target major browsers
* Rehydrates store data from the server, without round-trips
* Fetching/deferred data defined per component

# Installation

After cloning, install required NPM packages with:

`npm i`

# Usage - development (full site)

Run:

`npm run dev`

Navigating to [http://localhost:8080/](http://localhost:8080/) should
yield the home page. In 'dev' mode, you'll be navigating through the site like
a regular visitor.

In dev mode, changes to the code will hot-reload in the browser.

# Usage - production

First, create a production build with:

`npm run build`

And then run the production server:

`npm start`

Navigate to [http://localhost:4000/](http://localhost:4000/) and you'll see the home page.

Differences in production:

* You'll notice from [viewing source](view-source:http://localhost:4000/) that you get a full HTML render back
* Components don't hot reload
* Assets are minified
* Sourcemaps are gone

# Usage - with a local API

If you are spawning the [API repo](https://git.leebenson.com/idr/api) locally, you will need to point the NPM config to use the local URL instead of the `api.idorecall.tech` live endpoint it's using by default.

To do that, run this:

`npm config set front:api_url http://localhost:5000` (or whatever port you're using locally)

This will allow you to test the API locally, in conjunction with the front-end UI.

# Usage - Running in Docker

There's a local `Dockerfile` included in the project that is used in production.

To use it locally, you can build in the usual way:

`docker build . -t <name>`

And run with:

`docker run -it -p 4000:4000 <name>`

# Usage - component testing environment (via React Storybook)

We have a simple component testing environment available via [Storybook](https://github.com/storybooks/react-storybook)

Note:  As of the later stages of development, we have often opted to write the components directly into the final build and not test them first via Storybook (mostly, to save time); therefore you may find that some of the components within Storybook are out of sync with their live counterparts, or don't work quite as expected.  This is left as an exercise for the developer to navigate!

> To spawn a local Storybook

`npm run storybook`

Then navigate to [http://localhost:6006/](http://localhost:6006)  

> To produce and run a static bundle that can be hosted

`npm run build-storybook && node src/storybook`

Then navigate to [http://localhost:8000/](http://localhost:8000)
