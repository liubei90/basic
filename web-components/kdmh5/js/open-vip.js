(function() {
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