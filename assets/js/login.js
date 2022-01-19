// 入口函数
$(function () {
    //点击"去注册账号链接"
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    //点击"去登录链接"
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()

    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个叫pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致
        repwd: function (value) {
            // 
            // var pwd = $('.reg-box [name=password]').val()

            var pwd = $('.reg-box [name=password]').val()
            // console.log(pwd, "p")
            // console.log(value, 'v')
            if (pwd !== value) {
                return '两次密码不一致！'
                //未解决：密码一样依然提示密码不一致
            }
        }
    });
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        console.log('tijiao111');
        // debugger
        //首先阻止表单默认提交行为
        e.preventDefault()
        // //发起ajax请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',
            data, function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message)
                }
                // console.log('注册成功！')
                layer.msg('注册成功,请登录')
                //模拟人的点击行为
                $('#link_login').click()
            })
    })
    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg('登录失败！')
                }
                // console.log('注册成功！')
                layer.msg('登录成功')
                //将登录成功得到的token字符串保存到localstorage中
                localStorage.setItem('token', res.token)
                // console.log(res.token);
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})
