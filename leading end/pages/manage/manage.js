// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity:"",
    uid:"",
    username:"",
    password:"",
    users:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  setUid:function(e){
    this.setData({
      uid:e.detail
    })
  },
  setUsername :function(e){
    this.setData({
      username:e.detail
    })
  },
  setIdentity:function(e){
    this.setData({
      identity:e.detail
    })
  },
  setPassword:function(e){
    this.setData({
      password:e.detail
    })
  },
  search:function(){
    var uid=this.data.uid
    var username=this.data.username
    var identity = this.data.identity
    var that=this
    wx.request({
      url: 'http://127.0.0.1:8000/usersearch/',
      data:{
        uid:uid,
        username:username,
        identity:identity
      },
      method:'POST',
      success:function(res){
        if(res.data["status"]==false){
          wx.showModal({
            title: '提示',
            content: '查无此人！',
          })
          that.setData({
            users:[]
          })
        }
        else{
         that.setData({
           users:res.data
         })
        }
      }
    })
  },
  register:function(){
    var username = this.data.username
    var uid = this.data.uid
    var password = this.data.password
    var identity = this.data.identity
    var page = this
    if (page.judge(uid, username, password, identity) == false) {
      wx.request({
        url: 'http://127.0.0.1:8000/Reg/',
        data: {
          uid: uid,
          username: username,
          password: password,
          identity: identity,
        },
        method: 'POST',
        success: function (res) {
          if (res.data['status'] == true) {
            wx.showModal({
              title: '提示',
              content: '注册成功',
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '用户已存在',
            })
          }
        }


      })
    }
  },
  delete:function(){
    var uid=this.data.uid
    var username=this.data.username
    var identity = this.data.identity
    var that=this
    wx.showModal({
      title: '提示',
      content: '您将删除这些用户！',
      success:function (res) {
        if(res.confirm){
          wx.request({
            url: 'http://127.0.0.1:8000/userdelete/',
            data:{
              uid:uid,
              username:username,
              identity:identity
            },
            method:'POST',
            success:function(res){
              if(res.data["status"]==false){
                wx.showModal({
                  title: '提示',
                  content: '查无此人！',
                })
              }
              else{
                wx.showModal({
                  title: '提示',
                  content: '删除成功！',
                })
              }
            }
          })
        }
      }
    })
   
  },
  onLoad: function (options) {

  },
/**
   * 检查信息是否完整
   */
  judge: function (uid, username, password, identity) {
    var flag = false
    if (username == "") {
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
      })
      flag = true
    } else if (uid == "") {
      wx.showModal({
        title: '提示',
        content: '请输入账号',
      })
      flag = true
    } else if (password == "") {
      wx.showModal({
        title: '提示',
        content: '请输入密码',
      })
      flag = true
    } else if (identity == "") {
      wx.showModal({
        title: '提示',
        content: '请选择身份',
      })
      flag = true
    }
    return flag
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})