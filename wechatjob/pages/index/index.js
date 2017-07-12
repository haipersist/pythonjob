//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎您',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {

  },
  onLoad: function () {
    console.log('onLoad')
    console.log(app.globalData)
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
