$(function () {
  //   请求地址：/admin/article/publish
  // 请求方式：post
  // 请求参数：通过`formData`提交
  // | 名称       | 类型   | 说明                            |
  // | title      | string | 文章标题                        |
  // | cover      | file   | 文章封面图片                    |
  // | categoryId | number | 文章类型id                      |
  // | date       | string | 日期                            |
  // | content    | string | 文章内容                        |
  // | state      | string | 已发布，草稿 （为空默认为草稿） |
  // 返回数据：
  // | 名称 |  类型  | 说明                              |
  // | msg  | string | 文字信息  ‘发布成功’   ‘发布失败’ |
  $('.btn-release').click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: urls.article_publish,
      data: new FormData(this.form),
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);

      }
    });
  });
  //图片预览
  $('#inputCover').change(function () {
    // console.dir(this.files[0]);
    const files = this.files[0]
    const changeUrl = URL.createObjectURL(files)
    $('.article_cover').attr('src', changeUrl)
  })
})