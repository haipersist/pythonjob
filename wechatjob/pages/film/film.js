// film.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing:{},
    coming:{},
    top:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    var playingurl = app.globalData.basedouban + '/v2/movie/in_theaters'+'?start=0&count=3'
    var comingurl = app.globalData.basedouban + '/v2/movie/coming_soon' + '?start=0&count=3'
    var topurl = app.globalData.basedouban + '/v2/movie/top250' + '?start=0&count=3'
    this.getFilmList(playingurl,'playing','正在热映')
    this.getFilmList(comingurl,'coming', '即将上映')
    this.getFilmList(topurl, 'top', '排行榜')
  },
  getFilmList: function (url,filmcategory,subtitle) {
    var that = this;
    wx.request({
      url: url,
      header: {'Content-type':'json'},
      success: function(resp) {
         var subjects = resp.data.subjects
         var movies = []
         for (var index in subjects) {
            var subject = subjects[index]
            var title = subject.title
            if (title.length>6) {
              title = title.substring(0,6) + '...'
            }
            var temp = {}
            temp = {
              title:title,
              movieid:subject.id,
              movieimgUrl:subject.images.large,
              rate:subject.rating.average
            }
            movies.push(temp)
        }
      var readydata = {}
      readydata[filmcategory] = {
        subtitle: subtitle,
        movies: movies
      }
      that.setData(readydata)
      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {

      }
    })

  },
  getMovieDetail: function(event) {
    var movieid = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'filmdetail/filmdetail?id='+movieid,
    })
  },
  getMoreMovie: function(event){
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'morefilm/morefilm?category=' + category,
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