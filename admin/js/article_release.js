$(function () {
  //获取下拉框内容
  $.ajax({
    type: "get",
    url: urls.categor_list,
    dataType: "json",
    success: function (response) {
      if (response.code === 200) {
        const reletArr = template('scRelea', response);
        $('.category').html(reletArr)
      }
    }
  });
  //初始化时间插件
  jeDate("#myData", {
    // //是否初始化时间
    isinitVal: true,
    format: "YYYY-MM-DD "
  });


  //初始化编辑器
  tinymce.init({
    selector: '#mytextarea',
    language: 'zh_CN',
    directionality: 'ltr',
    height: 300,
    browser_spellcheck: true,
    contextmenu: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table contextmenu paste imagetools wordcount",
      "code"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",

  });
  //封装发布文章过程函数
  function getRele(that, state) {
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
    //获取富文本框内容
    const str = tinymce.activeEditor.getContent()
    const fd = new FormData(that.form)
    //序列化后没有的参数需要自己添加
    fd.append('content', str)
    fd.append('state', state)
    $.ajax({
      type: "post",
      url: urls.article_publish,
      data: fd,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (response) {
        // console.log(response);
        if (response.code === 200) {
          // alert(response.msg)
          $('.modal').modal();
          $('.modal-body p').html(response.msg);
          setTimeout(function () {
            // history.back() //用后退不会刷新页面
            location.href = './article_list.html'
          }, 1200)
        }

      }
    });
  }

  //发布按钮
  $('.btn-release').click(function (e) {
    e.preventDefault();
    getRele(this, '已发布')
  });
  //存为草稿
  $('.btn-draft').click(function (e) {
    e.preventDefault();
    getRele(this, '')
  });
  //图片预览
  $('#inputCover').change(function () {
    // console.dir(this.files[0]);
    const files = this.files[0]
    const changeUrl = URL.createObjectURL(files)
    $('.article_cover').attr('src', changeUrl)
  })
})