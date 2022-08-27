// popup.js
console.log('popup.js 正在运行。。。')

$(function(){

  // 扩展程序的 id
  var id = chrome.runtime.id

    // 发送搜索事件
    // 参考：https://developer.chrome.com/extensions/runtime#method-sendMessage 
  $('#search').click(function(e){

    var event = 'search_event'
    chrome.runtime.sendMessage({event: event}, function(request){
      console.log(request.farewall);
    });
  })
})