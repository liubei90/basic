(function() {
  var serviceBtn = document.querySelector('#service-btn');
  serviceBtn.addEventListener('click', function() {
    alert('复制微信');
  });

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
    alert('激活开通会员');
  });


})();