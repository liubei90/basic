(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
      define(['basic-node-ops', 'basic-touch'], factory);
  } else if (typeof exports === 'object') {
      // Node, CommonJS之类的
      module.exports = factory(require('basic-node-ops'), require('basic-touch'));
  } else {
      // 浏览器全局变量(root 即 window)
      root.basic_tabs = factory(root.basic_node_ops, root.basic_touch);
  }
}(this, function (basic_node_ops, basic_touch, basic_utils) {
  var createElement = basic_node_ops.createElement;
  var setTextContent = basic_node_ops.setTextContent;
  var appendChild = basic_node_ops.appendChild;
  var getChild = basic_node_ops.getChild;
  var removeChild = basic_node_ops.removeChild;
  var getElementRect = basic_node_ops.getElementRect;

  var default_options = {
    active: 0,
    labelClass: null,
    createLabel: function(item) {
      var itemElm = createElement('span');
      setTextContent(itemElm, item['title']);
      return itemElm;
    },
    createContent: function(item) {
      var itemElm = createElement('div');
      setTextContent(itemElm, item['content']);
      return itemElm;
    },
  }

  function create_tabs(tabsElm, options, items) {
    // 构建tabs的dom结构, 挂到elm内，通过control方法动态修改tab
    var children = (items || []).slice();
    var tabs_control = {};
    var tabs_wrap = createElement('div');
    var tabs_label_list = createElement('div');
    var tabs_content = createElement('div');
    var active = get_option('active');
    
    appendChild(tabs_wrap, tabs_label_list);

    initialize();

    function get_option(name) {
      return options[name] || default_options[name];
    }

    function initialize() {
      // if (children.length > 0) {
      //   ;
      // }
      tabs_wrap.style.overflow = 'hidden';
      tabs_label_list.style.display = 'flex';
      tabs_label_list.style.overflowX = 'auto';
      tabs_label_list.style.overflowY = 'hidden';
      tabs_content.style.width = '100%';
    }

    function create_labels() {
      var res = [];
      var create_title = get_option('createLabel');

      if (typeof(create_title) === 'function') {
        children.forEach(function(item, index) {
          var labelElm = createElement('div');
          var titleElm = create_title(item, index);
          var rect = getElementRect(titleElm);
          var labelClass = get_option('labelClass');

          labelElm.style.flex = '0 0 ' + rect.width + 'px';
          labelElm.style.alignItems = 'center';
          labelElm.style.justifyContent = 'center';
          if (labelClass) {
            labelElm.classList.add(labelClass);
          }
          res.push(labelElm);
          appendChild(labelElm, titleElm);

          // 事件相关
          labelElm.addEventListener('click', function(event) {
            labelClickHandler(event, item, index);
          });
        });
      }

      return res;
    }

    function create_contents() {
      var res = [];
      var create_content = get_option('createContent');

      if (typeof(create_content) === 'function') {
        children.forEach(function(item, index) {
          res.push(create_content(item, index));
        });
      }

      return res;
    }

    function refresh() {
      var labels = create_labels();
      tabs_label_list.innerHTML = '';
      if (labels && labels.length) {
        labels.forEach(function (label, index) {
          if (index == active) {
            label.classList.add('active');
          }
          appendChild(tabs_label_list, label);
        });
      }

      var contents = create_contents();
      tabs_content.innerHTML = '';
      if (contents && contents.length) {
        contents.forEach(function (item, index) {
          if (index != active) {
            item.style.display = 'none';
          }
          appendChild(tabs_content, item);
        });
      }
    }

    // 事件相关
    function labelClickHandler(event, item, index) {
      tabs_control.setActive(index);
    }

    // 

    // 导出api
    tabs_control.setActive = function (index) {
      for (var i = 0; i < tabs_content.children.length; i++) {
        var contentElm = tabs_content.children[i];
        if (index == i) {
          contentElm.style.display = '';
        } else {
          contentElm.style.display = 'none';
        }
      }

      for (var i = 0; i < tabs_label_list.children.length; i++) {
        var labelElm = tabs_label_list.children[i];
        if (index == i) {
          labelElm.classList.add('active');
        } else {
          labelElm.classList.remove('active');
        }
      }
      active = index;
    }

    // 初始化dom结构
    refresh();
    appendChild(tabsElm, tabs_wrap);
    appendChild(tabsElm, tabs_content);

    return tabs_control;
  }


  return {
    createTabs: create_tabs,
  }
}));