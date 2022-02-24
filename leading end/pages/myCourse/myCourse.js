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
   * 退选课程
   */
  quit: function (e) {
    /*
    let courseName = e.target.id
    courseCollection.where({
      courseName:courseName
    }).update({
      data:{
        num:_.inc(1),
      }
    })
    courseListCollection.where({
      uid:app.globalData.username
    }).update({
      data:{
        courseName:_.pull(courseName)
      }
    })
    stuListCollection.where({
      courseName:courseName
    }).update({
      data:{
        uid:_.pull(app.globalData.username)
      }
    })
    wx.showToast({
      title: '退选成功',
    })*/
    let courseid = e.target.id

    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/quit/',
      data: {
        userid: app.globalData.uid,
        courseid: courseid
      },
      method: 'POST',
      success: function (res) {
        if (res.data['status'] == true) {
          wx.showToast({
            title: '退选成功',
          })
          that.onLoad()
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

  },

  addMyCourses: function (cid) {
    /*
    var temp = []
    var prom = []
    for (var i = 0; i < coursesName.length; i++) {
      var p = new Promise((resolve,reject)=>{
        courseCollection.where({
          courseName: coursesName[i]
        }).get().then(res => {
          resolve(res.data[0])
        })
      })
      prom.push(p)
    }
    Promise.all(prom).then(res=>{
      this.setData({
        courses:res
      })
    })
    */
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/addMyCourses/',
      data: {
        cids: cid
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