// pages/select/select.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [
    //  {cid:1,cname:"数学",teacher:"老师A",time:"三1-2",xf:4,volumn:50},
    //  {cid:2,cname:"语文",teacher:"老师B",time:"三1-2",xf:4,volumn:50},
    //  {cid:3,cname:"英语",teacher:"老师C",time:"三1-2",xf:4,volumn:50},
    //  {cid:4,cname:"化学",teacher:"老师D",time:"三1-2",xf:4,volumn:50},
    ],

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
              cid:e.target.dataset.id,
              tid:app.globalData.uid,
              xq:e.target.dataset.xq
            },
            method:'POST',
            success:function (res) {
              if(res.data['status']==true){
                wx.showModal({
                  title:'删课成功！！'
                })
                that.onLoad()
              }
            }
          })
        }
      }
    })
  },
  
  /**
   *  查看该课程选课名单
   */
  turnToRoll(e){
    var tid=app.globalData.uid
    wx.navigateTo({
      //点击”名单“按钮，跳转到课程名单页面
     
      url: `/pages/rollOfCertainCourse/rollOfCertainCourse?cid=${e.target.dataset.id}&tid=${tid}&xq=${e.target.dataset.xq}`
    })
  },

  /**
   * 跳转到课程详细页面
   */
  into_coursePage: function (e) {
  
    app.globalData.tid=app.globalData.uid
    app.globalData.xq=e.currentTarget.dataset.xq
    app.globalData.courseid=e.currentTarget.dataset.courseid
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