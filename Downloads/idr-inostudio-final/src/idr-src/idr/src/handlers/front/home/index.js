import React from 'react';

/* components */
import Remember from 'views/front/home/remember';
import Organized from 'views/front/home/organized';
import Benefits from 'views/front/home/benefits';
import Bibliography from 'views/front/home/bibliography';

/* handlers */
import Hero from './hero';
import Crush from './crush';

export default () => (
  <div>
    <Hero />
    <Remember />
    <Crush />
    <Organized />
    <Benefits />
    <Bibliography />
  </div>
);
