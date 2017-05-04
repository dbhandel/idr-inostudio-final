/* global SERVER */

export default {
  // TODO choose what need to use
  isTouchDevice: !SERVER &&
    'ontouchstart' in document.documentElement,
  isAnyMobile: !SERVER &&
    navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
};
