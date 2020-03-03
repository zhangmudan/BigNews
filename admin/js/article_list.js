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
  //点击筛选 form表单有默认提交的行为
  $('#btnSearch').click(function (e) {
    e.preventDefault();
    let type = $('#selCategory').val();
    let state = $('#selStatus').val();
    let key = '';
    let page = 1;
    let perpage = 10;
    //获取文章数据并渲染
    $.ajax({
      type: "get",
      url: urls.article_query,
      data: {
        type: type,
        state: state,
        perpage: perpage
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.code === 200) {
          const strArr = template('myList', response.data)
          $('tbody').html(strArr)
        }
      }
    });
  });
  //主动触发
  $('#btnSearch').click()
  //分页
  // $('.pagination').on('click', 'li', function () {
  //   $(this).addClass('active').siblings().removeClass('active')
  // })


})