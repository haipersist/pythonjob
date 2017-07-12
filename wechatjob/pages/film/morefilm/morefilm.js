// morefilm.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requesturl:"",
    currentTotal:0,
    movies:{},
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category
    var url = ""
    switch(category)  {
      case "正在热映":
        url = app.globalData.basedouban + '/v2/movie/in_theaters'
        break
      case "即将上映":
        url = app.globalData.basedouban + '/v2/movie/coming_soon'
        break
      case "排行榜":
        url = app.globalData.basedouban + '/v2/movie/top250'
        break
    }
    this.data.requesturl = url
    this.getFilmList(url,category)
  },
  getFilmList: function (url) {
    var that = this;
    wx.request({
      url: url,
      header: { 'Content-type': 'json' },
      success: function (resp) {
        var subjects = resp.data.subjects
        var movies = []
        for (var index in subjects) {
          var subject = subjects[index]
          var title = subject.title
          if (title.length > 6) {
            title = title.substring(0, 6) + '...'
          }
          var temp = {}
          temp = {
            title: title,
            movieid: subject.id,
            movieimgUrl: subject.images.large,
            rate: subject.rating.average
          }
          movies.push(temp)
        }
        var currentmovies = {}
        if(!that.data.isEmpty) {
          currentmovies = that.data.movies.concat(movies)
        }else {
          currentmovies = movies
          that.data.isEmpty = false
        }
        that.setData({
          movies:currentmovies
        })
        that.data.currentTotal += 20
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {

      }
    })

  },
  getMovieDetail: function (event) {
    var movieid = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../filmdetail/filmdetail?id=' + movieid,
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
  onPullDownRefresh: function(event) {
    var url = this.data.requesturl
    this.data.currentTotal = 0
    this.data.isEmpty = true
    this.data.movies = {}
    this.getFilmList(url)
    wx.showNavigationBarLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(event) {
    var url = this.data.requesturl + '?start=' + this.data.currentTotal
    this.getFilmList(url)
    wx.showNavigationBarLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})