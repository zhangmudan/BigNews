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
  getListRender();


  //给新增按钮注册点击弹出模态框
  $('#btn_add').click(function () {
    //显示模态框
    $('#myModal').modal();
    $('.modal-footer button').eq(1).text('新增分类').attr('class', 'btn btn-success ');
  });


  //隐藏模态框时清空表单数据,方便操作
  $('#myModal').on('hide.bs.modal', function (e) {
    //$('form')[0] 转换为原生对象 reset清空表单数据
    $('form')[0].reset();
  });


  //编辑文章 元素为动态生成的所以使用事件委托
  $('table').on('click', '.btn-info', function () {
    //获取id数据
    const id = $(this).attr('data-id');
    //显示模态框
    $('#myModal').modal();
    //修改模态框样式
    $('.modal-footer button').eq(1).text('编辑').attr('class', 'btn btn-primary').attr('data-id', id);
    //获取表格内容
    const name = $(this).parents('tr').children().eq(0).text().trim()
    const slug = $(this).parents('tr').children().eq(1).text().trim()
    //添加模态框的内容
    $('form input').eq(0).val(name)
    $('form input').eq(1).val(slug)

  });



  //模态框第二个按钮绑定事件
  $('.modal-footer button').eq(1).click(function () {
    if ($(this).text().trim() == '新增分类') {
      //1.新增文章
      // 请求地址：/admin/category/add
      // 请求方式：post
      // 请求参数：
      // | 名称 | 类型   | 说明     |
      // | name | string | 类别名称 |
      // | slug | string | 别名     |
      // 返回数据：
      // | 名称 |  类型  | 说明                              |
      // | msg  | string | 文字信息  ‘增加成功’   ‘增加失败’ |
      $.ajax({
        type: "post",
        url: urls.category_add,
        data: {
          name: $('#inputEmail3').val(),
          slug: $('#inputPassword3').val(),
        },
        dataType: "json",
        success: function (response) {
          // console.log(response);
          if (response.code === 201) {
            // alert(response.msg)
            //隐藏模态框
            $('#myModal').modal('hide');
            //调用获取数据并渲染页面
            getListRender();
          }
        }
      });
    } else {
      // 2.编辑文章
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
      $.ajax({
        type: "post",
        url: urls.category_edit,
        data: {
          slug: $('form input').eq(1).val().trim(),
          name: $('form input').eq(0).val().trim(),
          id: $('.modal-footer button').eq(1).attr('data-id')
        },
        dataType: "json",
        success: function (response) {
          // console.log(response);
          if (response.code === 200) {
            //隐藏模态框
            $('#myModal').modal('hide');
            //调用获取数据并渲染页面
            getListRender();
          }
        }
      });
    }
  });


  //删除文章 元素为动态生成的所以使用事件委托
  $('table').on('click', '.btn-danger', function () {
    const res = confirm('确定删除吗?')
    if (res) {
      //获取id数据
      const id = $(this).attr('data-id');
      // 请求地址：/admin/category/delete
      // 请求方式：post  
      // 请求参数：   
      // | 名称 | 类型   | 说明   |
      // | id   | number | 文章id |     
      // 返回数据：     
      // | 名称 |  类型  | 说明                              |
      // | msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |
      $.ajax({
        type: "post",
        url: urls.category_delete,
        data: {
          id: id
        },
        dataType: "json",
        success: function (response) {
          // console.log(response);
          if (response.code === 204) {
            alert(response.msg);
            getListRender();
          }
        }
      });
    }

  });



})