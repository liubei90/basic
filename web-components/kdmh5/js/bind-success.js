(function() {
  function createSuggestionList(list) {
    var suggestionList = document.querySelector('#suggestion-list');
    suggestionList.innerHTML = '';
    var items = list.forEach(function(item) {
      var tpl = document.querySelector('#tpl-suggestion-item');
      var img = tpl.content.querySelector('.s-preview-image');
      img.src = item['coverImage'];
      var name = tpl.content.querySelector('.s-name');
      name.textContent = item['name'];
      var tag = tpl.content.querySelector('.s-tag');
      tag.textContent = item['typeName'];
      var itemElm = document.importNode(tpl.content, true);
      var btn = itemElm.querySelector('.common-btn');
      btn.addEventListener('click', function() {
        window.location.href = item['jump'];
      });
      suggestionList.appendChild(itemElm);
    });
  }

  var userId = basic_utils.getUserId();

  reqwest({
    url: basic_utils.domain + '/api/H5/getApplets?' + basic_utils.createSignQuery({ userId: userId }),
    method: 'post',
    crossOrigin: true,
    success: function(data) {
      console.log(data);
      if (data && data['code'] === 200 && data['data']) {
        createSuggestionList(data['data']);
      } else {
        // show_dialog({
        //   title: '温馨提示',
        //   content: data && data['message'] || '接口错误！',
        //   btnText: '确定',
        //   btnCb: function(closeMask) {
        //     closeMask();
        //   }
        // });
      }
    },
    error: function(err) {
      console.log(err);
      // show_dialog({
      //   title: '温馨提示',
      //   content: '接口错误！',
      //   btnText: '确定',
      //   btnCb: function(closeMask) {
      //     closeMask();
      //   }
      // });
    },
  })
}())