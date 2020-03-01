$(function () {
  // 请求地址：/admin/article/query
  // 请求方式：get
  // 请求参数：
  // |  名称   |  类型  | 说明                                         |
  // |   key   | string | 搜索关键词，可以为空，为空返回某类型所有文章 |
  // |  type   | string | 文章类型id，可以为空，为空返回所有类型文章   |
  // |  state  | string | 文章状态，草稿 ，已发布,为空返回所有状态文章 |
  // |  page   | number | 当前页，为空返回第1页                        |
  // | perpage | number | 每页显示条数，为空默认每页6条                |

  function getArti(category, state) {
    $.ajax({
      type: "get",
      url: urls.article_query,
      data: {
        key: category,
        state: state
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        const strArr = template('myList', response.data.data)
        $('tbody').html(strArr)
      }
    });
  }
  getArti()
  //点击筛选
  // $('#btnSearch').click(function (e) {
  //   e.preventDefault();
  //   const category = $('#selCategory').val()
  //   const state = $('#selStatus').val()
  //   getArti(category, state)
  // });



})