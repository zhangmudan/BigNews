$(function () {
  let perpage = 10
  let page = 1
  //   请求地址：/admin/comment/search
  // 请求方式：get
  // 请求参数：
  // |  名称   |  类型  | 说明                          |
  // |  page   | number | 当前页，为空返回第1页         |
  // | perpage | number | 每页显示条数，为空默认每页6条 |
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
      }
    }
  });
})