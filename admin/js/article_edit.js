$(function () {
  //获取下拉框内容
  $.ajax({
    type: "get",
    url: urls.categor_list,
    dataType: "json",
    success: function (response) {
      if (response.code === 200) {
        const editArr = template('scEdit', response.data);
        $('.category').html(editArr)
      }
    }
  });


  //获取地址栏后面的参数
  const seUrl = location.search
  // console.log(seUrl);?id=
  //截取等号后面的数据
  const id = seUrl.slice(4)
  // console.log(id);
  // 请求地址：/admin/article/search
  // 请求方式：get
  // 请求参数：
  // | 名称 | 类型   | 说明   |
  // | id   | number | 文章id |
  // 返回数据： 
  // | 名称       | 类型   | 说明         |
  // | id         | number | 文章id       |
  // | title      | string | 文章标题     |
  // | cover      | file   | 文章封面图片 |
  // | categoryId | number | 文章类型id   |
  // | date       | string | 日期         |
  // | content    | string | 文章内容     |
  $.ajax({
    type: "get",
    url: urls.article_search,
    data: {
      id: id
    },
    dataType: "json",
    success: function (response) {
      console.log(response);
      if (response.code === 200) {
        $('#inputTitle').val(response.data.title)//标题
        $('.article_cover').attr('src', response.data.cover)//图片
        $('.dat').text(response.data.date)//日期
        $('.content').text(response.data.content)//内容
        $('select.category').val(response.data.categoryId)//类别
      }

    }
  });
  //选择图片 图片预览
  $('#inputCover').change(function () {
    // console.dir(this);
    const file = this.files[0]
    const chaUrl = URL.createObjectURL(file)
    // console.dir(file);
    $('.article_cover').attr('src', chaUrl)
  })

})