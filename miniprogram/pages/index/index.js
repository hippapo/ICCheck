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

  onLoad: function() {
     console.log('onload');
    
    },

  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = res.result;
        app.globalData.cResult = this.show;


        console.log(app.globalData.cResult)
        wx.navigateTo({
          url: "../addFunction/addFunction?scan=" + this.show,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: "fail",
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }


  
})