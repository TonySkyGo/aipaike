// pages/categorylist/categorylist.js
var app = getApp();
let util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    isEmptyFlag:false,
    listGoodsList:false,
    flag:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let flag = options.flag;
     wx.setNavigationBarTitle({
      title: flag
    })
    util.showLoading();
    var that = this;
    const url = "https://tadmin.aipaike.com/aoksearch/api/product/search_platform_sr";
    app.httpGET(url,options,function(res){
      if(res.data.code == 0){
        util.hideLoading();
        var content =  res.data.content.content;
        that.setData({
           content:content,
           isEmptyFlag:true,
           listGoodsList:true
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // wx.setNavigationBarTitle({
    //   title: ""
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})