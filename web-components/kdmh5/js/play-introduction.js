(function() {
  function create_swipe_item(imgsrc, title) {
    var videoPlaceholder = document.querySelector('#video-placeholder');
    var previewImg = videoPlaceholder.content.querySelector('.preview-img');
    var imgTitle = videoPlaceholder.content.querySelector('.video-title');

    previewImg.src = imgsrc;
    imgTitle.textContent = title;

    return document.importNode(videoPlaceholder.content, true);
  }

  function previewImgClickHandler(item) {
    console.log(item.url);
    var videoElm = creat_video_elm(item);
    if (videoElm) {
      show_mask(true, videoElm);
    }
  }

  var videoSwipe = document.querySelector('#video-swipe');
  var createSwipe = basic_swipe.createSwipe;
  var videoData = [
    // {url: './help1.mp4', type: 'video', title: '图片2'},
    // {url: './help1.mp4', type: 'video', title: '图片2'},
    // {url: './help1.mp4', type: 'video', title: '图片2'},
    {url: './image/apple-2.jpg', title: '1.快抖猫如何绑定抖音？', videoUrl: './image/help1.mp4'},
    {url: './image/apple-3.jpg', title: '2.快抖猫如何绑定抖音？', videoUrl: './image/help1.mp4'},
  ];


  var videoSwipeControl = createSwipe(videoSwipe, {
    width: document.documentElement.clientWidth - 100,
    createItemElm: function(item) {
      var elm = create_swipe_item(item.url, item.title);
      elm = elm.children[0];
      elm.addEventListener('click', function(event) {
        previewImgClickHandler(item, event)
      });
      return elm;
    }
  }, videoData);

  // 视频弹出
  var mask = document.querySelector('#mask');
  var maskPanel = mask.querySelector('.mask-panel');

  mask.addEventListener('click', function(event) {
    if (event.target === mask) {
      show_mask(false);
    }
  });

  function show_mask(visible, elm) {
    if (!visible) {
      // mask.style.display = 'none';
      mask.classList.remove('visible');
    } else {
      maskPanel.innerHTML = '';
      maskPanel.appendChild(elm);
      mask.classList.add('visible')
      // mask.style.display = '';
    }
  }

  function creat_video_elm(item) {
    if (item.videoUrl) {
      var vdo = document.createElement('video');
      vdo.src = item.videoUrl;
      vdo.name = 'media';
      vdo.autoplay = true;
      vdo.controls = true;
      vdo.classList.add('video-in-mask');
      return vdo;
    }
  }


  // 常见问题
  function create_tabs_label(item, index) {
    var labelPlaceholder = document.querySelector('#tabs-label-placeholder');
    var label = labelPlaceholder.content.querySelector('.problem-label');
    label.textContent = item['title'];

    var cloneElm = document.importNode(labelPlaceholder.content, true);
    // 
    cloneElm = cloneElm.children[0];

    return cloneElm;
  }

  function create_expand(item) {
    var expandtPlaceholder = document.querySelector('#tabs-expand-placeholder');
    // var expand = expandtPlaceholder.querySelector('.problem-expand');
    var expandTitle = expandtPlaceholder.content.querySelector('.problem-expand-title');
    var expandDetail = expandtPlaceholder.content.querySelector('.problem-expand-detail');
    expandTitle.textContent = item['title'];
    expandDetail.textContent = item['content'];

    var cloneElm = document.importNode(expandtPlaceholder.content, true);
    cloneElm = cloneElm.children[0];
    return cloneElm;
  }

  // 为expand元素绑定点击事件
  function bindExpandEvent(elms) {
    elms = Array.prototype.slice.call(elms);

    for (var i = 0; i < elms.length; i++) {
      var curElm = elms[i];
      var detailElm = curElm.querySelector('.problem-expand-detail')
      detailElm.style.display = 'none';

      if (i == 0) {
        curElm.classList.add('active');
        detailElm.style.display = '';
      }

      (function (elm) {
        var titleElm = elm.querySelector('.problem-expand-title');
        titleElm.addEventListener('click', function(event) {
          console.log('elm.index', elm.index);
          for (var j = 0; j < elms.length; j++) {
            var detailElm = elms[j].querySelector('.problem-expand-detail')
            if (elm === elms[j]) {
              elms[j].classList.add('active');
              detailElm.style.display = '';
            } else {
              elms[j].classList.remove('active');
              detailElm.style.display = 'none';
            }
          }
        });
      })(curElm);
    }
  }

  function create_tabs_content(item) {
    var contentPlaceholder = document.querySelector('#tabs-content-placeholder');
    var content = contentPlaceholder.content.querySelector('.problem-content');
    while (content.children.length > 0) {
      content.removeChild(content.children[0]);
    }

    var expands = item['content']['expand'] || [];
    for (var i = 0; i < expands.length; i++) {
      content.appendChild(create_expand(expands[i]));
    }

    var cloneElm = document.importNode(contentPlaceholder.content, true);
    cloneElm = cloneElm.children[0];

    bindExpandEvent(cloneElm.querySelectorAll('.problem-expand'));
    return cloneElm;
  }


  var problemTabs = document.querySelector('#problem-tabs');
  var createTabs = basic_tabs.createTabs;
  var tabsData = [
    { title: '全部', content: {
      expand: [
        { title: '一、淘宝客怎么绑定抖音？', content: '1、首先进入抖音app中，点击【我】菜单；' },
        { title: '二、淘宝客怎么绑定抖音？', content: '2、点击【我】的页面中的【商品橱窗】功能；' },
        { title: '三、淘宝客怎么绑定抖音？', content: '3、进入到商品橱窗页面后，点击头像右边的箭头；' },
      ]
    } },
    { title: '标签1', content: {
      expand: [
        { title: '二、淘宝客怎么绑定抖音？', content: '1、首先进入抖音app中，点击【我】菜单；' },
      ]
    } },
    { title: '标签2', content: {
      expand: [
        { title: '三、淘宝客怎么绑定抖音？', content: '1、首先进入抖音app中，点击【我】菜单；' },
      ]
    } }
  ];

  createTabs(problemTabs, {
    labelClass: 'problem_tabs-label',
    createLabel: create_tabs_label,
    createContent: create_tabs_content,
  }, tabsData);

})()