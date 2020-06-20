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
      maskPanel.innerHTML = '';
    } else {
      maskPanel.innerHTML = '';
      maskPanel.appendChild(elm);
      mask.classList.add('visible')
      // mask.style.display = '';
    }
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