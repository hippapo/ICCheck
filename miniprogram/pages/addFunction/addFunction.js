// pages/addFunction/addFunction.js
var app = getApp();

Page({
  data: {
    deviceList: [],
    deviceNotFoundList: [],
    deviceConfirmList:[],
  },

  onLoad: function (options) {
    var nthis = this
    if(options.id != "NA"){
      wx.cloud.callFunction({
        // 云函数名称
        name: 'checkRecordDetails',
        // 传给云函数的参数
        data: {
          _id: options.id
        },

        success(res) {
          console.log(res.result)
          nthis.setData({
            deviceList : res.result.data[0].pendingList,
            deviceConfirmList: res.result.data[0].confirmList,
            deviceNotFoundList: res.result.data[0].issueList
          })

          //console.log(res.result.data[0].description) // 3
        },
        fail: console.error
      })
    }else{
    this.setData({ deviceList: app.globalData.cResult.split(";") })
    }
  },

  add0: function (m) { return m < 10 ? '0' + m : m },

  format: function (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  },


   saveRecord: function () {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'saveCheckRecords',
      // 传给云函数的参数
      data: {
        operator: app.globalData.operatorInfo,
        confirmList: this.data.deviceConfirmList,
        pendingList: this.data.deviceList,
        issueList: this.data.deviceNotFoundList,
        //savedate: new Date().gettime(),
        savedate: this.format(new Date().getTime()),
        savedatestring: new Date().getTime(),
      },
      
      success(res) {
        wx.showToast({
          title: "保存成功",
          icon: 'success',
          duration: 3000
        })
      },
      fail: console.error
    })
  },
        //console.log(res.result.data[0].description) // 3

  getDeviceInfo: function(e) {
    console.log(e.currentTarget.dataset.deviceid.split(',')[0])
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getDevicesInfo',
      // 传给云函数的参数
      data: {
        id: e.currentTarget.dataset.deviceid.split(',')[0],
      },
      success(res) {
        console.log(res.result.data.location)
        console.log(res.result.data)
        wx.navigateTo({
          url: "../deviceInfo/deviceInfo?location=" + res.result.data.location + "&name=" + res.result.data.name + "&os=" + res.result.data.os + "&pic=" + res.result.data.pic
        })
      }
    })
  },

  copyCode: function() {
    var that = this;
    var show;
    var deviceIDList= new Array();
    var newDeviceList=new Array();
    var newConfirmDeviceList = new Array();
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
            this.data.deviceConfirmList.push(this.data.deviceList[i])
            this.data.deviceList.splice(i, 1)
            newDeviceList = this.data.deviceList
            newConfirmDeviceList = this.data.deviceConfirmList
            this.setData({
              deviceList: newDeviceList, 
              deviceConfirmList: newConfirmDeviceList
            })
            wx.showToast({
              title: "Found " + this.show,
              icon: 'success',
              duration: 3000
            })
            matchResult = true
            }  
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
          title: "扫码失败了",
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {
      }
      
    })
  }
})