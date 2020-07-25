var _dialog_tpl='<div class="dialog-container"> \
<div class="dialog-header">{title}</div> \
<div class="dialog-content">{content}</div> \
<div class="dialog-footer {btnShowStatus}"> \
  <button id="dialog-confirm-btn" class="common-btn">{btnText}</button> \
</div> \
</div>';

function show_dialog(args) {
  var title = args['title'] || '提示';
  var content = args['content'] || '';
  var btnText = args['btnText'];
  var btnCb = args['btnCb'] || function() {};

  if (!show_mask) {
    return;
  }

  var frag = document.createElement('div')
  frag.innerHTML = _dialog_tpl
                            .replace('{title}', title)
                            .replace('{content}', content)
                            .replace('{btnText}', btnText)
                            .replace('{btnShowStatus}', btnText ? '' : 'display-none');

  var dialogElm = frag.children[0];
  var btnElm = dialogElm.querySelector('#dialog-confirm-btn');
  var closeMask = null;

  btnElm.addEventListener('click', function() {
    btnCb(closeMask);
  });

  closeMask = show_mask(dialogElm, { clickMaskClose: false })
}