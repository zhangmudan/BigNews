$(function () {
  //   请求地址：http://localhost:8080/api/v1/admin/user/info
  // 请求方式：get
  // 请求参数：无
  // 返回数据：
  // |   名称   |  类型  | 说明         |
  // | nickname | string | 用户昵称     |
  // | userPic  | string | 用户图片地址 |
  //用户信息
  $.ajax({
    type: "get",
    url: urls.user_info,
    //jq 的ajax 请求头
    // headers: {
    //   //接口文档要求,不加会返回403
    //   Authorization: localStorage.getItem('token')
    // },
    dataType: "json",
    success: function (response) {
      // console.log(response);
      if (response.code === 200) {
        //获取用户头像
        const userPic = response.data.userPic
        //获取用户名
        const userName = response.data.nickname
        //并集选择器,同时选择左边和右上角图片
        $('.user_info img,.user_center_link img').attr({ src: userPic })
        //右上角头像
        // $('.user_center_link img').attr({ src: userPic })
        //用户名
        $('.user_info strong').html(userName)
      }
    }
  });
  //退出登录
  $('.logout').click(function () {
    //删除本地的token
    localStorage.removeItem('token')
    //退出后跳转到登录页
    location.href = './login.html'
  })
})