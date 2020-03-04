$(function () {
  //获取下拉框内容
  $.ajax({
    type: "get",
    url: urls.categor_list,
    dataType: "json",
    success: function (response) {
      if (response.code === 200) {
        const editArr = template('scEdit', response);
        $('.category').html(editArr)
      }
    }
  });


  //获取地址栏后面的参数
  const seUrl = location.search
  // console.log(seUrl);?id=
  //截取等号后面的数据
  // const id = seUrl.slice(4)
  const id = seUrl.split('=')[1]
  // console.log(id);


  //初始化时间插件
  jeDate("#myData", {
    // //是否初始化事件
    // isinitVal: true,
    format: "YYYY-MM-DD "
  });


  //初始化编辑器
  tinymce.init({
    //选择器
    selector: '#mytextarea',
    //语言
    language: 'zh_CN',
    //对齐方式 默认右对齐
    directionality: 'ltr',
    //高度
    height: 300,
    //浏览器单词拼写
    browser_spellcheck: true,
    //右键菜单
    contextmenu: false,
    //自带插件
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table contextmenu paste imagetools wordcount",
      "code"
    ],
    //工具栏
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",

  });

  //如果直接打开编辑页面
  if (id === undefined) {
    alert('页面没有id,跳转到首页')
    location.href = './index.html'
  }

  //获取数据并渲染页面
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
        $('#myData').val(response.data.date)//日期
        // $('#mytextarea').val(response.data.content)//内容
        $('.category').val(response.data.categoryId)//类别
        //因为富文本编辑器加载比较慢,所以需要等富文本加载完后再设置内容
        setTimeout(function () {
          tinymce.activeEditor.setContent(response.data.content)
        }, 500)
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


  //封装修改文章过程函数 开放两个形参 that用于传局部的this
  function getEdit(that, state) {
    //获取富文本内容
    const str = tinymce.activeEditor.getContent()
    // console.log(str);
    // 请求地址：/admin/article/edit
    // 请求方式：post
    // 请求参数：
    // | 名称       | 类型   | 说明                            |
    // | id         | number | 文章id                          |
    // | title      | string | 文章标题                        |
    // | cover      | file   | 文章封面图片(可以为空)          |
    // | categoryId | number | 文章类型id                      |
    // | date       | string | 日期                            |
    // | content    | string | 文章内容                        |
    // | state      | string | 已发布，草稿 （为空默认为草稿） |
    // 返回数据：
    // | 名称 |  类型  | 说明                              |
    // | msg  | string | 文字信息  ‘修改成功’   ‘修改失败’ |
    //FormData 能序列化的参数标签身上需要有name属性与后端接口所需参数名一致 序列化当前点击的表单
    const fd = new FormData(that.form)
    //不在表单中的数据需要自己添加
    fd.append('id', id)
    fd.append('state', state)
    fd.append('content', str)
    $.ajax({
      type: "post",
      url: urls.article_edit,
      //fd本身就是对象不需要加{}
      data: fd,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        // console.log(response);
        if (response.code === 200) {
          // alert('修改成功')
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
  //修改按钮
  $('.btn-edit').click(function (e) {
    e.preventDefault();
    getEdit(this, '已发布')
  });

  //存为草稿
  $('.btn-draft').click(function (e) {
    e.preventDefault();
    getEdit(this, '')
  });


})