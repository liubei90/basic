(function() {
  function createSection(item) {
    var tpl = document.querySelector('#tpl-section');
    var title = tpl.content.querySelector('.title');
    title.textContent = item['title'];
    var content = tpl.content.querySelector('.content');
    content.textContent = item['content'];
    var video = tpl.content.querySelector('video');
    video.src = item['videoUrl'];

    return document.importNode(tpl.content, true);
  }

  function createIntroduction(list) {
    var introduction = document.querySelector('#introduction');

    if (Array.isArray(list)) {
      introduction.innerHTML = '';
      list.forEach(function(item) {
        introduction.appendChild(createSection(item));
      });
    }
  }


  var loading = document.querySelector('#loading');

  reqwest({
    url: basic_utils.domain + '/api/H5/getStudyPlan?' + basic_utils.createSignQuery(),
    method: 'post',
    crossOrigin: true,
    success: function(data) {
      console.log(data);
      loading.classList.remove('visible');
      if (data && data['code'] === 200 && data['data']) {
        createIntroduction(data['data']['list']);
      }
    },
    error: function(err) {
      loading.classList.remove('visible');
    },
  });

  var studyBtn = document.querySelector('#study-btn');
  studyBtn.addEventListener('click', function() {
    alert('请回到首页操作！');
  });
})();