var app = getApp();
Page({
  data: {
    lat: 0,
    lng: 0,
    markers: [{
      iconPath: "http://img.aipaike.com/group1/M00/10/34/Cvv7ZVlR_MuAMHrDAAAEXCQi1FU939.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50,
      title: '',
      label: {
        color: "#f00",
        content: '',
        fontSize: "30rpx",
        x: 0,
        y: -60
      }
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },


  onLoad: function (option) {

    console.log(option.lat)
    console.log(option.lng)
    console.log(option.title)

    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    

    that.setData({
      lat: option.lat,
      lng: option.lng,
      'markers[0].latitude': option.lat,
      'markers[0].longitude': option.lng,
      'markers[0].title': option.title,
      'markers[0].label.content': option.title
    });

  }
  
})