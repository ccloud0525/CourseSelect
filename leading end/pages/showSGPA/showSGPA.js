// pages/showSGPA/showSGPA.js
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
   backgroundColor: '#e0e0db',

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      },
      
    },
    toolbox: {
      feature: {
        //小程序端好像不支持这些功能
        // dataView: { show: true, readOnly: false },
        restore: { show: true },
        // saveAsImage: { show: true }
      }
    },

    xAxis: [
      {
        type: 'category',
        //学期
        // data:['大一秋', '大一冬', '大一春', '大二秋', '大二冬', '大二春', '大三秋'],
        data: app.globalData.semestersList,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel:{    //修正类目项拥挤，错位
          interval:0,
          rotate:45
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '学分',
        min: 0,
        max: 35,
        interval: 5,
        axisLabel: {
          formatter: '{value} 分'
        }
      },
      {
        type: 'value',
        name: '绩点',
        min: 0,
        max: 4.0,
        // interval: 0.5,
        axisLabel: {
          formatter: '{value} '
        }
      }
    ],
    series: [
      {
        name: '学分',
        type: 'bar',
        // data:[30,31,25,27,26,19,18,15]
        data: app.globalData.creditsList
      },
      {
        name: '绩点',
        type: 'line',
        yAxisIndex: 1,
        // data:[3.02,3.34,3.6,3.66,3.87,3.93,3.68],
        data: app.globalData.gradesList,
        markPoint:{  
          data:[
            {
              type:'max',name:'最高绩点',
              symbol:'diamond'
            },{
              type:'min',name:'最低绩点',
              symbol:'diamond'
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
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 1,
        end: 60
      },
      {
        //实际上应该还可以双指放缩，但电脑上展示不出
        type: 'inside',
        xAxisIndex: [0],
        start: 1,
        end: 60
      },
    ],
  };  
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart //初始化
    },
    uid: app.globalData.uid,
    creditsList:[],
    gradesList:[],
    semestersList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //发送请求到后端获取数据
//       var that = this
//       wx.request({
//         url: 'http://127.0.0.1:8000/showsgpa/',
//         data: {
//           userid: app.globalData.uid
//         },
//         method: 'POST',
//         success: function (res) {
//           console.log(res.data)
//           that.setData({
//             //假设返回回来的json数组中每项都包含学期、学分和绩点。重组数据
//             gradesList:Array.from(res.data,({grade})=>grade),
//             creditsList:Array.from(res.data,({credit})=>credit),
//             semestersList:Array.from(res.data,({semester})=>semester)
  
//           })
//           app.globalData.gradesList=that.data.gradesList
//           app.globalData.creditsList=that.data.creditsList
//           app.globalData.semestersList=that.data.semestersList
  
//           console.log(that.data.gradesList)
//           console.log(that.data.creditsList)
//           console.log(that.data.semestersList)
//         }   
//   })
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