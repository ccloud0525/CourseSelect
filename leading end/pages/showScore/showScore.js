// pages/select/select.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [
    //  {cid:1,cname:"数学",teacher:"老师A",time:"三1-2",xf:4,volumn:50,score:100},
    //  {cid:2,cname:"语文",teacher:"老师B",time:"三1-2",xf:4,volumn:50,score:90},
    //  {cid:3,cname:"英语",teacher:"老师C",time:"三1-2",xf:4,volumn:50,score:80},
    //  {cid:4,cname:"化学",teacher:"老师D",time:"三1-2",xf:4,volumn:50,score:70},
     
    ],
    uid: app.globalData.uid
  },

  goBack:function(){
    wx.redirectTo({
      url: '/pages/user/user',
    })
  },
  onLoad: function () {
   
    this.showscore()
    this.showsgpa()
    this.showrank()

  },
showscore:function(){
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

      that.setData({
        cnameList:Array.from(that.data.courses,({cname})=>cname),
        scoreList:Array.from(that.data.courses,({score})=>score),
        gradeList:Array.from(that.data.courses,({grade})=>grade),
        
      })

      app.globalData.cnameList=that.data.cnameList
      app.globalData.scoreList=that.data.scoreList
      app.globalData.gradeList=that.data.gradeList
    }
    
  })
},
  showsgpa:function(){
    var that = this
      wx.request({
        url: 'http://127.0.0.1:8000/showsgpa/',
        data: {
          userid: app.globalData.uid
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          that.setData({
            //假设返回回来的json数组中每项都包含学期、学分和绩点。重组数据
            gradesList:Array.from(res.data,({grade})=>grade),
            creditsList:Array.from(res.data,({credit})=>credit),
            semestersList:Array.from(res.data,({semester})=>semester)
  
          })
          app.globalData.gradesList=that.data.gradesList
          app.globalData.creditsList=that.data.creditsList
          app.globalData.semestersList=that.data.semestersList
  
          console.log(that.data.gradesList)
          console.log(that.data.creditsList)
          console.log(that.data.semestersList)
        }   
  })
},
showrank:function(){
  var that = this
  wx.request({
    url: 'http://127.0.0.1:8000/showrank/',
    data: {
      userid: app.globalData.uid
    },
    method: 'POST',
    success: function (res) {
      console.log(res.data)
      that.setData({
        rank:res.data[0].rank,
        total:res.data[0].total
      })
      app.globalData.rank=that.data.rank
      app.globalData.total=that.data.total

      console.log(that.data.rank)
      console.log(that.data.total)
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