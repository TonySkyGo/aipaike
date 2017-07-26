var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,  
    listDataCategory:[],//列表
    listDataCategoryChild1: [],
    listDataCategoryChild2: [],
    listDataCategoryChild3: [],
    listDataCategoryChild4: [],
    listDataBrand: [],
    listDataBrandImage:'',
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
      url: app.globalData.apkBase + '/api/product/search_wx_index_new.jhtml?channel=45',
      method: 'GET',
      success: function (res) {        that.setData({
          listDataCategory: res.data.content.searchPlatforms,
          listDataBrandImage: res.data.content.searchPlatforms[0].image,
          listDataBrand: res.data.content.searchPlatforms[0].searchPlatforms,
          listDataCategoryChild1: res.data.content.searchPlatforms[1].searchPlatforms,
          listDataCategoryChild2: res.data.content.searchPlatforms[2].searchPlatforms,
          listDataCategoryChild3: res.data.content.searchPlatforms[3].searchPlatforms,
          // listDataCategoryChild4: res.data.content.searchPlatforms[4].searchPlatforms
        })


      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
  },
  
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }  
})