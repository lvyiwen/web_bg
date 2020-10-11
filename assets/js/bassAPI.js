// 当发起 ajax请求的时候都会调用这个方法 获取到
// ajax中的所有的配置对象
$.ajaxPrefilter(function (options) {
    // 拼接url地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 拼接权限接口
    if (options.url.indexOf('/my/') !== 1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    };

    // 统一挂起
    options.complete = (function (res) {
        if (res.responseJSON === 1 && res.responseJSON === '身份认证失败!') {
            localStorage.removeItem('token');
            // 强制跳转回登录页面
            location.href = '/login.html';
        }
    })
});