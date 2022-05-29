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
    xq:"",
    time: "",
    volumn: "",
    xf: "",
    desc: "",
    address:"",
    cid:""

  },
  
  /**
 * 设置一系列变量
 */
setTid:function(e){
  this.setData({ tid: e.detail })
  console.log(this.data.tid)
},
  setCid: function (e) {
    this.setData({ cid: e.detail })
    console.log(this.data.cid)
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
  setXq: function (e) {
    this.setData({ xq: e.detail })
    console.log(this.data.xq)
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
    var tid=this.data.tid
    var cid = this.data.cid
    
    var time = this.data.time
    var xq = this.data.xq
    var num = this.data.volumn
    var desc = this.data.desc
    var teacherName = app.globalData.username
    var address=this.data.address
    if(cid==""||time==""||address==""||num==""||tid==""||xq==""){
      wx.showModal({
        title: '开课失败',
        content: '请填写完整带*号的内容',
      })
    }
    else{
      wx.request({
        url: 'http://127.0.0.1:8000/adOpen/',
        data:{
          time:time,
          teacher:teacherName,
          desc:desc,
          volumn:num,
          tid:tid,
          address:address,
          cid:cid,
          xq:xq
        },
        method:'POST',
        success:function(res) {
          if(res.data['status']==1){
            wx.showModal({
              title: '开课成功！'
          
            })
          }
          else if(res.data['status']==0){
            wx.showModal({
              title: '无此课程组！'
          
            })
          }
          else if(res.data['status']==-2){
            wx.showModal({
              title: '课程已存在！'
            })
          }
          else{
            wx.showModal({
              title: '开设失败！'
          
            })
          }
        }

      })
    }
  },

    /**
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options接收传递过来的参数对象
    console.log(options);
    this.setData({
      xq:options.xq,
      cid:options.cid
    })
  },

})

