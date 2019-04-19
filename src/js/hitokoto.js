import {$} from './global'

function initHitokoto() {
  $.ajax({
    url: 'https://v1.hitokoto.cn/?charset=utf-8&c=b',
    type: 'GET',
    dataType: 'JSON',
    success: function (data) {
      $('#hitokoto-text').text(data.hitokoto);
      $('#hitokoto-author').text(data.from);
      $('#hitokoto').fadeIn();
    }
  })
}
