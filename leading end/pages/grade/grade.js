var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    cid: "",
    tid:"",
    xq:"",
    cname:"",
    uid:"",
    username:"",
    xf:"",
    ss:[]
  },
setCid:function(e){ 
  this.setData({
    cid: e.detail
  })
},
setCname:function(e){ 
  this.setData({
    cname: e.detail
  })
},
setTid:function(e){ 
  this.setData({
    tid: e.detail
  })
},
setXq:function(e){ 
  this.setData({
    xq: e.detail
  })
},
setUid:function(e){ 
  this.setData({
    uid: e.detail
  })
},
setUsername:function(e){ 
  this.setData({
    username: e.detail
  })
},
setXf:function(e){ 
  this.setData({
    xf: e.detail
  })
},
search:function(){
    var cid = this.data.cid
    var tid = this.data.tid
    var xq = this.data.xq
    var cname = this.data.cname
    var uid = this.data.uid
    var username = this.data.username
    var xf = this.data.xf
    var that = this
    console.log(cid)
    console.log(tid)
    console.log(xq)
    wx.request({
      url: 'http://127.0.0.1:8000/grademanage/',
      data: {
        cid: cid,
        tid:tid,
        xq:xq,
        cname:cname,
        username:username,
        uid:uid,
        xf:xf
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
  setScore: function (e) {
    var s=this.data.ss
    console.log(e.target.dataset.tid)
    console.log(e.target.dataset.uid)

    s.push({uid:e.target.dataset.uid,tid:e.target.dataset.tid,xq:e.target.dataset.xq,cid:e.target.dataset.cid,score:e.detail.value})
    this.setData({
      ss:s
    })
    
    console.log(this.data.ss)
  

  },

  submit: function () {
    var that = this
   
    
    wx.request({
      url: 'http://127.0.0.1:8000/changescore/',
      data: {
        ss:this.data.ss
      },
      method: 'POST',
    
      success: function (res) {
        if (res.data['status'] == true) {
          wx.showModal({
            title: "提交成功！！"
          })
          that.search()
        }
      }
    })
  },
  gradeupdate:function(){
      wx.request({
        url: 'http://127.0.0.1:8000/update/',
        method:'POST',
        success:function(res){
          wx.showModal({
            title: "更新成功！！"
          })
        }
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