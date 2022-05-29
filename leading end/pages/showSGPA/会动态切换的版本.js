// pages/showSGPA/showSGPA.js
var app = getApp()


import * as echarts from '../../ec-canvas/echarts';

//echart实例，执行 initChart(e)方法后，在里面将它保存到全局变量，后面更改图标数据就可以chart.setOption（），chart.clear()等了；
let chart = null;

var optionIndex = 0;

const options = [
  makeOption('pictorialBar'),
  makeOption('bar')
];

//修改图表样式的函数
function makeOption(type){
  var option = {
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
     legend: {
       data: ['Evaporation',  'Temperature']
     },
     xAxis: [
       {
         type: 'category',
         //学期
         data: ['大一秋', '大一冬', '大一春', '大二秋', '大二冬', '大二春', '大三秋'],
         axisPointer: {
           type: 'shadow'
         },
         axisLabel:{    //修正类目项拥挤，错位
           interval:0,
           rotate:45
         }
       }
     ],
     animationDurationUpdate: 500,
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
         type: type,
         universalTransition: {
          enabled: true,
         },
         data: [
           30,31,25,27,26,19,18,15
         ]
       },
       {
         name: '绩点',
         type: 'line',
         yAxisIndex: 1,
         data: [3.02,3.34,3.6,3.66,3.87,3.93,3.68],
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
    
  return option;
}


Page({

  initChart(e){ //初始化echarts的方法
    var canvas = e.detail.canvas;
    chart = echarts.init(canvas,null,{
      width: e.detail.width,
      height: e.detail.height
    });
    canvas.setChart(chart);
    var option = options[optionIndex];
    chart.setOption(option);
  },

  /**
   * 页面的初始数据
   */
  data: {
    ec: {},
    uid: app.globalData.uid,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //发送请求到后端获取数据。。。

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setInterval(function(){
      chart.clear();
      optionIndex = (optionIndex + 1) % options.length;
      var option = options[optionIndex];
      chart.setOption(option);
    },3000)
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