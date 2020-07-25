(function() {
  var android = window.android;
  function createAvatarSection(userInfo) {
    var tpl = document.querySelector('#tpl-avatar-section');
    var avatarSection = document.querySelector('#avatar-section');
    var img = tpl.content.querySelector('img');
    var nick = tpl.content.querySelector('.user-nick');
    img.src = userInfo['image'];
    nick.textContent = userInfo['name'];

    var cloneElm = document.importNode(tpl.content, true);
    avatarSection.innerHTML = '';
    avatarSection.appendChild(cloneElm);
  }

  function createFormSection(userInfo) {
    var formSection = document.querySelector('#form-section');
    var activateBtn = document.querySelector('#activate-btn');
    var activationCode = document.querySelector('#activation-code');
    if (userInfo['ifVip']) {
      formSection.classList.add('is-vip');
    } else {
      activateBtn.addEventListener('click', function() {
        var code = activationCode.value || '';
        code = code.trim();
        if (!code) {
          return;
        }

        loading.classList.add('visible');
        reqwest({
          url: basic_utils.domain + '/api/H5/activationVip?' + basic_utils.createSignQuery({ userId: userId, code: code }),
          method: 'post',
          crossOrigin: true,
          success: function(data) {
            console.log(data);
            loading.classList.remove('visible');
            if (data && data['code'] === 200) {
              show_dialog({
                title: '温馨提示',
                content: 'Vip会员卡开通成功',
                btnText: '确定',
                btnCb: function(closeMask) {
                  if (android && android.closeWindow) {
                    android.closeWindow();
                  }
                  closeMask();
                }
              });
            } else if (data && data['success'] === false) {
              // alert(data['message'] || '接口错误！');
              show_dialog({
                title: '温馨提示',
                content: data['message'] || 'Vip会员卡开通失败',
                btnText: '确定',
                btnCb: function(closeMask) {
                  closeMask();
                }
              })
            }
          },
          error: function(err) {
            loading.classList.remove('visible');
            console.error(err);
          },
        });
      });
    }
  }

  function createGroupCard(userInfo) {
    var groupCardAvatar = document.querySelector('#group-card-avatar');
    var groupCardName = document.querySelector('#group-card-name');
    var serviceBtn = document.querySelector('#service-btn');
    var copyPlaceholder = document.querySelector('#copy-placeholder');
    groupCardAvatar.src = userInfo['companyUserImage'];
    groupCardName.textContent = userInfo['companyUserName'];
    copyPlaceholder.value = userInfo['companyUserWechatNo'];

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

  function showIsVip(userInfo) {
    if (userInfo && userInfo['ifVip']) {
      show_dialog({
        title: '温馨提示',
        content: 'Vip会员卡开通成功',
        btnText: '确定',
        btnCb: function(closeMask) {
          if (android && android.closeWindow) {
            android.closeWindow();
          }
          closeMask();
        }
      });
    }
  }

  reqwest({
    url: basic_utils.domain + '/api/H5/getUserInfo?' + basic_utils.createSignQuery({ userId: userId }),
    method: 'post',
    crossOrigin: true,
    success: function(data) {
      console.log(data);
      if (data && data['code'] === 200 && data['data']) {
        loading.classList.remove('visible');
        // userInfo = data['data'];
        createAvatarSection(data['data']);
        createFormSection(data['data']);
        createGroupCard(data['data']);
        showIsVip(data['data']);
      } else if (data && data['success'] === false) {
        showAlert(data['message'] || '接口错误！')
      }
    },
    error: function(err) {
      loading.classList.remove('visible');
    },
  });

})();