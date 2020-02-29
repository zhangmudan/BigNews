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
  });
  //左侧level01高亮,排他思想
  $('.level01').click(function () {
    //不需要阻止跳转
    //高亮
    $(this).addClass('active').siblings().removeClass('active');
    //针对文章有二级菜单特殊处理,判断当前点击元素是否有level02的兄弟
    if ($(this).next().hasClass('level02')) {
      //切换显示菜单
      $(this).next().slideToggle();
      //小箭头添加类名旋转
      $(this).find('b').toggleClass('rotate0');
      //第一个li默认选中
      $(this).next().find('li').eq(0).addClass('active');
      //修复3:默认显示第一项内容,DOM对象的click 触发点击事件和默认行为
      $(this).next().find('li').eq(0).children('a')[0].click()
    } else {
      //如果点击的没有二级菜单,就应该把原本的黄色去掉
      $('.level02 li').removeClass('active');
    }
  });
  //左侧level02高亮,排他思想
  $('.level02 li').click(function () {
    // e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    //修复2:二级菜单点击对应一级菜单高亮
    $(this).parent().prev().addClass('active').siblings().removeClass('active');
  });
  //修复1:点击头部个人中心左侧个人中心高亮
  $('.user_center_link a').eq(0).click(function () {
    $('#user').addClass('active').siblings().removeClass('active');
    //如果点击的没有二级菜单,就应该把原本的黄色去掉
    $('.level02 li').removeClass('active');
  });

})