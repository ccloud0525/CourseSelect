
// pages/openCourse/openCourse.js
var app = getApp()


Page({
  properties: {
    // 设置显示的波浪数量，只有1和2两个值
    waveNum: {
      type: Number,
      value: 1
    },
    // 动画运行状态
    waveStatus: {
      type: Boolean,
      value: true
    },
    // 波浪颜色
    background: {
      type: String,
      value: '#3b87dd'
    }
  },
  /**
 * 页面的初始数据
 */
  data: {
    tid:"",
    cname: "",
    time: "",
    volumn: "",
    xf: "",
    desc: "",
    id:"",
    address:""

  },
  
  /**
 * 设置一系列变量
 */
setTid:function(e){
  this.setData({ tid: e.detail })
  console.log(this.data.tid)
},
  setName: function (e) {
    this.setData({ cname: e.detail })
    console.log(this.data.cname)
  },
  setTime: function (e) {
    this.setData({ time: e.detail })
    console.log(this.data.time)
  },
  setAddress: function (e) {
    this.setData({ address: e.detail })
    console.log(this.data.address)
  },
  setXuefen: function (e) {
    this.setData({ xf: e.detail })
    console.log(this.data.xf)
  },
  setNum: function (e) {
    this.setData({ volumn: e.detail })
    console.log(this.data.volumn)
  },
  setDesc: function (e) {
    this.setData({ desc: e.detail })
    console.log(this.data.desc)
  },
  /**
   * 开课按钮
   */
change:function(e){
    var tid=this.data.tid
    var time = this.data.time
    var xuefen = this.data.xf
    var num = this.data.volumn
    var desc = this.data.desc
    var address= this.data.address
    var cname = this.data.cname
   var otid = this.data.tid
      wx.request({
        url: 'http://127.0.0.1:8000/change/',
        data:{
          time:time,
          xf:xuefen,
          cname:cname,
          desc:desc,
          volumn:num,
          tid:tid,
          address:address,
          otid:otid,
          cid:this.data.cid,
          xq:this.data.xq
        },
        method:'POST',
        success:function(res) {
          if(res.data['status']==true){
            wx.showModal({
              title: '变更成功！'
          
            })
          }
          else{
            wx.showModal({
              title: '无此老师！'
          
            })
          }
        }

      })
    
  },
  onLoad: function ( ){
    var that = this
    var cid = app.globalData.courseid
    var tid = app.globalData.tid
    var xq = app.globalData.xq
  
    wx.request({
      url: 'http://127.0.0.1:8000/Search/',
      data: {
        cid: cid,
        xq:xq,
        tid:tid
      },
      method: "POST",
      success: function (res) {
       console.log(res.data)
          that.setData({
            cname:res.data[0]['cname'],
            time:res.data[0]['time'],
            xf:res.data[0]['xf'],
            volumn:res.data[0]['num'],
            desc:res.data[0]['desc'],
            address:res.data[0]['address'],
            tid:res.data[0]['tid'],
            cid:res.data[0]['cid'],
            xq:xq

          })



        
      }
    })
},

})





// var app = getApp()

// Page({
//     /**
//      * 显示天气
//      */
//     data: {
//         username: "",
//         identity: "",
//         city: "",
//         id:"",
//         today: {},
//     },
//     onLoad: function (options) {
//         this.data.username = app.globalData.username;
//         this.data.identity = app.globalData.identity;
//         this.data.id=options.id;
//         this.loadInfo();
//         console.log(this.data.username, this.data.identity)
//     },
//     loadInfo: function () {
//         var page = this;
//         wx.getLocation({
//             type: 'gcj02',
//             success(res) {
//                 const latitude = res.latitude
//                 const longitude = res.longitude
//                 console.log(latitude, longitude);
//                 page.loadCity(latitude, longitude);
//             }
//         })
//     },
//     loadCity: function (latitude, longitude) {
//         var page = this;
//         wx.request({
//             url: 'https://api.map.baidu.com/geocoder/v2/?ak=D6WOzHaymzVVKvgiy8UbhQEznkgeK6BD&location=' +
//                 latitude + ',' + longitude + '&output=json',
//             header: {
//                 'content-type': 'application/json' // 默认值
//             },
//             success: function (res) {
//                 console.log(res.data)
//                 var city = res.data.result.addressComponent.city;
//                 city = city.replace("市", "");
//                 page.setData({
//                     city: city
//                 });
//                 page.loadWeather(city);
//             }
//         })
//     },
//     loadWeather: function (city) {
//         var page = this;
//         wx.request({
//             url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
//             header: {
//                 'content-type': 'application/json' // 默认值
//             },
//             success: function (res) {
//                 console.log(res)
//                 var future = res.data.data.forecast;
//                 var todayInfo = future.shift();
//                 var today = res.data.data;
//                 today.todayInfo = todayInfo;
//                 page.setData({
//                     today: today
//                 });
//                 console.log(today.wendu);
//             }
//         });
//     },
//     notify: function () {
//         wx.showModal({
//             title: '提示',
//             content: '您没有该项操作权限',
//         })
//     },
//  change:function(){
//   var tid=this.data.tid
//   var courseName = this.data.cname
//   var time = this.data.time
//   var xuefen = this.data.xf
//   var num = this.data.volumn
//   var desc = this.data.desc
//   var teacherName = app.globalData.username
//   if(courseName==""||time==""||xuefen==""||num==""){
//     wx.showModal({
//       title: '开课失败',
//       content: '请填写完整带*号的内容',
//     })
//   }
//   else{
//     wx.request({
//       url: 'http://127.0.0.1:8000/adOpen/',
//       data:{
//         cname:courseName,
//         time:time,
//         xf:xuefen,
//         teacher:teacherName,
//         desc:desc,
//         volumn:num,
//         tid:tid
//       },
//       method:'POST',
//       success:function(res) {
//         if(res.data['status']==true){
//           wx.showModal({
//             title: '开课成功'
        
//           })
//         }
//       }

//     })
//   }
//  },
//     /**
//      * 作者信息
//      */
//     author: function (e) {
//         wx.navigateTo({
//             url: '/pages/author/author',
//         })
//     },

//     query: function () {
//         wx.navigateTo({
//             url: '/pages/select/select',
//         })

//     }
// })