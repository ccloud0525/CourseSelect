// pages/select/select.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    uid: app.globalData.uid
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
    var p = await new Promise((resolve,reject)=>{
      courseListCollection.where({
        uid: uid
      }).get().then(res => {
        coursesName = res.data[0].courseName
        resolve(coursesName)
      })
    })*/
    wx.request({
      url: 'http://127.0.0.1:8000/showScore/',
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