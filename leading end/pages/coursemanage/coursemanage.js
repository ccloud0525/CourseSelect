// pages/select/select.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    xf: "",
    cid: "",
    cname: "",
    xq:"",
  
  },
  notify: function () {
    wx.showModal({
      title: '提示',
      content: '您没有该项操作权限',
    })
  },
  /**
   * 
   * 选课设置 
   */
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

  /**
   * 课程查询 
   */
  search: function () {
    var xf = this.data.xf
    var cid = this.data.cid
    var cname = this.data.cname
    var xq = this.data.xq
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/tsearch/',
      data: {
        cid: cid,
        cname: cname,
        xf: xf,
        xq:xq,
      },
      method: "POST",
      success: function (res) {
        if (res.data['status'] == false) {
          wx.showModal({
            title: '提示',
            content: '没有该课程组',
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
   * 选课
   */
  tdelete: function (e) {
    if (app.globalData.identity != 'admin') {
      this.notify()
    } else {
      let cid = e.target.dataset.cid
      let xq = e.target.dataset.xq
      var that =this
      wx.showModal({
        title: '提示',
      content: '您将删除该课程！',
      success:function (res){
        if(res.confirm){
          wx.request({
            url: 'http://127.0.0.1:8000/tdelete/',
            data: {
          
              cid:cid,
              xq:xq
    
            },
            method: 'POST',
            success: function (res) {
              if(res.data['status']==true){
                wx.showModal({
                  content: '删除成功！'  
                })
                that.search()
              }
            }
          })
        }
      }
      })
      
    }
  },

  //开课
  topen: function (e) {
    if (app.globalData.identity != 'admin') {
      this.notify()
    } else {
      let cid = e.target.dataset.cid
      let xq = e.target.dataset.xq
      var that =this
      //跳转到开课页面，并携带参数
      wx.navigateTo({
        url: `/pages/adopenCourse/adopenCourse?cid=${cid}&xq=${xq}`
      })
    }
  },

  /**
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  refresh: function () {
    wx.showLoading({
      title: '请稍等',
    })
    this.search()
    wx.hideLoading()
  },
  refreshAbort: function () {
    wx.showToast({
      title: '刷新成功',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})