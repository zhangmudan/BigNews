$(function () {
  //   请求地址：/admin/category/list
  // 请求方式：get
  // 请求参数：无
  // 返回数据：文章
  // | 名称 |  类型  | 说明     |
  // |  id  | number | 类别     |
  // | name | string | 类别名称 |
  // | slug | string | 别名     |
  //获取文章列表
  $.ajax({
    type: "get",
    url: urls.categor_list,
    dataType: "json",
    success: function (response) {
      // console.log(response);
      const strArr = template('list', response.data)
      $('tbody').html(strArr)
    }
  });
  $('#xinzengfenlei').click(function () {
    $('.modal').modal()

  });

  $('.add').click(function () {
    // 请求地址：/admin/category/add
    // 请求方式：post
    // 请求参数：
    // | 名称 | 类型   | 说明     |
    // | name | string | 类别名称 |
    // | slug | string | 别名     |
    // 返回数据：
    // | 名称 |  类型  | 说明                              |
    // | msg  | string | 文字信息  ‘增加成功’   ‘增加失败’ |
    const name = $('#recipient-name').val();
    const slug = $('#message-text').val();
    $.ajax({
      type: "post",
      url: urls.category_add,
      data: {
        name: name,
        slug: slug,
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        $('.modal').modal('hide')

      }
    });




  })
})