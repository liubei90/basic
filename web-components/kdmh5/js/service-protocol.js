(function() {
  function createServiceProtocol(data) {
    var detail = document.querySelector('.detail');
    detail.innerHTML = data['content'];
  }

  var loading = document.querySelector('#loading');
  var loadingText = loading.querySelector('.loading-text');

  function showAlert(msg) {
    loading.classList.add('show-text');
    loadingText.textContent = msg;
  }


  var id = basic_utils.getSearch('id');

  reqwest({
    url: basic_utils.domain + '/api/H5/getProtocolContent?' + basic_utils.createSignQuery({ id: id }),
    method: 'post',
    crossOrigin: true,
    success: function(data) {
      console.log(data);
      if (data && data['code'] === 200 && data['data']) {
        loading.classList.remove('visible');
        createServiceProtocol(data['data']);
      } else if (data && data['success'] === false) {
        showAlert(data['message'] || '接口错误！')
      }
    },
    error: function(err) {
      loading.classList.remove('visible');
    },
  });

}());