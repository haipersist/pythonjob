// jobdetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jobid = options.id
    var url = app.globalData.basejob + '/api/jobs/' + jobid
    this.getJobdetail(url)
  },
  getJobdetail:function(url){
    var that = this
    wx.request({
      url: url,
      header: { 'Content-type': 'json' },
      success: function (resp) {
        var job = resp.data
        var title=job.title
        if (title.length>13) {
          title = title.substring(0,13) + '...'
        }
        that.setData({
          job:{
            title:title,
            company_addr:job.company_addr,
            company_name:job.company_name,
            id:job.id,
            pub_time:job.pub_time,
            requirement:job.requirement,
            salary:job.salary,
            title:title,
            website_homepage:job.website_homepage,
            welfare:job.welfare
          }
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