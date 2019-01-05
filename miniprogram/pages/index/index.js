//index.js
const app = getApp()

Page({

  onLoad: function (options) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.operatorInfo = res.userInfo.nickName
            }
          })
        }
      }
    })
  },


  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    show: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },


 //bindGetUserInfo: function (e) {
  //  console.log(e.detail.userInfo)
  //},
  
  load: function(e) {
    // 调用云函数
    if (e.detail.userInfo) {
    wx.navigateTo({
      url: "../checkRecordList/checkRecordList",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    }else{}
  },


  click: function (e) {
    if(e.detail.userInfo){
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        if(res.result.indexOf("data")!=-1){
        app.globalData.cResult = res.result.slice(7);
          if (app.globalData.operatorInfo == undefined) {
            wx.getUserInfo({
              success: function (res2) {
                //console.log(res2.userInfo.nickName)
                app.globalData.operatorInfo = res2.userInfo.nickName
                //console.log(app.globalData.operatorInfo)
              }
            })
            }
        wx.navigateTo({
          url: "../addFunction/addFunction?id="+"NA",
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        

        wx.showToast({
          title: '扫码成功',
          icon: 'success',
          duration: 2000
        })
        } else {
          wx.showToast({
            title: "无效DMS二维码",
            icon: 'none',
            duration: 2000
          }) }
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
    }else{}
  }
})