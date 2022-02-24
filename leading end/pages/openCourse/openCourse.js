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
    cname: "",
    time: "",
    volumn: "",
    xf: "",
    desc: ""

  },
  
  /**
 * 设置一系列变量
 */
  setName: function (e) {
    this.setData({ cname: e.detail })
    console.log(this.data.cname)
  },
  setTime: function (e) {
    this.setData({ time: e.detail })
    console.log(this.data.time)
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
  handleOpen:function(e){
    var courseName = this.data.cname
    var time = this.data.time
    var xuefen = this.data.xf
    var num = this.data.volumn
    var desc = this.data.desc
    var teacherName = app.globalData.username
    if(courseName==""||time==""||xuefen==""||num==""){
      wx.showModal({
        title: '开课失败',
        content: '请填写完整带*号的内容',
      })
    }
    else{
      wx.request({
        url: 'http://127.0.0.1:8000/Open/',
        data:{
          cname:courseName,
          time:time,
          xf:xuefen,
          teacher:teacherName,
          desc:desc,
          volumn:num,
          tid:app.globalData.uid
        },
        method:'POST',
        success:function(res) {
          if(res.data['status']==true){
            wx.showModal({
              title: '开课成功'
          
            })
          }
        }

      })
    }
  }
})

