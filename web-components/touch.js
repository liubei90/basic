(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
      define(factory);
  } else if (typeof exports === 'object') {
      // Node, CommonJS之类的
      // $ = require('jquery')
      module.exports = factory();
  } else {
      // 浏览器全局变量(root 即 window)
      root.basic_touch = factory();
  }
}(this, function () {
  var default_options = {
    onTouchStart: null,
    onTouchMove: null,
    onTouchEnd: null,
  }

  var MIN_DISTANCE = 10;
  var startX;
  var startY;
  var deltaX;
  var deltaY;
  var offsetX;
  var offsetY;
  var direction = '';

  function getDirection(x, y) {
    if (x > y && x > MIN_DISTANCE) {
      return 'horizontal';
    }
  
    if (y > x && y > MIN_DISTANCE) {
      return 'vertical';
    }
  
    return '';
  }

  function resetTouchStatus() {
    deltaX = 0;
    deltaY = 0;
    offsetX = 0;
    offsetY = 0;
    direction = '';
  }

  function on_touch_start(event) {
    resetTouchStatus()
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;

    var onTouchStart = default_options.onTouchStart;

    if (typeof(onTouchStart) === 'function') {
      onTouchStart()
    }
  }

  function on_touch_move(event) {
    const touch = event.touches[0];

    var onTouchMove = default_options.onTouchMove;

    if (typeof(onTouchMove) === 'function') {
      onTouchMove()
    }
  }

  function on_touch_end(event) {
    var onTouchEnd = default_options.onTouchEnd;

    if (typeof(onTouchEnd) === 'function') {
      onTouchEnd()
    }
  }

  function bind_touch_event(elm, options) {
    default_options = Object.assign(default_options, options);

    elm.addEventListener('touchstart', on_touch_start);
    elm.addEventListener('touchmove', on_touch_move);
    elm.addEventListener('touchend', on_touch_end);
    elm.addEventListener('touchcancel', on_touch_end);
  }

  return {
    bindTouchEvent: bind_touch_event,
  }

}));