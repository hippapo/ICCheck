// pages/deviceInfo/deviceInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '/db/pic',
    name: 'Device Name',
    location: 'location',
    os: 'os'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var location_db = options.location
    var pic_db = options.pic
    var name_db = options.name
    var os_db = options.os

    this.setData({
      picUrl: pic_db,
      os: os_db,
      name: name_db,
      location: location_db
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