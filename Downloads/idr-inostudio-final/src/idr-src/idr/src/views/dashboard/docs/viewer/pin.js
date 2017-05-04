/* eslint-disable global-require */

import React from 'react';
import cn from 'classnames';
import createRecallSvg from './img/create_recall.svg';
import createdRecallSvg from './img/created-recall.svg';

const Pin = props => {
  const pin = props.data;
  const pageRotation = props.pageRotation;

  const { x, y } = pin;
  let pinStyle;
  let pinClass;

  if (pageRotation === 0) {
    pinStyle = {
      left: `calc(${x}% + ${(x > 50 ? '-35' : '0')}px)`,
      top: `calc(${y}% + ${(y > 50 ? '-54' : '19')}px)`,
    };
    pinClass = cn(x > 50 ? 'mod-right' : 'mod-left', y > 50 ? 'mod-bottom' : 'mod-top');
  } else if (pageRotation === 90) {
    pinStyle = {
      right: `calc(${y}% + ${(y > 50 ? '-35' : '0')}px)`,
      top: `calc(${x}% + ${(x > 50 ? '-54' : '19')}px)`,
    };
    pinClass = cn(x > 50 ? 'mod-bottom' : 'mod-top', y > 50 ? 'mod-left' : 'mod-right');
  } else if (pageRotation === 180) {
    pinStyle = {
      right: `calc(${x}% + ${(x > 50 ? '-35' : '0')}px)`,
      bottom: `calc(${y}% + ${(y > 50 ? '-54' : '19')}px)`,
    };
    pinClass = cn(x > 50 ? 'mod-left' : 'mod-right', y > 50 ? 'mod-top' : 'mod-bottom');
  } else if (pageRotation === 270) {
    pinStyle = {
      left: `calc(${y}% + ${(y > 50 ? '-35' : '0')}px)`,
      bottom: `calc(${x}% + ${(x > 50 ? '-54' : '19')}px)`,
    };
    pinClass = cn(x > 50 ? 'mod-top' : 'mod-bottom', y > 50 ? 'mod-right' : 'mod-left');
  }

  return (
    <div id={pin.id} style={pinStyle} className={cn(pinClass, 'tooltip', 'pin')}>
      <img src={props.data.temp ? createRecallSvg : createdRecallSvg} className="pin__icon" alt="" />
      <div className="pin__viewport">
        <span className="pin__text">Create recall</span>
      </div>
    </div>);
};

Pin.propTypes = {
  data: React.PropTypes.object,
  pageRotation: React.PropTypes.number,
};

export default Pin;
