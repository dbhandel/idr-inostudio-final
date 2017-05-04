/* global SERVER */
/* eslint-disable */

import layout from 'views/dashboard/layout/container.css';

let layoutContainer = [];
let buttonsContainer = [];
let navContainer = [];
let recallContainer = [];

if (!SERVER) {
  layoutContainer = document.getElementsByClassName(layout.container);
  buttonsContainer = document.getElementsByClassName(layout['buttons-container']);
  navContainer = document.getElementsByClassName(layout['nav-container']);
  recallContainer = document.getElementsByClassName(layout['recall-container']);
}

const hideTimeout = 0;
const showTimeout = 100;
let toggleTimer = null;
let needStop = false;

export default {
  hide: () => {
    function hideInner() {
      if (layoutContainer.length > 0) layoutContainer[0].style['padding-bottom'] = '0';
      if (buttonsContainer.length > 0) buttonsContainer[0].style.display = 'none';
      // need to hide nav when it is oriented horizontaly only so will check window width
      if (navContainer.length > 0 && window.innerWidth < 992) navContainer[0].style.display = 'none';
      if (recallContainer.length > 0) recallContainer[0].style.height = '100%';
    }
    clearTimeout(toggleTimer);
    if (!needStop) toggleTimer = setTimeout(hideInner, hideTimeout);
  },
  show: () => {
    function showInner() {
      if (layoutContainer.length > 0) layoutContainer[0].style['padding-bottom'] = null;
      if (buttonsContainer.length > 0) buttonsContainer[0].style.display = null;
      if (navContainer.length > 0) navContainer[0].style.display = null;
      if (recallContainer.length > 0) recallContainer[0].style.height = null;
    }
    clearTimeout(toggleTimer);
    if (!needStop) toggleTimer = setTimeout(showInner, showTimeout);
  },
  stopHandler: () => {
    needStop = true;
  },
  startHandler: () => {
    needStop = false;
  },
};
