$(function () {
    // 给link-login绑定点击事件
    $('.link-login').on('click', function () {
        // 当点击了链接就跳转并隐藏当前的表单
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 给link-reg绑定点击事件
    $('.link-reg').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    var form = layui.form;
    var layer = layui.layer;
    // 验证表单的数据
    form.verify({
        // 看输入的密码是否符合规范密码必须6到12位，且不能出现空格
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 获取到输入的密码框里面的值
        // 通过参数获取确认密码框里面的判断比较两次输入的密码是否一样
        rePwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            // 判断两次输入的密码是否一致
            if (pwd !== value) {
                return '两次密码输入不一致!';
            };
        },
    });

    // 给注册按钮绑定提交事件
    $('#form-reg').on('submit', function (e) {
        // 阻止默认提交事件
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('注册成功,请登录!');
                // 模拟人的点击行为
                $('.link-reg').click();
            },
        });
    });

    // 给登录表单绑定提交事件
    $('#form-box').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                username: $('#form-box [name=username]').val(),
                password: $('#form-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('登陆成功!');
                // 将传递过来的token存储到本地网页中
                localStorage.setItem('token', res.token);
                // 强制跳转到index后台页面
                location.href = '/index.html';

            },
        });
    });

});