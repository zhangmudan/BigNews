$(function () {
  //   请求地址：/admin/category/list
  // 请求方式：get
  // 请求参数：无
  // 返回数据：文章
  // | 名称 |  类型  | 说明     |
  // |  id  | number | 类别     |
  // | name | string | 类别名称 |
  // | slug | string | 别名     |
  //封装获取文章列表并渲染页面
  function getListRender() {
    $.ajax({
      type: "get",
      url: urls.categor_list,
      dataType: "json",
      success: function (response) {
        // console.log(response);
        //调用模板渲染页面
        const strArr = template('list', response.data)
        $('tbody').html(strArr)
      }
    });
  }
  //调用加载页面
  getListRender()
  //给新增按钮注册点击弹出模态框
  $('#btn_add').click(function () {
    //显示模态框
    $('#myModal').modal()
    const str = $(this).text()
    $('.modal-footer button').eq(1).text(str).attr('class', 'btn btn-success ')

  });
  //隐藏模态框时清空表单数据,方便操作
  $('#myModal').on('hide.bs.modal', function (e) {
    //$('form')[0] 转换为原生对象 reset清空表单数据
    $('form')[0].reset()
  })
  //点击新增添加文章
  $('.modal-footer button').eq(1).click(function () {
    // 请求地址：/admin/category/add
    // 请求方式：post
    // 请求参数：
    // | 名称 | 类型   | 说明     |
    // | name | string | 类别名称 |
    // | slug | string | 别名     |
    // 返回数据：
    // | 名称 |  类型  | 说明                              |
    // | msg  | string | 文字信息  ‘增加成功’   ‘增加失败’ |
    const name = $('#inputEmail3').val();
    const slug = $('#inputPassword3').val();
    $.ajax({
      type: "post",
      url: urls.category_add,
      data: {
        name: name,
        slug: slug,
      },
      dataType: "json",
      success: function (response) {
        // console.log(response);
        if (response.code === 201) {
          // alert(response.msg)
          //隐藏模态框
          $('#myModal').modal('hide')
          //调用获取数据并渲染页面
          getListRender()
        }


      }
    });

    //编辑文章
    $('.text-center a').eq(0).click(function () {
      console.log($(this).attr('data-id'));

      $('#myModal').modal()
      const str = $(this).text()
      $('.modal-footer button').eq(1).text(str).attr('class', 'btn btn-primary')
      // 请求地址：/admin/category/edit
      // 请求方式：post
      // 请求参数：
      // | 名称 | 类型   | 说明     |
      // | id   | number | 类别id   |
      // | name | string | 类别名称 |
      // | slug | string | 别名     |
      // 返回数据：
      // | 名称 |  类型  | 说明                              |
      // | msg  | string | 文字信息  ‘编辑成功’   ‘编辑失败’ |
    })
    //删除文章
    // $('.category_table>tbody ').on('click', '.text-center .del', function () {
    //   // 请求地址：/admin/category/delete
    //   // 请求方式：post  
    //   // 请求参数：   
    //   // | 名称 | 类型   | 说明   |
    //   // | id   | number | 文章id |     
    //   // 返回数据：     
    //   // | 名称 |  类型  | 说明                              |
    //   // | msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |
    //   $.ajax({
    //     type: "post",
    //     url: urls.category_delete,
    //     data: {
    //       id: $(this).attr('data-id')
    //     },
    //     dataType: "json",
    //     success: function (response) {
    //       console.log(response);
    //        getListRender()

    //     }
    //   });

    // })
    //监听模态框显示
    // $('#myModal').on('show.bs.modal', function () { })




  })
})