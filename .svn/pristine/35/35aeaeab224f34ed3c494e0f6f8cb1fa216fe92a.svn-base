var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    storeName: '',//店铺名称
    mainBusiness: '',//店铺简介
    homeImage:'',//门店背景图片
    address: '',//详细地址
    busenessHours: '',//营业时间
    telphone: '',//电话号码
    longitudeQq: '',//腾讯经度
    latitudeQq: '',//腾讯纬度
  },
  
  nearPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
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

    wx.request({//请求数据
      url: app.globalData.apkBase + '/api/product/near.jhtml?lng=' + option.lng + '&lat=' + option.lat,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (var i = 0; i < res.data.content.length; i++) {
          if (res.data.content[i].id == option.id) {

            that.setData({
              storeName: res.data.content[i].storeName,
              mainBusiness: res.data.content[i].mainBusiness,
              homeImage: res.data.content[i].homeImage,
              address: res.data.content[i].address,
              busenessHours: res.data.content[i].busenessHours,
              telphone: res.data.content[i].telphone,
              longitudeQq: res.data.content[i].longitudeQq,
              latitudeQq: res.data.content[i].latitudeQq,
            })

          }
        }


      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })

        
  }
  
  
})