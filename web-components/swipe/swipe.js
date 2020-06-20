(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
      define(['basic-node-ops', 'basic-touch', 'basic-utils'], factory);
  } else if (typeof exports === 'object') {
      // Node, CommonJS之类的
      module.exports = factory(require('basic-node-ops'), require('basic-touch'), require('basic-utils'));
  } else {
      // 浏览器全局变量(root 即 window)
      root.basic_swipe = factory(root.basic_node_ops, root.basic_touch, root.basic_utils);
  }
}(this, function (basic_node_ops, basic_touch, basic_utils) {
  var createElement = basic_node_ops.createElement;
  var setTextContent = basic_node_ops.setTextContent;
  var appendChild = basic_node_ops.appendChild;
  var getChild = basic_node_ops.getChild;
  var removeChild = basic_node_ops.removeChild;
  var range = basic_utils.range;

  var default_options = {
    createItemElm: function (item) {
      var itemElm = createElement('div');

      setTextContent(itemElm, item + '');
      return itemElm;
    },
  };

  function create_swipe(elm, options, items) {
    var childrens = [];
    var swipe_control = {};
    var track_elm = createElement('div');
    var width = null;
    var count = 0;
    var offset = 0;
    var active = 0;
    var rect = null;
    var touch_start_time = null;
    var swiping = true;

    // appendChild(elm, track_elm);
    initialize();
    // removeChild(elm, track_elm);
    track_elm.style.display = 'flex';
    track_elm.style.alignItems = 'center';


    function get_option(name) {
      return options[name] || default_options[name];
    }

    function initialize() {
      rect = elm.getBoundingClientRect();
      width = get_option('width');
      if (!width) {
        width = rect.width;
      }
    }

    // 创建和管理元素
    function create_item_elm(item) {
      var create_item = get_option('createItemElm');

      if (typeof(create_item) === 'function') {
        var item_elm = create_item(item);
        if (item_elm.nodeType === 11) {
          item_elm = item_elm.children[0];
        }
        item_elm.data_item = item;
        item_elm.style.width = width + 'px';
        item_elm.style.flexShrink = 0;

        // appendChild(elm, item_elm)
        return item_elm;
      }
    }

    function find_elm_in_old_elms(elms, item) {
      for (var i = 0; i < elms.length; i++) {
        if (elms[i].data_item === item) {
          return elms.splice(i, 1)[0];
        }
      }
    }

    function refresh() {
      var old_childs = [];

      while (track_elm.children.length) {
        old_childs.push(removeChild(track_elm, track_elm.children[0]));
      }

      for (var i = 0; i < childrens.length; i++) {
        var item = childrens[i];
        var item_elm = find_elm_in_old_elms(old_childs, item);
        if (!item_elm) {
          item_elm = create_item_elm(item);
        }

        appendChild(track_elm, item_elm);
      }

      count = childrens.length;
      track_elm.style.width = (width * count) + 'px';
    }

    function add_item(item, index) {
      if (childrens.indexOf(item) < 0) {
        if (index !== undefined && index < childrens.length && index >= 0) {
          childrens.splice(index, 0, item);
        } else {
          childrens.push(item);
        }
        refresh();
      }
    }

    function remove_item(item) {
      if (childrens.indexOf(item) > -1) {
        childrens.splice(childrens.indexOf(item), 1);
        refresh();
      }
    }

    function get_index(item) {
      return childrens.indexOf(item);
    }


    // 滑动管理
    function redraw() {
      var tf = 'none';
      if (offset || offset === 0) {
        tf = 'translateX('+offset+'px)';
      }
      track_elm.style.transform = tf;
      track_elm.style.transitionDuration = swiping ? 0 : '0.5s';
      // Array.prototype.forEach.call(track_elm.children, function (item_elm) {
      //   item_elm.style.transform = tf;
      // });
    }

    function get_min_offset() {
      if (rect) {
        // return rect.width - width * count;
        return width - width * count;
      };
    }

    function get_max_count() {
      min_offset = get_min_offset();
      return Math.ceil(Math.abs(min_offset) / width);
    }

    function get_target_active(pace) {
      if (pace) {
        var max_count = get_max_count();
        return range(active + pace, 0, max_count);
      }

      return active;
    }

    function get_target_offset(target, offset) {
      var current_pos = target * width;
      var min_offset = get_min_offset();
      current_pos = Math.min(current_pos, -min_offset);
      var target_offset = Math.round(offset - current_pos);
      target_offset = range(target_offset, min_offset, 0);

      return target_offset;
    }

    function set_offset(oft) {
      offset = oft;
      console.log(offset);
    }

    function set_active(acv) {
      active = acv;
    }

    function move(args) {
      if (count <= 1) {
        return;
      }
      var offset = args['offset'] || 0;
      var pace = args['pace'] || 0;

      var targetActive = get_target_active(pace);
      var targetOffset = get_target_offset(targetActive, offset);

      set_active(targetActive);
      set_offset(targetOffset);
      redraw();
    }

    // 处理元素滑动事件
    var bindTouchEvent = basic_touch.bindTouchEvent;

    function on_touch_start(event, args) {
      touch_start_time = Date.now();
      swiping = true;
    }

    function on_touch_move(event, args) {
      if (!swiping) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      move({offset: args['deltaX']});
    }

    function on_touch_end(event, args) {
      if (!swiping) {
        return;
      }
      var deltaX = args['deltaX'];
      var speed = deltaX / (Date.now() - touch_start_time);
      var should_swipe = Math.abs(speed) > 0.25 || Math.abs(deltaX) > width * 0.5;

      var pace = 0;
      if (should_swipe) {
        pace = -Math[deltaX > 0 ? 'ceil' : 'floor'](deltaX / width);
      }

      swiping = false;
      move({pace: pace});
    }

    bindTouchEvent(track_elm, {
      onTouchStart: on_touch_start,
      onTouchMove: on_touch_move,
      onTouchEnd: on_touch_end,
    });



    // 暴漏的方法
    swipe_control.prev = function() {
      ;
    }

    swipe_control.next = function() {
      ;
    }

    swipe_control.swipeTo = function() {
      ;
    }

    for (var i = 0; i < items.length; i++) {
      add_item(items[i]);
    }

    // 添加到页面
    // fixme: 这一步会在所有子节点创建完成后执行，可能会造成子节点初始化时获取不到样式
    appendChild(elm, track_elm);

    return swipe_control;
  }

  return {
    createSwipe: create_swipe
  }
}));