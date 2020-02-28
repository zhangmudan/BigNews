/* 沙箱模式 */
(function (w) {
    //每次ajax请求前,添加请求头
    $.ajaxSetup({
        //全局添加请求头,全局请求头不会被覆盖
        //jq 的ajax 请求头
        headers: {
            //接口文档要求,不加会返回403
            Authorization: localStorage.getItem('token')
        },
        //发送ajax请求,进度条
        beforeSend: function () {
            // 显示加载条
            NProgress.start();
        },
        //请求成功
        // success:function(){},
        //请求失败
        error: function () {
            $('.modal').modal();
            $('.modal-body p').html("数据获取失败,请重新登录!");
            // location.href = './login.html'
        },
        //请求完成
        complete: function () {
            // 隐藏加载条
            NProgress.done();
        },

    });
    //点击登录跳转到登录页
    $('.tologin').click(function () {
        location.href = './login.html';
    });
    //把接口地址封装
    //基地址
    const baseUrl = 'http://localhost:8080/api/v1';
    const urls = {
        //  用户登录
        user_login: `${baseUrl}/admin/user/login`,
        //  获取用户信息
        user_info: `${baseUrl}/admin/user/info`,
        //    获取用户详情
        user_detail: `${baseUrl}/admin/user / detail`,
        //  编辑用户信息
        user_edit: `${baseUrl}/admin/user / edit`,
        //  所有文章类别
        categor_list: `${baseUrl}/admin/category / list`,
        //  新增文章类别
        category_add: `${baseUrl}/admin/category/add`,
        //  根据id查询指定文章类别
        category_search: `${baseUrl}/admin/category/search`,
        //  编辑文章类别
        category_edit: `${baseUrl}/admin/category/edit`,
        //  删除文章类别
        category_delete: `${baseUrl}/admin/category/delete`,
        //  文章搜索
        article_query: `${baseUrl}v/admin/article/query`,
        //  发布文章
        article_publish: `${baseUrl}/admin/article/publish`,
        //  根据id获取文章信息
        article_search: `${baseUrl}/admin/article/search`,
        //  文章编辑
        article_edit: `${baseUrl}/admin/article/edit`,
        //  删除文章
        article_delete: `${baseUrl}/admin/article/delete`,
        //  获取统计数据
        data_info: `${baseUrl}/admin/data/info`,
        //  日新增文章数量统计
        data_article: `${baseUrl}/admin/data/article`,
        //  各类型文章数量统计
        data_category: `${baseUrl}/admin/data/category`,
        //  日文章访问量
        data_visit: `${baseUrl}/admin/data/visit`,
        //  文章评论搜索
        comment_search: `${baseUrl}/admin/comment/search`,
        //  评论审核通过
        comment_pass: `${baseUrl}/admin/comment/pass`,
        //  评论审核不通过
        comment_reject: `${baseUrl}/admin/comment/reject`,
        //  删除评论
        comment_delete: `${baseUrl}/admin/comment/delete`,
        //  文章搜索
        search: `${baseUrl}/index/search`,
        //  文章类型
        category: `${baseUrl}/index/category`,
        //  热点图
        hotpic: `${baseUrl}/index/hotpic`,
        //  文章热门排行
        rank: `${baseUrl}/index/rank`,
        //  最新资讯
        latest: `${baseUrl}/index/latest`,
        //  最新评论
        latest_comment: `${baseUrl}/index/latest_comment`,
        //  焦点关注 
        attention: `${baseUrl}/index/attention`,
        //  文章详细内容
        artitle: `${baseUrl}/index/artitle`,
        //  发表评论
        post_comment: `${baseUrl}/index/post_comment`,
        //  评论列表
        get_comment: `${baseUrl}/index/get_comment`,
    };
    //把局部变量添加到全局
    w.urls = urls;
})(window)