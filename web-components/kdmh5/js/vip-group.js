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

  // 创建头像
  function createGroupCard(principalInfo) {
    var groupCard = document.querySelector('#group-card');
    var tpl = document.querySelector('#tpl-group-card');
    var img = tpl.content.querySelector('img');
    img.src = principalInfo['companyUserImage'];
    var name = tpl.content.querySelector('.card-name');
    name.textContent = principalInfo['companyUserName'];
    var level = tpl.content.querySelector('.card-level');
    level.textContent = principalInfo['name'];
    
    var cloneElm = document.importNode(tpl.content, true);
    var btn = cloneElm.querySelector('.card-btn');
    var copyPlaceholder = document.querySelector('#copy-placeholder');
    var userChatNo = principalInfo['companyUserWechatNo'];

    copyPlaceholder.value = userChatNo;
    btn.addEventListener('click', function() {
      copyPlaceholder.select();
      // 兼容ios选择文本
      selectText(copyPlaceholder, 0, userChatNo.length);
      var msg = '';
      if (document.execCommand('copy')) {
        msg = '微信号复制成功！去联系客服入群吧';
      } else {
        msg = '微信号:' + userChatNo + '去联系客服入群吧';
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
      copyPlaceholder.blur();
    })

    groupCard.innerHTML = '';
    groupCard.appendChild(cloneElm);
  }

  // 创建进度条
  function createProgress(userInfo) {
    var groupIncome = document.querySelector('#group-income');
    var tpl = document.querySelector('#tpl-group-income');
    var level = tpl.content.querySelector('.income-level-text');
    level.textContent = userInfo['name'];
    var processValue = tpl.content.querySelector('.process-value');
    processValue.style.width = (userInfo['incomeSum'] * 100 / userInfo['income']) + '%';
    var incomMoney = tpl.content.querySelector('.income-money-text');
    incomMoney.textContent = userInfo['income'];
    var incomeTotalText = tpl.content.querySelector('.income-total-text');
    incomeTotalText.textContent = userInfo['esIncome'];

    var cloneElm = document.importNode(tpl.content, true);

    if (!userInfo['income']) {
      var incomeProcess = cloneElm.querySelector('.income-process');
      incomeProcess.parentNode.removeChild(incomeProcess);
    }

    if (!userInfo['esIncome']) {
      var incomeTotal = cloneElm.querySelector('.income-total');
      incomeTotal.parentNode.removeChild(incomeTotal);
    }

    groupIncome.innerHTML = '';
    groupIncome.appendChild(cloneElm);
  }

  // 群聊等级
  function createGroupLevel(list) {
    var groupLevel = document.querySelector('#group-level');
    var tpl = document.querySelector('#tpl-group-level');
    var cloneElm = document.importNode(tpl.content, true);
    var level = cloneElm.querySelector('.group-level');

    if (Array.isArray(list)) {
      list.forEach(function(item) {
        level.appendChild(createGroupLevelSection(item));
      });
    }

    groupLevel.innerHTML = '';
    groupLevel.appendChild(cloneElm);
  }

  function createGroupLevelSection(item) {
    var tpl = document.querySelector('#tpl-group-level-section');
    var title = tpl.content.querySelector('.title-text');
    title.textContent = item['name'];
    var detail = tpl.content.querySelector('.detail');
    detail.textContent = item['content'];

    return document.importNode(tpl.content, true);
  }


  var userId = basic_utils.getUserId();

  if (!userId) {
    alert('用户信息获取失败！');
    return;
  }

  var loading = document.querySelector('#loading');

  reqwest({
    url: basic_utils.domain + '/api/H5/getVipGroupInfo?' + basic_utils.createSignQuery({ userId: userId }),
    method: 'post',
    crossOrigin: true,
    success: function(data) {
      console.log(data);
      loading.classList.remove('visible');
      if (data && data['code'] === 200 && data['data']) {
        createGroupCard(data['data']['principalInfo']);
        createProgress(data['data']['userInfo']);
        createGroupLevel(data['data']['list']);
      }
    },
    error: function(err) {
      loading.classList.remove('visible');
    },
  });
})();