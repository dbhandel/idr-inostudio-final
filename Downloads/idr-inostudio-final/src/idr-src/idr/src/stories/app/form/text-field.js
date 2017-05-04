import React from 'react';
import { action } from '@kadira/storybook';

/* components */
import TextField from 'views/common/form/text-field';

export default (
  <div style={{ margin: '2rem auto', width: '22rem' }}>
    <p style={{ textAlign: 'center', fontSize: '1.5em' }}>Text Field</p>
    <TextField
      type="text"
      placeholder="Default"
      name="t1"
      onChange={action('value')}
      isTransparent={false} />
    <TextField
      type="text"
      placeholder="Default with error"
      errorMessage="Some kind of error!"
      name="t2"
      onChange={action('value')}
      isTransparent={false} />
    <TextField
      type="text"
      placeholder="Transparent"
      name="t3"
      onChange={action('value')}
      isTransparent />
    <TextField
      type="text"
      placeholder="Transparent"
      errorMessage="Some kind of error!"
      name="t4"
      onChange={action('value')}
      isTransparent />
    <p style={{ textAlign: 'center', fontSize: '1.5em' }}>Email Field</p>
    <TextField
      type="email"
      placeholder="Default"
      name="e1"
      onChange={action('value')}
      isTransparent={false} />
    <TextField
      type="email"
      placeholder="Default with error"
      errorMessage="Some kind of error!"
      name="e2"
      onChange={action('value')}
      isTransparent={false} />
    <TextField
      type="email"
      placeholder="Transparent"
      name="e3"
      onChange={action('value')}
      isTransparent />
    <TextField
      type="email"
      placeholder="Transparent"
      errorMessage="Some kind of error!"
      name="e4"
      onChange={action('value')}
      isTransparent />
    <p style={{ textAlign: 'center', fontSize: '1.5em' }}>Password Field</p>
    <TextField
      type="password"
      placeholder="Default"
      name="p1"
      onChange={action('password')}
      isTransparent={false}
      hasIcon />
    <TextField
      type="password"
      placeholder="Default with error"
      errorMessage="Some kind of error!"
      name="p2"
      onChange={action('password')}
      isTransparent={false}
      hasIcon />
    <TextField
      type="password"
      placeholder="Transparent"
      name="p3"
      onChange={action('password')}
      isTransparent
      hasIcon />
    <TextField
      type="password"
      placeholder="Transparent with error"
      errorMessage="Some kind of error!"
      name="p4"
      onChange={action('password')}
      isTransparent
      hasIcon />
  </div>
);
