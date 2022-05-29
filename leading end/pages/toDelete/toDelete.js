// pages/select/select.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    xf: "",
    time: "",
    teacher: "",
    cid: "",
    cname: "",
    xq:"",
    address:"",
    tid:""
  },
  setCid: function (e) {
    this.setData({
      cid: e.detail
    })
  },
  setXq: function (e) {
    this.setData({
      xq: e.detail
    })
  },
  setAddress: function (e) {
    this.setData({
      address: e.detail
    })
  },
  setCname: function (e) {
    this.setData({
      cname: e.detail
    })
  },
  setXf: function (e) {
    this.setData({
      xf: e.detail
    })
  },
  setTime: function (e) {
    this.setData({
      time: e.detail
    })
  },
  setTeacher: function (e) {
    this.setData({
      teacher: e.detail
    })
  },
  setTid: function (e) {
    this.setData({
      tid: e.detail
    })
  },
  /**
   * 退选课程
   */
  delete: function (e) {
    var that=this
    
    wx.showModal({
      title: '提示',
      content: '您将删除该课程！',
      success:function (res) {
        if(res.confirm){
          wx.request({
            url: 'http://127.0.0.1:8000/delete/',
            data:{
              cid:e.target.dataset.cid,
              xq:e.target.dataset.xq,
              tid:e.target.dataset.tid
            },
            method:'POST',
            success:function (res) {
              if(res.data['status']==true){
                wx.showModal({
                  title:'删课成功！！'
                })
                that.search()
              }
            }
          })
        }
      }
    })
  },
  change:function(e){
    app.globalData.courseid = e.currentTarget.dataset.cid
    app.globalData.xq=e.currentTarget.dataset.xq
    app.globalData.tid=e.currentTarget.dataset.tid
    wx.navigateTo({
      url: '../change/change'
    })
  },
  search: function () {
    var time = this.data.time
    var teacher = this.data.teacher
    var xf = this.data.xf
    var cid = this.data.cid
    var tid = app.globalData.uid
    var cname = this.data.cname
    var xq = this.data.xq
    var address = this.data.address
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/Search/',
      data: {
        cid: cid,
        cname: cname,
        xf: xf,
        time: time,
        teacher: teacher,
        xq:xq,
        address:address
      },
      method: "POST",
      success: function (res) {
        if (res.data['status'] == false) {
          wx.showModal({
            title: '提示',
            content: '没有该课程',
          })
        } else {
          that.setData({
            courses: res.data
          })



        }
      }
    })

  },
  /**
   * 跳转到课程详细页面
   */
  into_coursePage: function (e) {
    console.log(e.currentTarget.dataset.courseid)
    app.globalData.courseid = e.currentTarget.dataset.courseid
    app.globalData.xq=e.currentTarget.dataset.xq
    app.globalData.tid=e.currentTarget.dataset.tid
    
    wx.navigateTo({
      url: '../courseDetail/courseDetail',
    })
  },
  onLoad: function () {


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