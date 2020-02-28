//目标:登录页实现
//步骤:
//1.给登录按钮绑定点击事件(注意阻止默认行为)
//2.在点击之间内部获取用户名和密码
//3.对用户输入的内容进行非空判断
//4.不为空的情况小才发生ajax请求
//5.打印
//   #### 1、用户登录
// 请求地址：/admin/user/login
// 请求方式：post
// 请求参数：
// | 名称     | 类型   | 说明            |
// | username | string | 用户名（admin） |
// | password | string | 密码(123456)    |
$(function () {
  //1.给登录按钮绑定点击事件(注意阻止默认行为)
  $(".input_sub").click(function (e) {
    e.preventDefault();
    //2.在点击之间内部获取用户名和密码
    const user = $(".input_txt")
      .val()
      .trim();
    const psd = $(".input_pass")
      .val()
      .trim();
    // 3.对用户输入的内容进行非空判断
    if (user == "" || psd == "") {
      //alert 体验糟糕,更换为模态框更加友好
      // alert("用户名或密码为空,请重新输入");
      $('.modal').modal()
      $('.modal-body p').html("用户名或密码为空,请重新输入")
    } else {
      $.ajax({
        type: "post",
        url: urls.user_login,
        data: {
          username: user,
          password: psd
        },
        dataType: "json",
        success: function (response) {
          console.log(response);
          if (response.code === 200) {
            //把返回的token通过本地存储保存起来,其他接口需要用到
            localStorage.setItem('token', response.token)
            //跳转到其他页面
            location.href = './index.html'
          } else {
            //登录失败
            $('.modal').modal()
            $('.modal-body p').html(response.msg)
          }

        }
      });
    }
  });
});