$(function () {
  //初始化公共参数
  let perpage = 10
  let page = 1
  //   请求地址：/admin/comment/search
  // 请求方式：get
  // 请求参数：
  // |  名称   |  类型  | 说明                          |
  // |  page   | number | 当前页，为空返回第1页         |
  // | perpage | number | 每页显示条数，为空默认每页6条 |
  //封装查询评论过程函数
  function commEnt() {
    $.ajax({
      type: "get",
      url: urls.comment_search,
      data: {
        perpage: perpage,
        page: page
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.code === 200) {
          const commArr = template('t_search', response.data)
          $('tbody').html(commArr)
          //获取总页数
          let totl = response.data.totalPage
          // console.log(totl);

          Pagination(totl, page)
        }
      }
    });
  }
  //打开页面主动调用渲染页面
  commEnt()

  //封装分页器 开放两个参数
  function Pagination(totalPages, startPage) {
    //动态分页 需要先销毁在创建新的
    $('#pagination-demo').twbsPagination('destroy')
    //创建新分页
    $('#pagination-demo').twbsPagination({
      //总页数
      totalPages: totalPages,
      //可见页数
      visiblePages: 7,
      //当前页
      startPage: startPage,
      first: ' 首页',
      prev: '上一页',
      next: '下一页',
      last: '尾页',
      // 点击事件回调,分页器会自动触发当前页
      onPageClick: function (event, currentPage) {
        page = currentPage
        //不触发当前页
        if (currentPage != startPage) {
          commEnt()
        }

      }
    })
  }


  //评论通过
  //   请求地址：/admin/comment/pass
  // 请求方式：post
  // 请求参数：
  // | 名称 | 类型   | 说明   |
  // | id   | number | 评论id |
  // 返回数据：
  // | 名称 |  类型  | 说明                              |
  // | msg  | string | 文字信息  ‘设置成功’   ‘设置失败’ |

  $('tbody').on('click', '.btn-info', function () {
    //获取评论id
    let id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
      type: "post",
      url: urls.comment_pass,
      data: {
        id: id
      },
      dataType: "json",
      success: function (response) {
        // console.log(response);
        if (response.code === 200) {
          // alert(response.msg)
          $('.modal').modal();
          $('.modal-body p').html(response.msg);
          commEnt()
        }

      }
    });

  })
  //评论不通过
  //   请求地址：/admin/comment/reject
  // 请求方式：post
  // 请求参数：
  // | 名称 | 类型   | 说明   |
  // | id   | number | 评论id |
  // 返回数据：
  // | 名称 |  类型  | 说明                              |
  // | msg  | string | 文字信息  ‘设置成功’   ‘设置失败’ |
  $('tbody').on('click', '.btn-warning', function () {
    //获取评论id
    let id = $(this).attr('data-id')
    $.ajax({
      type: "post",
      url: urls.comment_reject,
      data: {
        id: id
      },
      dataType: "json",
      success: function (response) {
        // console.log(response);
        if (response.code === 200) {
          $('.modal').modal();
          $('.modal-body p').html(response.msg);
          commEnt()
        }

      }
    });
  })

  //删除评论
  //   请求地址：/admin/comment/delete
  // 请求方式：post
  // 请求参数：
  // | 名称 | 类型   | 说明   |
  // | id   | number | 评论id |
  // 返回数据：
  // | 名称 |  类型  | 说明                              |
  // | msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |
  $('tbody').on('click', '.btn-danger', function () {
    //获取评论id
    let id = $(this).attr('data-id')
    let res = confirm('您是否确定要删除?')
    if (res) {
      $.ajax({
        type: "post",
        url: urls.comment_delete,
        data: {
          id: id
        },
        dataType: "json",
        success: function (response) {
          // console.log(response);
          if (response.code === 200) {
            $('.modal').modal();
            $('.modal-body p').html(response.msg);
            commEnt()
          }
        }
      });
    }

  })


})