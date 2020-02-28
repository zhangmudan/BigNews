$(function () {
  //   #### 获取用户详情
  // 请求地址：/admin/user/detail
  // 请求方式：get
  // 请求参数：无
  // 返回数据：
  // |   名称   |  类型  | 说明         |
  // | username | string | 用户名称     |
  // | nickname | string | 用户昵称     |
  // |  email   | string | 用户邮箱     |
  // | userPic  | string | 用户图片地址 |
  // | password | string | 用户密码     |
  $.ajax({
    type: "get",
    url: urls.user_detail,
    dataType: "json",
    success: function (response) {
      // console.log(response);
      $('.username').val(response.data.username)
      $('.nickname').val(response.data.nickname)
      $('.email').val(response.data.email)
      $('.password').val(response.data.password)
      $('.user_pic').attr('src', response.data.userPic)
    }
  });
  //给选择文件注册change事件
  $('#exampleInputFile').change(function () {
    //获取图片信息
    // console.dir(this.files[0]);
    //获取图片缓存地址
    const changeUrl = URL.createObjectURL(this.files[0]);
    // 给图片添加缓存地址
    $('.user_pic').attr('src', URL.createObjectURL(this.files[0]))
  })
  //   #### 编辑用户信息
  // 请求地址：/admin/user/edit
  // 请求方式：post
  // 请求数据：使用formData提交
  // |   名称   |  类型  | 说明         |
  // | username | string | 用户名称     |
  // | nickname | string | 用户昵称     |
  // |  email   | string | 用户邮箱     |
  // | userPic  |  file  | 用户图片地址 |
  // | password | string | 用户密码     |
  // 返回数据：
  // | 名称 |  类型  | 说明                              |
  // | msg  | string | 文字信息  ‘修改成功’   ‘修改失败’ |
  $('#form').on('submit', function (e) {
    //阻止submit的默认跳转行为
    e.preventDefault()
    $.ajax({
      type: "post",
      url: urls.user_edit,
      //使用FormData上传数据
      data: new FormData(this),
      //禁用掉自动添加请求头
      contentType: false,
      //禁用掉自动把参数转换为字符串
      processData: false,
      dataType: "json",
      success: function (response) {
        // console.log(response);
        if (response.code === 200) {
          alert(response.msg)
        }

      }
    });
  })

})