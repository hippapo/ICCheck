// pages/addFunction/addFunction.js
var app = getApp();

Page({

  data: {
    result: '',
    deviceList: [],
    deviceNotFoundList: []
  },

  onLoad: function (options) {
    this.setData({ deviceList: app.globalData.cResult.split(";") })
  },

  onUnload: function (option) {
    wx.showModal({
      title: 'hahahahah',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          wx.navigateTo({
            url: "../addFunction/addFunction",
          })
          console.log('用户点击取消')
        }
      }
    })
  },

  copyCode: function() {
    var that = this;
    var show;
    var deviceIDList= new Array();
    var newDeviceList=new Array();
    var tempDeviceNotFoundList = this.data.deviceNotFoundList;
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
              duration: 3000
            })
            matchResult = true}  
        }
        if (matchResult == true) { matchResult = false } else {
          tempDeviceNotFoundList.push(this.show)
          this.setData({
            deviceNotFoundList: tempDeviceNotFoundList
          })
          wx.showToast({
            title: "Not Found " + this.show,
            icon: 'none',
            duration: 3000
          })}
        that.setData({
          tDisplay: this.show
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

