//每次调用$.ajax及post或get函数的时候，会先调用下列函数，可以拿到
//给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})