var app = getApp()

// 1、引入依赖脚本
import * as echarts from '../../ec-canvas/echarts';
// 2、进行初始化数据
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
  });
  canvas.setChart(chart);var option = {
    // title: {
    //   text: '我的成绩',
    //   textStyle:{
    //     color:'#37A2DA', //标题颜色
    //   },
    //   //标题位置调整
    //   left: 'center',
    //   top:5
    // },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],  //默认色板
  
    tooltip: { //提示框组件，用于配置鼠标点击图标时的显示框
      show: true,
      trigger: 'item',
      triggerOn:'click',
      formatter:'{b}的成绩是{c}' //点击柱体时的提示信息 
    },

    toolbox:{  //工具栏
      feature:{
        // saveAsImage:{},  //开启导出图片功能（右上角下载图标）
        // dataView:{},    //开启数据视图功能
        restore:{},  //重置
        magicType:{
          type:['bar','line'] //动态图标类型的切换
        }
      }
    },

    //图例，用于筛选series，和series配合使用
    legend:{
      top:20,
      data:['成绩','绩点'],
      //仅显示一种图例(文档没有)
      selectedMode: 'single'
    },

    // grid:{ //网格，用于控制直角坐标系的布局和大小
    //   show:true,
    //   borderWidth:10,
    //   borderColor:'pink'
    // },

    dataZoom:{  //区域缩放，对数据范围进行过滤；可配置多个区域缩放器
       type:'slider', //滑块
      //  type:'inside' //鼠标滚轮/双指
      xAxisIndex:0, //指明作用于x轴
      start:0,  //数据窗口范围的起始百分比
      end:20,
      handleSize:8
    },

    xAxis: {
      type: 'category',
      data: app.globalData.cnameList,
      //坐标轴刻度标签的相关设置 https://www.cnblogs.com/wasbg/p/11422956.html
      axisLabel:{    //修正类目项拥挤，错位
        interval:0,
        rotate:40
      }
      // show: false
    },
    yAxis: {
      type: 'value',
      // show: false
    },
    series: [
    {
      name: '成绩',
      type: 'bar',
      data: app.globalData.scoreList,
      markPoint:{
        data:[
          {
            type:'max',name:'最高成绩'
          },{
            type:'min',name:'最低成绩'
          }
        ]
      },
      markLine:{
        data:[
          {
            type:'average',name:'平均值'
          }
        ]
      },
      label:{
        show:true,
        rotate:30
      },
      barwidth:'30%'
    },

    //将成绩换算成绩点进行展示
  {
      name:'绩点',
      type:'bar',
      data:app.globalData.gradeList,
      markLine:{
        data:[
          {
            type:'average',name:'平均值'
          }
        ]
      },
      label:{
        rotate:30
      },
  }
  
  ]
  };  


  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [
    ],
    ec: {
      onInit: initChart 
    },
    cnameList:[],
    scoreList:[],
    gradeList:[],
    
  },

  onLoad: function () {
    var that = this
    /*
    var p = await new Promise((resolve,reject)=>{
      courseListCollection.where({
        uid: uid
      }).get().then(res => {
        coursesName = res.data[0].courseName
        resolve(coursesName)
      })
    })*/
    // wx.request({
    //   url: 'http://127.0.0.1:8000/showScore/',
    //   data: {
    //     userid: app.globalData.uid
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       courses: res.data
    //     })
    //     console.log(that.data.courses)
    //     that.setData({
    //       cnameList:Array.from(that.data.courses,({cname})=>cname),
    //       scoreList:Array.from(that.data.courses,({score})=>score),
    //       gradeList:Array.from(that.data.courses,({grade})=>grade),
          
    //     })
    //     app.globalData.cnameList=that.data.cnameList
    //     app.globalData.scoreList=that.data.scoreList
    //     app.globalData.gradeList=that.data.gradeList
        

    //     console.log(that.data.courses)
    //     console.log(that.data.cnameList)
    //     console.log(that.data.scoreList)
    //     console.log(that.data.gradeList)
       
       
    //   }
      
    // })
    


  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async refresh() {
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})