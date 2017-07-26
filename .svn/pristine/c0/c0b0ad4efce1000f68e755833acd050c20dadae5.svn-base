//index.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    evaluateAll:[],//全部
    evaluateWell:[],//好评
    evaluateSo:[],//中评
    evaluateBad:[],//差评
    evaluatePic:[],//有图
    averageScore:'',//综合评分
    productScore:'',//描述
    serviceScore:'',//服务
    shippingScore:''//物流
  },
  onLoad: function (options) {
    var that = this;

    var url = "https://test.aipaike.com/api/product/getReviewPage.jhtml";
    var dataAll = { //全部
      type: 4,
      pageNumber: 1,
      pageSize: 10,
      goodsId: options.spuId,
    }
    app.httpGET(url, dataAll, function (res) {
      that.setData({
        evaluateAll: res.data.content.reviewList,
        averageScore:res.data.content.averageScore,
        productScore: res.data.content.productScore,
        serviceScore: res.data.content.serviceScore,
        shippingScore: res.data.content.shippingScore,
      })
    }, "GET");
    var dataWell = { //好评
      type: 0,
      pageNumber: 1,
      pageSize: 10,
      goodsId: options.spuId,
    }
    app.httpGET(url, dataWell, function (res) {
      
      that.setData({
        evaluateWell: res.data.content.reviewList,
      })
    }, "GET");  
    var dataSo = { //中评
      type: 1,
      pageNumber: 1,
      pageSize: 10,
      goodsId: options.spuId,
    }
    app.httpGET(url, dataSo, function (res) {

      that.setData({
        evaluateSo: res.data.content.reviewList,
      })
    }, "GET");  
    var databad = { //差评
      type: 2,
      pageNumber: 1,
      pageSize: 10,
      goodsId: options.spuId,
    }
    app.httpGET(url, databad, function (res) {
  
      that.setData({
        evaluateBad: res.data.content.reviewList,
      })
    }, "GET");  
    var datapic = { //有图
      type: 3,
      pageNumber: 1,
      pageSize: 10,
      goodsId: options.spuId,
    }
    app.httpGET(url, datapic, function (res) {
      
      that.setData({
        evaluatePic: res.data.content.reviewList,
      })
    }, "GET");  
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