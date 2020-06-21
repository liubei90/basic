(function() {
  var activateBtn = document.querySelector('#activate-btn');
  var activationCode = document.querySelector('#activation-code');
  activateBtn.addEventListener('click', function() {
    alert(activationCode.value);
  });
  

  var serviceBtn = document.querySelector('#service-btn');
  serviceBtn.addEventListener('click', function() {
    alert('复制微信');
  });
})();