(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
      define(factory);
  } else if (typeof exports === 'object') {
      // Node, CommonJS之类的
      module.exports = factory();
  } else {
      // 浏览器全局变量(root 即 window)
      root.basic_utils = factory();
  }
}(this, function () {
  function range(num, min_num, max_num) {
    return Math.min(Math.max(num, min_num), max_num);
  }

  return {
    range: range
  }
}));