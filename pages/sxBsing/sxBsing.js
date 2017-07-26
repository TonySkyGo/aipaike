// pages/sxBsing/sxBsing.js
let app = getApp();
let util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sxBrands:true,
    currentItempp: -1, //筛选的切换加边框的变量
    currentItemlb: -1,
    currentItemjg: -1,
    priceArea:true,
    brandsKeyword:'',
    onecate:'',
    twocate:'',
    startprice:'',
    endprice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // debugger;
    let keyword = options.keyword;
    this.allSearchFnXsn(keyword,1,20);
  },
  allSearchFnXsn(keyword, pageNum, pageSize) {
    var that = this;
    let params = {
      keyword: keyword,
      pageNum: pageNum,
      pageSize: pageSize,
      platform: 3,
      isSameStore: true//是否是门店同款
      // category01Name: category01Name,
      // category02Name: category02Name,
      // startPrice: startPrice,
      // endPrice: endPrice
    };

    const searchUrl = 'https://tadmin.aipaike.com/aoksearch/queryNewGoodsSR';
    app.httpGET(searchUrl, params, function (res) {
      debugger;
      // debugger;
        let successCode = res.data.code;
        if (successCode == 0) {
          //筛选中的品牌
          let sxBrandsArr = res.data.content.brands;
          if (!util.isEmpty(sxBrandsArr)) {
            that.setData({
              sxBrandsArr: sxBrandsArr
            })
          }else{
            that.setData({
              sxBrands:false
            })
          }
          //筛选中的分类
          debugger


          var categorys = res.data.content.categorys;
          that.setData({
            categorys: categorys
          });

          //价格区间
          // 判断价格区间是否为空

          var priceAreas = res.data.content.priceAreas;
          if (!util.isEmpty(priceAreas)) {
            var priceAreasArr = [];

            for (var i = 0; i < priceAreas.length; i++) {
              priceAreasArr.push({
                startPrice: priceAreas[i].startPrice,
                endPrice: priceAreas[i].endPrice
              })
            }
            that.setData({
              priceAreasArr: priceAreasArr
            });
          }else{
            that.setData({
              priceArea:false
            })
          }
          util.hideLoading();
        }
      
    })
  },
  //筛选中的点击品牌进行帅选
  clickBrands(event) {
    let id = event.currentTarget.dataset.id;
    let keyword = event.currentTarget.dataset.keybrands;
    this.setData({
      currentItempp: id,
      brandsKeyword:keyword
    })
  },
  //筛选中的点击类别进行帅选
  clickCaregory(event) {
    debugger;
    let lb = event.target.dataset.lb;
    let onecate = event.currentTarget.dataset.onecate;
    let twocate = event.currentTarget.dataset.twocate;
    this.setData({
      currentItemlb: lb,
      onecate:onecate,
      twocate:twocate
    })
  },
  //筛选中的点击价格进行帅选
  clickPrice(event) {
    debugger;
    let jg = event.currentTarget.dataset.jg;
    let startprice = event.currentTarget.dataset.startprice;
    let endprice = event.currentTarget.dataset.endprice;
    this.setData({
      currentItemjg: jg,
      startprice:startprice,
      endprice:endprice
    })
  },
  //点击确定的时候
  sureSlideClose(){

    wx.navigateTo({
      url: '../searchs/searchs?sel=true&keyword='+this.data.brandsKeyword+'&category01Name='+this.data.onecate+'&category02Name='+this.data.twocate+'&startPrice='+this.data.startprice+'&endPrice='+this.data.endprice
    })
  },
  resetFn(event){
    this.setData({
      currentItempp: -1, //筛选的切换加边框的变量
      currentItemlb: -1,
      currentItemjg: -1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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