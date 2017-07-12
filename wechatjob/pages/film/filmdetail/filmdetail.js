// filmdetail.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id
    var movieurl = app.globalData.basedouban + "/v2/movie/subject/" + movieId
    this.getMovieDetail(movieurl)
  },

  getMovieDetail: function (url) {
      var that = this;
      wx.request({
        url: url,
        header: { 'Content-type': 'json' },
        success: function(resp) {
          var movie = {}
          var respdata = resp.data
          var tags = respdata.genres
         
          var actors = respdata.casts
          var actor = []
          for (var index in actors) {
            actor.push(actors[index].name)
          }
          actor = actor.join(',')
          movie = {
            title:respdata.title,
            country:respdata.countries[0],
            rate:respdata.rating.average,
            summary:respdata.summary,
            director:respdata.directors[0].name,
            img:respdata.images.large,
            tag:tags.join(','),
            actor:actor
          }
          that.setData({
            movie:movie
          })
        },
        fail: function(e) {
            console.log('fail')
        },
        complete: function(e){

        }
      })
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