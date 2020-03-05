$(function () {
  //   请求地址：/admin/data/info
  // 请求方式：get
  // 请求参数：无
  // 返回数据：
  // |     名称     |  类型  | 说明         |
  // | totalArticle | number | 文章总数     |
  // |  dayArticle  | number | 日新增文章数 |
  // | totalComment | number | 总评论数     |
  // |  dayComment  | number | 日新增评论数 |
  //获取数据
  $.ajax({
    type: "get",
    url: urls.data_info,
    dataType: "json",
    success: function (response) {
      // console.log(response);
      $('.spannel em').text(response.totalArticle)
      $('.scolor01 em').text(response.dayArticle)
      $('.scolor02 em').text(response.totalComment)
      $('.scolor03 em').text(response.dayComment)
    }
  });
  //封装折线图函数
  function loadEchars(myData1, myData2) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("curve_show"));

    var data = [];
    var date = [];

    option = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        }
      },
      title: {
        left: "center",
        text: "日新增文章数"
      },

      xAxis: {
        name: "日",
        type: "category",
        boundaryGap: false,
        //x轴展示数据
        data: myData1
      },
      legend: {
        data: ["新增文章"],
        top: "40"
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none"
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {}
        },
        right: 50
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"]
      },
      series: [
        {
          name: "新增文章",
          type: "line",
          smooth: true,
          // symbol: 'none',
          sampling: "average",
          itemStyle: {
            color: "#f80"
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255,136,0,0.39)"
              },
              {
                offset: 0.34,
                color: "rgba(255,180,0,0.25)"
              },
              {
                offset: 1,
                color: "rgba(255,222,0,0.00)"
              }
            ])
          },
          //展示数据
          data: myData2
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  //封装环形图函数
  function scoEchars(myData3) {
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById("pie_show"));

    option1 = {
      title: {
        left: "center",
        text: "分类文章数量比"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "horizontal",
        x: "center",
        data: ["爱生活", "趣美味", "爱旅行", "爱电影", "爱游泳"],
        top: 30
      },
      color: ["#5885e8", "#13cfd5", "#00ce68", "#ff9565", "#20ff19"],
      series: [
        {
          name: "分类名称",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          data: myData3
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
  }

  //   请求地址：/admin/data/article
  // 请求方式：get
  //获取日增文章数.
  $.ajax({
    type: "get",
    url: urls.data_article,
    dataType: "json",
    success: function (response) {
      // console.log(response);
      if (response.code === 200) {
        const myData1 = response.date.map(function (item) {
          return item.date
        })
        const myData2 = response.date.map(function (item) {
          return item.count
        })
        loadEchars(myData1, myData2)
      }

    }
  });

  //   data: [
  //     { value: 335, name: '爱生活' },
  //     { value: 310, name: '趣美味' },
  //     { value: 234, name: '爱旅行' },
  //     { value: 135, name: '爱电影' },
  //     { value: 548, name: '爱游泳' }
  // ]
  //   请求地址：/admin/data/category
  // 请求方式：get
  //获取各类文章
  $.ajax({
    type: "get",
    url: urls.data_category,
    dataType: "json",
    success: function (response) {
      console.log(response);
      if (response.code === 200) {
        const myData3 = response.date.map(function (item) {
          return { value: item.articles, name: item.name }
        })
        // console.log(arr);
        scoEchars(myData3)
      }

    }
  });
})