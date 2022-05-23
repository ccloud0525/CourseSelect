var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    students: [],
    cid: "",
    tid:"",
    xq:"",
    ss:[]
  },

  
  setScore: function (e) {
    var s=this.data.ss
    s.push({uid:e.target.dataset.uid,cid:e.target.dataset.cid,xq:e.target.dataset.xq,tid:e.target.dataset.tid,score:e.detail.value})
    this.setData({
      ss:s
    })
    console.log(s)
    console.log(this.data.ss)
  

  },

  submit: function (e) {
    var that = this
   
    
    wx.request({
      url: 'http://127.0.0.1:8000/submit/',
      data: {
        ss:this.data.ss
      },
      method: 'POST',
    
      success: function (res) {
        if (res.data['status'] == true) {
          wx.showModal({
            title: "提交成功！！"
          })
          that.onLoad()
        }
      }
    })
  },

  onLoad: function (options) {
    var that = this
   
    this.setData({
      cid:app.globalData.courseid,
      tid:app.globalData.tid,
      xq:app.globalData.xq
    })
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
      url: 'http://127.0.0.1:8000/type_in/',
      data: {
        cid: this.data.cid,
        tid:this.data.tid,
        xq:this.data.xq
      },
      method: 'POST',
      success: function (res) {
        
        that.setData({
          students: res.data,
          
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