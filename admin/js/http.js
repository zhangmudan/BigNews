/* 沙箱模式 */
(function (global) {
    //每次ajax请求前,添加请求头
    $.ajaxSetup({
        //全局添加请求头,全局请求头不会被覆盖
        //jq 的ajax 请求头
        headers: {
            //接口文档要求,不加会返回403
            Authorization: localStorage.getItem('token')
        },
        //发送ajax请求
        beforeSend: function () {

        },
        //请求成功
        // success:function(){},
        //请求失败
        error: function () {
            $('.modal').modal()
            $('.modal-body p').html("数据获取失败,请重新登录!")
            // location.href = './login.html'
        },
        //请求完成
        complete: function () { },

    })
    $('.tologin').click(function () {
        location.href = './login.html'
    })
})(window)