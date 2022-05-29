var app = getApp()

Page({
    /**
     * 显示天气
     */
    data: {
        username: "",
        identity: "",
        city: "",
        today: {},
    },
    onLoad: function () {
        this.data.username = app.globalData.username;
        this.data.identity = app.globalData.identity;
        this.loadInfo();
        console.log(this.data.username, this.data.identity)
    },
    loadInfo: function () {
        var page = this;
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                console.log(latitude, longitude);
                page.loadCity(latitude, longitude);
            }
        })
    },
    loadCity: function (latitude, longitude) {
        var page = this;
        wx.request({
            url: 'https://api.map.baidu.com/geocoder/v2/?ak=D6WOzHaymzVVKvgiy8UbhQEznkgeK6BD&location=' +
                latitude + ',' + longitude + '&output=json',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data)
                var city = res.data.result.addressComponent.city;
                city = city.replace("市", "");
                page.setData({
                    city: city
                });
                page.loadWeather(city);
            }
        })
    },
    loadWeather: function (city) {
        var page = this;
        wx.request({
            url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res)
                var future = res.data.data.forecast;
                var todayInfo = future.shift();
                var today = res.data.data;
                today.todayInfo = todayInfo;
                page.setData({
                    today: today
                });
                console.log(today.wendu);
            }
        });
    },
    notify: function () {
        wx.showModal({
            title: '提示',
            content: '您没有该项操作权限',
        })
    },
    admake :function(){
        var page = this
        if (this.data.identity == "student"||this.data.identity=="teacher") {
            page.notify()
        } else {
            wx.navigateTo({
                url: '../admakeCourse/admakeCourse',
            })
        }
    },
    coursemanage:function(){
        var page = this
        if (this.data.identity == "student"||this.data.identity=="teacher") {
            page.notify()
        } else {
            wx.navigateTo({
                url: '../coursemanage/coursemanage',
            })
        }
    },
    /**
     * 开课
     */
    adopen: function (e) {
        var page = this
        if (this.data.identity == "student"||this.data.identity=="teacher") {
            page.notify()
        } else {
            wx.navigateTo({
                url: '../adopenCourse/adopenCourse',
            })
        }
    },
    todelete: function (e) {
        wx.navigateTo({
            url: '../toDelete/toDelete',
        })
    },
    grade:function(){
        wx.navigateTo({
          url: '../grade/grade',
        })
    },
    manage:function(){
        wx.navigateTo({
          url: '../manage/manage',
        })
    },
    /**
     * 作者信息
     */
    author: function (e) {
        wx.navigateTo({
            url: '/pages/author/author',
        })
    },

    query: function () {
        wx.navigateTo({
            url: '/pages/select/select',
        })

    }
})