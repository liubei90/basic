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

  function createNonceStr() {
    return String(Math.random()).substring(2)
  }

  function createSignQuery(query) {
    query = query || {};
    query['nonce_str'] = createNonceStr();
    var keys = Object.keys(query);
    var res = []
    keys.sort();
  
    for (var i = 0; i < keys.length; i++) {
      res.push(keys[i] + '=' + query[keys[i]]);
    }

    res = res.join('&')
    sign_str = res + '&key=jwdjwmgrwoky6cw4xqq80d945zpii0z0';
  
    return res += '&sign=' + md5(sign_str).toUpperCase();
  }

  function getUserId() {
    // var query = window.location.search || '';
    // var m = query.match(/userId=([^#&]*)/);
    // if (m) {
    //   return m[1];
    // }
    return getSearch('userId');
  }

  function getSearch(keyword) {
    if (!keyword) {
      return;
    }

    var query = window.location.search || '';
    var m = query.match(new RegExp(keyword + '=([^#&]*)'));

    if (m) {
      return m[1];
    }
  }

  return {
    domain: 'http://47.115.51.206:8081',
    range: range,
    createSignQuery: createSignQuery,
    getUserId: getUserId,
    getSearch: getSearch,
  }
}));