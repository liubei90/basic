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

  function selectText(textbox, startIndex, stopIndex) {
    if (textbox.createTextRange) {//ie
      var range = textbox.createTextRange();
      range.collapse(true);
      range.moveStart('character', startIndex);//起始光标
      range.moveEnd('character', stopIndex - startIndex);//结束光标
      range.select();//不兼容苹果
    } else {//firefox/chrome
      textbox.setSelectionRange(startIndex, stopIndex);
      textbox.focus();
    }
  }

  function createGroupCard(userInfo) {
    var groupCardAvatar = document.querySelector('#group-card-avatar');
    var groupCardName = document.querySelector('#group-card-name');
    var serviceBtn = document.querySelector('#service-btn');
    var copyPlaceholder = document.querySelector('#copy-placeholder');
    groupCardAvatar.src = userInfo['companyUserImage'];
    groupCardName.textContent = userInfo['companyUserName'];
    var chatNo = userInfo['companyUserWechatNo'];
    copyPlaceholder.value = chatNo;

    serviceBtn.addEventListener('click', function() {
      var msg = '';
      if (chatNo) {
        copyPlaceholder.select();
        // 兼容ios选择文本
        selectText(copyPlaceholder, 0, chatNo.length);
        if (document.execCommand('copy')) {
          msg = '微信号复制成功！去联系客服入群吧';
        } else {
          msg = '微信号:' + chatNo + ' 去联系客服入群吧';
        }
        copyPlaceholder.blur();
      } else {
        msg = '微信号获取异常！';
      }

      if (msg) {
        show_dialog({
          title: '温馨提示',
          content: msg,
          btnText: '确定',
          btnCb: function(closeMask) {
            closeMask();
          }
        });
      }
    });
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