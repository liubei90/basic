  // 视频弹出

  var _mask_tpl = '<div id="mask">\
    <div class="mask-panel"></div>\
  </div>';

  // var mask = document.querySelector('#mask');
  // var maskPanel = mask.querySelector('.mask-panel');

  // mask.addEventListener('click', function(event) {
  //   if (event.target === mask) {
  //     show_mask(false);
  //   }
  // });

  function show_mask(elm, options) {
    var clickMaskClose = options['clickMaskClose'] === false ? false : true;
    var frag = document.createElement('div');
    frag.innerHTML = _mask_tpl;
    console.dir(frag);

    var mask = frag.children[0];
    var maskPanel = mask.querySelector('.mask-panel');
    maskPanel.appendChild(elm);

    function close_mask() {
      document.documentElement.removeChild(mask);
    }

    mask.addEventListener('click', function(event) {
      if (clickMaskClose && event.target === mask) {
        close_mask();
      }
    });

    document.documentElement.appendChild(mask);
    return close_mask;

    // if (!visible) {
    //   // mask.style.display = 'none';
    //   mask.classList.remove('visible');
    //   maskPanel.innerHTML = '';
    // } else {
    //   maskPanel.innerHTML = '';
    //   maskPanel.appendChild(elm);
    //   mask.classList.add('visible')
    //   // mask.style.display = '';
    // }
  }

  function creat_video_elm(videoUrl) {
    if (videoUrl) {
      var vdo = document.createElement('video');
      vdo.src = videoUrl;
      vdo.name = 'media';
      vdo.autoplay = true;
      vdo.controls = true;
      vdo.classList.add('video-in-mask');
      return vdo;
    }
  }