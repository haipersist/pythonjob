// pythonjob.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   jobs:{}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJobList()
  },
  getJobList: function () {
    var that = this
    wx.request({
      url: app.globalData.basejob + '/api/jobs/',
      header: { 'Content-type': 'json' },
      success: function (resp) {
      var temp_jobs = []
       var jobs = resp.data.results
       for (var index in jobs) {
         var job = jobs[index]
         var welfare = job.welfare
         if (welfare.length>10) {
           welfare = welfare.substring(0,10) + '...'
         } else if (welfare.length==0) {
           welfare = '北京'
         }
         var title = job.title
         if (title.length>13) {
           title=title.substring(0,13) + '...'
         }
         var temp = {}
         temp = {
           requirement:job.requirement,
           welfare:welfare,
           company:job.company_name,
           salary:job.salary,
           pub_time:job.pub_time,
           title:title,
           id:job.id,
           companyid:job.company_id
         }
          temp_jobs.push(temp)
       }
       that.setData({
         jobs:temp_jobs
       })
      }
    })
  },
  getJobDetail:function(event) {
    var jobid = event.currentTarget.dataset.jobid
    wx.navigateTo({
      url: 'jobdetail/jobdetail?id='+jobid,
    })
  },
  getComDetail:function(event) {
    var companyid = event.currentTarget.dataset.companyid
    wx.navigateTo({
      url: 'comdetail/comdetail?id=' + companyid,
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