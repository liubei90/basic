(function() {
  function createGroupCard(userInfo) {
    var groupCardAvatar = document.querySelector('#group-card-avatar');
    var groupCardName = document.querySelector('#group-card-name');
    var serviceBtn = document.querySelector('#service-btn');
    var copyPlaceholder = document.querySelector('#copy-placeholder');
    groupCardAvatar.src = userInfo['companyUserImage'];
    groupCardName.textContent = userInfo['companyUserName'];
    if (userInfo['companyUserWechatNo']) {
      serviceBtn.addEventListener('click', function() {
        copyPlaceholder.select();
        if (document.execCommand('copy')) {
          alert('微信号复制成功！');
        } else {
          alert('微信号:' + userInfo['companyUserWechatNo']);
        }
      });
    }
  }

  var serviceProtocol = document.querySelector('#service-protocol');
  serviceProtocol.addEventListener('click', function(event) {
    if (serviceProtocol.classList.contains('checked')) {
      serviceProtocol.classList.remove('checked');
    } else {
      serviceProtocol.classList.add('checked');
    }
  });

  var openBtn = document.querySelector('#open-btn');
  openBtn.addEventListener('click', function() {
    if (!serviceProtocol.classList.contains('checked')) {
      alert('请先勾选用户服务协议！');
      return;
    }
    window.location.href = window.location.href.replace('open-vip', 'activate-vip');
  });



  var userId = basic_utils.getUserId();

  if (!userId) {
    alert('用户信息获取失败！');
    return;
  }

  var loading = document.querySelector('#loading');
  var loadingText = loading.querySelector('.loading-text');
  var userInfo = null;

  function showAlert(msg) {
    loading.classList.add('show-text');
    loadingText.textContent = msg;
  }

  reqwest({
    url: basic_utils.domain + '/api/H5/getUserInfo?' + basic_utils.createSignQuery({ userId: userId }),
    method: 'post',
    crossOrigin: true,
    success: function(data) {
      console.log(data);
      if (data && data['code'] === 200 && data['data']) {
        loading.classList.remove('visible');
        createGroupCard(data['data']);
      } else if (data && data['success'] === false) {
        showAlert(data['message'] || '接口错误！')
      }
    },
    error: function(err) {
      loading.classList.remove('visible');
    },
  });
})();