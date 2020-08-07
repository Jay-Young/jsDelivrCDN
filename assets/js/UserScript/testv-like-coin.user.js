// ==UserScript==
// @name         TESTV点赞投币机
// @version      1.0
// @description  为TESTV发布的视频自动点赞投币，避免遗忘而白嫖
// @author       铁丝@深表遗憾
// @match        *://*.bilibili.com/video/*
// @updateURL    https://cdn.jsdelivr.net/gh/Jay-Young/jsDelivrCDN@master/assets/js/UserScript/testv-like-coin.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/Jay-Young/jsDelivrCDN@master/assets/js/UserScript/testv-like-coin.user.js
// @supportURL   https://github.com/Jay-Young/jsDelivrCDN/issues
// @homepage     https://github.com/Jay-Young/jsDelivrCDN/tree/master/assets/js/UserScript
// @grant        none
// @icon         https://www.bilibili.com/favicon.ico
// @note         根据兰州小红鸡提供的脚本(http://js.idealli.com/bilibili.js)修改，在此感谢
// ==/UserScript==

(function() {
    if (document.getElementsByClassName('username')[0].innerText == 'TESTV官方频道') {
        var T = 10000; // 考虑到性能和网络因素，10秒后投币点赞
        setTimeout(function(){
            // 获取今日投币情况
            var httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', 'https://www.bilibili.com/plus/account/exp.php', true);
            httpRequest.send();//第三步：发送请求  将请求参数写在URL中

            //获取数据后的处理程序
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    var json = httpRequest.responseText;//获取到json字符串，还需解析
                    var today = JSON.parse(json).number;
                    console.log("今日已投币：", today);
                    document.getElementsByClassName("coin")[0].click();
                    setTimeout(function(){
                        document.getElementsByClassName("bi-btn")[0].click();
                    }, 200);
                }
            };
        }, T)
    }
})();