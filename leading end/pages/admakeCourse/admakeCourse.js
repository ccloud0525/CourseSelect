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
    xf: "",
    cid:"",
    xq:"",

  },
  
  /**
 * 设置一系列变量
 */
setCname:function(e){
  this.setData({ cname: e.detail })
  console.log(this.data.tid)
},
  setCid: function (e) {
    this.setData({ cid: e.detail })
    console.log(this.data.cid)
  },

  setXf: function (e) {
    this.setData({ xf: e.detail })
    console.log(this.data.xf)
  },
  setXq: function (e) {
    this.setData({ xq: e.detail })
    console.log(this.data.xq)
  },

  /**
   * 开课按钮
   */
  handleOpen:function(e){

    var cid = this.data.cid
    var cname = this.data.cname
    var xf = this.data.xf
    var xq = this.data.xq

    if(cid==""||xf==""||cname==""||xq==""){
      wx.showModal({
        title: '开课失败',
        content: '请填写完整带*号的内容',
      })
    }
    else{
      wx.request({
        url: 'http://127.0.0.1:8000/admake/',
        data:{
          cname:cname,
          xf:xf,
          cid:cid,
          xq:xq
        },
        method:'POST',
        success:function(res) {
          if(res.data['status']==true){
            wx.showModal({
              title: '开设成功！'
          
            })
          }
      
          else if(res.data['status']==false){
            wx.showModal({
              title: '课程已存在！'
            })
          }
 
        }

      })
    }
  }
})

