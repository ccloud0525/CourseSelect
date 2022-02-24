// pages/select/select.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    uid: app.globalData.uid,
    students:[]
  },
 
  /**
   * 成绩录入
   */
  type_in:function (e) {
    app.globalData.courseid=e.target.id
    wx.navigateTo({
      url: '/pages/score/score',
    })
  },
  
  /**
   * 跳转到课程详细页面
   */
  into_coursePage: function (e) {
    console.log(e.currentTarget.dataset.courseid)
    app.globalData.courseid = e.currentTarget.dataset.courseid
    wx.navigateTo({
      url: '../courseDetail/courseDetail',
    })
  },
  onLoad: function () {
    var that = this
    /*
    wx.request({
      url: 'http://127.0.0.1:8000/getMyCourses/',
      data: {
        userid: app.globalData.uid
      },
      method: 'POST',
      success: function (res) {

        var coursesid = res.data

        wx.request({
          url: 'http://127.0.0.1:8000/addMyCourses/',
          data: {
            cids: coursesid
          },
          method: 'POST',
          success: function (res) {

            that.setData({
              courses: res.data

            })
          }
        })
      }
    })
    */
    wx.request({
      url: 'http://127.0.0.1:8000/myTeach/',
      data: {
        userid: app.globalData.uid
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          courses: res.data
        })
      }
    })

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