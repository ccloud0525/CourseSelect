// pages/select/select.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    disable: false,
    xf: "",
    time: "",
    teacher: "",
    cid: "",
    cname: ""
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
  /**
   * 课程查询 
   */
  search: function () {
    var time = this.data.time
    var teacher = this.data.teacher
    var xf = this.data.xf
    var cid = this.data.cid
    var cname = this.data.cname
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/Search/',
      data: {
        cid: cid,
        cname: cname,
        xf: xf,
        time: time,
        teacher: teacher
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
   * 选课
   */
  select: function (e) {
    if (app.globalData.identity == 'teacher') {
      this.notify()
    } else {
      let courseid = e.target.id

      console.log(courseid)
      console.log(app.globalData.username)
      wx.request({
        url: 'http://127.0.0.1:8000/Select/',
        data: {
          uid: app.globalData.uid,
          cid: courseid,

        },
        method: 'POST',
        success: function (res) {
          if (res.data['status'] == 0) {
            wx.showModal({
              title: '提示',
              content: '禁止重复选课',
            })
          } else if (res.data['status'] == 2) {
            wx.showModal({
              title: '提示',
              content: '课程容量已满',
            })
          } else {
            wx.showModal({
              title: '选课成功！'

            })
          }
        }
      })
    }
  },
  /**
   * 跳转到课程详细页面
   */
  into_coursePage: function (e) {

    app.globalData.courseid = e.currentTarget.dataset.courseid
    console.log(app.globalData.courseid)
    wx.navigateTo({
      url: '../courseDetail/courseDetail',
    })
  },
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