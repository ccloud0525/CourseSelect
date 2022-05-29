// pages/rollOfCertainCourse/rollOfCertainCourse.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用于挂载传递过来的参数。
    query: {},
    //存放所有选择该门课程的学生信息的数组
    rollList: [
      
    ],
    page: 1,
    pageSize: 10,
    //记录总条数，方便分页
    total: 0,
    //节流阀
    isloading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      //跳转过来后把导航参数保存
      query: options
    })
    this.getRollList()
  },

  getRollList(cb) {
    this.setData({
      //开启节流阀
      isloading: true
    })
    //展示loading效果
    wx.showLoading({
      title: '数据加载中...'
    })
    wx.request({
      url: "http://127.0.0.1:8000/pagesearch/",//将对应课程号和教师号放在url中传回
      method: "POST",
      //此处指定要发往服务器的数据
      data: {
        _cid:this.data.query.cid,
        _tid:this.data.query.tid,
        _xq:this.data.query.xq,
        _page: this.data.page,
        _limit: this.data.pageSize,
      },
      //成功的回调函数
      success: (res) => {
        //console.log(res)
        this.setData({
          //这个集合的值应该也是旧数据和新数据拼接
          //用展开运算符
          rollList: [...this.data.rollList, ...res.data],
          //因为这个属性名带-，因此不能用.的方式访问出来
          total: "total"//总数据条数//----
        })
      },
      complete: () => {
        //隐藏loading效果
        wx.hideLoading();
        this.setData({
          isloading: false
        });
        // wx.stopPullDownRefresh()
        //判断用户有没有传入回调函数
        //这边做了一个短路的运算，如果前面这个值存在就去调用一下这个回调函数
        //如果外界调用getRollList方法时没有传入回调函数，则cb为undefined，后面的语句不会被执行 
        cb && cb();
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
    //需要重置关键的数据
    this.setData({
      page: 1,
      rollList: [],
      total: 0
    })
    //重新发起数据请求
    //传入一个回调函数，在其中调用停止下拉刷新的方法
    //只有我们传入了回调函数，getRollList中才会调用回调函数
    this.getRollList(()=>{
      wx.stopPullDownRefresh()
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page * this.data.pageSize >= this.data.total) {
      //证明没有下一页数据了
      //返回，并在返回之前调用一个方法弹出提示框
      return wx.showToast({
        title: '数据加载完毕',
        // 不需要展示任何图标，默认展示为success（一个对勾）
        icon: 'none'
      })
    }
    //若节流阀上锁，则不进行请求处理
    if (this.data.isloading) return;
    this.setData({
      page: this.data.page + 1
    })

    this.getRollList();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})