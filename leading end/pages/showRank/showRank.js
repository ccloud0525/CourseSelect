// pages/showRank/showRank.js
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
    title:{
      //拼接字符串，之后改成当前排名/总人数
      text: `排名百分比：${((app.globalData.rank-1)/app.globalData.total*100).toFixed(2)}%`,
      bottom:'15%',
      left:'center',
      textStyle:{
        fontWeight:'bolder',
        fontSize:28,
        color:'#28786b'
      },
    },
    

    backgroundColor:'#e0e0db',

    tooltip: {
      formatter: '{a} \n{b} : {c}'
    },


    series: [
      {
        name: '计算机科学与工程学院',
        type: 'gauge',
        //设置各段线条颜色
        // axisLine: {
        //   lineStyle: {
        //     width: 10,
        //     color: [
        //       [0.25, '#7CFFB2'],
        //       [0.5, '#58D9F9'],
        //       [0.75, '#FDDD60'],
        //       [1, '#FF6E76']
        //     ]
        //   }
        // },
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        max: 240,
        splitNumber:10,  
        data: [
          {
            value: app.globalData.rank,
            name: '排名'
          }
        ]
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
    uid: app.globalData.uid,
    ec: {
      onInit: initChart 
    },
    //总绩点的排名
    rank:0,
    //总人数
    total:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //请求参数为学号；返回值为总绩点排名和总人数
//      wx.request({
//       url: '',
//       data: {
//         userid: app.globalData.uid
//       },
//       method: 'POST',
//       success: function (res) {
//         console.log(res.data)
//         that.setData({
//           rank:res.data.rank,
//           total:res.data.total
//         })
//         app.globalData.rank=that.data.rank
//         app.globalData.total=that.data.total

//         console.log(that.data.rank)
//         console.log(that.data.total)
//       }   
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})