// pages/addFunction/addFunction.js
var app = getApp();

Page({

  data: {
    result: '',
    canIUseClipboard: wx.canIUse('setClipboardData'),
    deviceList: []
  },

  onLoad: function (options) {
    this.setData({ deviceList: app.globalData.cResult.split(";") })
  },

  copyCode: function() {
    var that = this;
    var show;
    var deviceIDList= new Array();
    var newDeviceList=new Array();
    var matchResult = false;
    for (var i = 0; i < this.data.deviceList.length; i++) {
      deviceIDList[i] = "id=" + this.data.deviceList[i].split(",")[0]
    }
    //扫码点机
    wx.scanCode({
      success: (res) => {
        this.show = res.result;
        for (var i = 0; i < this.data.deviceList.length; i++) {
          if (deviceIDList[i] == this.show) {
            this.data.deviceList.splice(i, 1)
            newDeviceList = this.data.deviceList
            this.setData({
              deviceList: newDeviceList
            })
            wx.showToast({
              title: "Found " + this.show,
              icon: 'success',
              duration: 2000
            })
            matchResult = true} else { console.log("not match")}
         
          
        }
        if (matchResult == true) { matchResult = false } else {
          wx.showToast({
            title: "Not Found " + this.show,
            icon: 'none',
            duration: 2000
          })}
        that.setData({
          tDisplay: this.show
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

