//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    show: "",
  },
  
  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        app.globalData.cResult = res.result.slice(7);
        wx.navigateTo({
          url: "../addFunction/addFunction",
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })

        wx.showToast({
          title: '扫码成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: "扫码失败",
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }
})