$(function () {
  //下拉框获取内容
  $.ajax({
    type: "get",
    url: urls.categor_list,
    dataType: "json",
    success: function (response) {
      if (response.code === 200) {
        const secArr = template('mySec', response.data);
        $('#selCategory').html(secArr)
      }
    }
  });
  // 请求地址：/admin/article/query
  // 请求方式：get
  // 请求参数：
  // |  名称   |  类型  | 说明 |
  // |   key   | string | 搜索关键词，可以为空，为空返回某类型所有文章 |
  // |  type   | string | 文章类型id，可以为空，为空返回所有类型文章   |
  // |  state  | string | 文章状态，草稿 ，已发布,为空返回所有状态文章 |
  // |  page   | number | 当前页，为空返回第1页 |
  // | perpage | number | 每页显示条数，为空默认每页6条 

  //文章接口所需公共参数-初始化
  let type = ''
  let state = ''
  let key = '';
  let page = 1;
  let perpage = 10;

  //获取文章数据并渲染过程封装
  function renList() {
    $.ajax({
      type: "get",
      url: urls.article_query,
      data: {
        type: type,
        state: state,
        perpage: perpage,
        page: page
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.code === 200) {
          const strArr = template('myList', response.data)
          $('tbody').html(strArr)
          //获取总页数
          let total = response.data.totalPage
          renPagination(total, page)
        }
      }
    });
  }
  //点击筛选 form表单有默认提交的行为
  $('#btnSearch').click(function (e) {
    e.preventDefault();
    //获取下拉框内容
    type = $('#selCategory').val();
    state = $('#selStatus').val();
    //需要初始化页面数据
    page = 1
    renList()
  });


  //进入页面主动触发
  $('#btnSearch').click()


  //封装分页器 totalPages 总页数 startPage 当前页数
  function renPagination(totalPages, startPage) {
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
        // $('#page-content').text('Page ' + currentPage);
        //把当前点击页赋值给公共变量中
        page = currentPage;
        // 根据当前页获取列表 点击页和当前页不一样时触发
        if (currentPage != startPage) {
          renList();
        }

      }
    });
  }

  //删除文章 数据为动态生成需要事件委托
  $('tbody').on('click', '.delete', function () {
    const res = confirm('您确定要删除吗?')
    if (res) {
      const id = $(this).attr('data-id')
      // console.log(id);
      // 请求地址：/admin/article/delete
      // 请求方式：post
      // 请求参数：
      // | 名称 | 类型   | 说明   |
      // | id   | number | 文章id |
      // 返回数据：
      // | 名称 |  类型  | 说明                              |
      // | msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |
      $.ajax({
        type: "post",
        url: urls.article_delete,
        data: {
          id: id
        },
        dataType: "json",
        success: function (response) {
          console.log(response);
          if (response.code === 204) {
            alert('删除成功')
            renList()
          }

        }
      });
    }


  })


})