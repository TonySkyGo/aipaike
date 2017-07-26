var app = getApp();
var WxParse = require('../wxParse/wxParse.js');
let util = require('../../utils/util.js');
Page({
  data: {
    defaultSize: 30,
    /** 
      * 页面配置 
      */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0, 
    spuId:"", 
    movies: [],//商品图片
    productName:'',//商品名称
    price:'',//商城价格
    marketPrice:'',//市场价格
    couponVoPageList:[],//优惠券列表
    couponIcon:[],//优惠券图标
    countBuy: 1,//计数器
    attributeVo:[],//商品属性
    promotionVo:[],//促销列表
    promotionVoFirst:{},//促销title
    colors:[],//颜色
    sizes:[],//尺寸
    colorClicClass:100,//选择颜色
    sizeClicClass: 100,//选择尺寸
    alertName:"",//弹窗模板名
    alertMask:"none",//是否显示遮罩
    introduceList:[],//商品详情图片
    arrowCouponClassName:"packdown1",//优惠券箭头样式
    salesCouponClassName: "packup",//促销箭头样式
    choseColorAndSize: "packup",//选择颜色和尺寸样式
    evaluateClassName: "packup",//评论箭头样式
    reviewList:[],//评论列表
    reviewDate:[],//评论日期
    spuIdshopCar:'',//商品ID
    colorKey:'',//颜色key
    sizeKey:'',//尺码名称
    productId:'',//产品id
    carNum:'',//购物车数量
    maxRbateValue:'',//返利
    productVos:[],//所有鞋子
    stockBuy: '',//库存
    maxDiscount:'',//折扣
    discountPrice:'',//最高立省
    colorChoseId:'',//选择的颜色值
    sizeChoseId: '',//选择的尺码值
    colorChoseVal: '',//选择的颜色名称
    sizeChoseVal: '',//选择的尺码名称
    firstImg:'',//首张产品图片
    toTop: 'flase',
    topTo: 0,
    detailsScoll:false,
    choseSizeAndColor:'请选择尺码',
  },
  tolower:function(){
    this.setData({
      detailsScoll:true
    })
  },
  toTopButton: function () {
    this.setData({
      topTo: 0,
      toTop: 'flase'
    });
    
  },
  scrollChange: function (e) {
    
    if (e.detail.scrollTop >= 200) {
      this.setData({
        toTop: 'true'
      })
      
    }
    else {
      this.setData({
        toTop: 'false'
      })
    }
  },
  buyAndSettlement:function(e){
    //立即购买\
    wx.showToast({
      mask: true,
      title: '加载中',
      icon: 'loading'
    });
    var that = this;
    if (e.target.dataset.color == ''){
      wx.showToast({
        title: '请选择颜色',
        image: '../assets/images/warn_icon.png',
        icon: 'succes',
        duration: 2000,
        mask: true
      });
      return
    }
    if (e.target.dataset.size == '') {
      wx.showToast({
        title: '请选择尺寸',
        image: '../assets/images/warn_icon.png',
        icon: 'succes',
        duration: 2000,
        mask: true
      });
      return
    }
    var urlGetSkuidBuy = "https://test.aipaike.com/api/product/select.jhtml";
    var dataSkuidJson = {
      spuId: that.data.spuIdshopCar,
      colorSpecVal: e.target.dataset.color,
      otherSpecVal: e.target.dataset.size,
    };
    
    app.httpGET(urlGetSkuidBuy, dataSkuidJson, function (res) {
    
    that.setData({
      productId: res.data.content.productId,
    });
    
    if (res.data.content.stock >= that.data.countBuy){
      var arulBuy = "https://test.aipaike.com/api/cart/addEasyPurchaseEntrance/" + that.data.productId + "/" + that.data.countBuy + ".jhtml";
      var jsonDataShopBuy = {

      }
      
      app.httpPOST(arulBuy, jsonDataShopBuy, function (res) {
       
        if (res.data.desc == 'success') {
          wx.hideToast();
          wx.navigateTo({
            url: '../balances/balances?cartItemType=1',
          })
        }

      }, "POST");
    }
    if (res.data.content.stock < that.data.countBuy || res.data.content.stock == 0 || res.data.content.stock == null) {
      wx.showToast({
        title: '库存不足',
        icon: 'succes',
        duration: 2000,
        mask: true
      })
    }
      
      
    }, "GET");
   
  },
  jumpToCar: function () {//跳转购物车
    wx.switchTab({
      url: '../shopCarts/shopCarts',
    })
  },
  ShopCarMethod(e){
    //加入购物车
    var that = this;
    var urlGetSkuid = "https://test.aipaike.com/api/product/select.jhtml";
    var dataSkuidJson = {
      spuId: e.target.dataset.supid,
      colorSpecVal: e.target.dataset.color,
      otherSpecVal: e.target.dataset.size,
    }
    if (e.target.dataset.color == '' || e.target.dataset.size == ''){
      wx.showToast({
        title: '请选择颜色/尺寸',
        image: '../assets/images/warn_icon.png',
        icon: 'success',
        duration: 2000
      });
      return
    }
    app.httpGET(urlGetSkuid, dataSkuidJson, function (res) {

      that.setData({
        productId: res.data.content.productId,
      });
      var arul = "https://test.aipaike.com/api/cart/add.jhtml";
      var jsonDataShopCar = {
        id: that.data.productId,
        quantity: e.target.dataset.count
      }
      app.httpPOST(arul, jsonDataShopCar, function (res) {

        if (res.data.desc == "success") {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          });
          //购物车加载数据
          var cartUrl = 'https://test.aipaike.com/api/cart/listNew.jhtml';
          var data = {};
          app.httpGET(cartUrl, data, function (res) {
            if (res.data.content.totalQuantity > 99){
              res.data.content.totalQuantity = '99+'
            }
            that.setData({
              carNum: res.data.content.totalQuantity
            })


          });
        } else {
          wx.showToast({
            title: '添加失败',
            image: '../assets/images/warn_icon.png',
            icon: 'success',
            duration: 2000
          })
        }

      }, "POST");
    }, "GET");
  },
  putIntoShopCar:function(e){
    var that = this;
    var timmer = null;
    if (wx.getStorageSync('globalDataKey') == null || wx.getStorageSync('globalDataKey').javaToken == null) {
      timmer = setInterval(function () {
        app.getJavaTokenFn();
        if (wx.getStorageSync('globalDataKey') && wx.getStorageSync('globalDataKey').javaToken) {
          clearInterval(timmer);
          that.ShopCarMethod(e);
        }
      }, 800)
    } else {
      clearInterval(timmer);
      that.ShopCarMethod(e);
    }
  },
  getCoupon(event){
    //领取优惠券
    var that = this;
    var couponListGet = that.data.couponVoPageList;
    var arul = "https://test.aipaike.com/api/member/coupon/build.jhtml";
    var jsonData = { couponId: event.target.dataset.id }
    app.httpPOST(arul, jsonData, function (res) {
      console.log(res);
      if (res.data.content == "领取成功!") {
        couponListGet[event.target.dataset.idx].getNumber++;
        if (couponListGet[event.target.dataset.idx].getNumber == couponListGet[event.target.dataset.idx].claimQuantity){
          couponListGet[event.target.dataset.idx].getSelect = false;
          couponListGet[event.target.dataset.idx].getText = '已领取'
        }
        
        that.setData({
          couponVoPageList: couponListGet
        })
        wx.showToast({
          title: '领取成功!',
          icon: 'success',
          duration: 2000,
        })
      }
      if (res.data.content != "领取成功!") {
        wx.showToast({
          title: res.data.desc,
          image: '../assets/images/warn_icon.png',
          icon: 'success',
          duration: 2000,
        });
        
      }
    }, "POST");
  },
  receiveCoupon: function (event){
    var that = this;
    var timmer = null;
    if (wx.getStorageSync('globalDataKey') == null || wx.getStorageSync('globalDataKey').javaToken == null) {
      timmer = setInterval(function () {
        app.getJavaTokenFn();
        if (wx.getStorageSync('globalDataKey') && wx.getStorageSync('globalDataKey').javaToken) {
          clearInterval(timmer);
      
          that.getCoupon(event);
        }
      }, 800)
    } else {
      clearInterval(timmer);
    
      that.getCoupon(event);
    }
  },
  evaluateDisplay: function () { //设置箭头样式
    var that = this;
    wx.navigateTo({
      url: '../evaluate/evaluate?spuId=' + that.data.spuIdshopCar,
    })
  },
  choseColorAndColorDisplay: function () { //设置箭头样式
    var that = this;
    
    
    if (that.data.choseColorAndSize == "packup") {
      that.setData({
        choseColorAndSize: "packdown"
      });  
    }
    else {
      that.setData({
        choseColorAndSize: "packup"
      });
    }
    if (that.data.colorChoseId != '' && that.data.sizeChoseId != ''){
      
    }
    // colorChoseId: '',//选择的颜色值
    //   sizeChoseId: '',//选择的尺码值
  },
  salesDisplay: function () { //设置箭头样式
    var that = this;
    if (that.data.salesCouponClassName == "packup") {
      that.setData({
        salesCouponClassName: "packdown"
      });
    }
    else {
      that.setData({
        salesCouponClassName: "packup"
      });
    }
  },
  couponDisplay:function(){ //设置箭头样式
    var that = this;
    if (that.data.arrowCouponClassName == "packup1"){
      that.setData({
        arrowCouponClassName: "packdown1"
      });
    }
    else {
      that.setData({
        arrowCouponClassName: "packup1"
      });
    }
  },
  closeAlert:function(){
    var that = this
    that.setData({
      alertName: "",
      alertMask: "none",
    })
  },
  alertDetails:function(){
    var that = this
    that.setData({
      alertName: "alert-screen-template",
      alertMask:"",
    })
  },
  changeColorClass: function (e){
    var that = this;
    
    for (var i = 0; i < that.data.sizes.length; i++) {
      that.data.sizes[i].isSelect = ''
    }
    that.setData({
      sizes: that.data.sizes,
      colorChoseId: e.target.dataset.colorkeyhtml,
      colorChoseVal: e.target.dataset.colorval
    })
    var productVos = that.data.productVos;
    var sizeListstock = [];
    var sizeListChose = [];
    var sizeAll = [];
    var sizeChose = [];
    var choseColorImag = '';
    for (var i = 0; i < productVos.length; i++){
      
      if (productVos[i].imageSpecificationValueId == e.target.dataset.colorkeyhtml) {
        choseColorImag = productVos[i].thumbnail;
        break
        
      }
      
      
    }
    that.setData({
      colorClicClass: e.target.dataset.idx,
      colorKey: e.target.dataset.colorkeyhtml,
      firstImg: choseColorImag
    });
    var moviesNew = that.data.movies;
    if (moviesNew.length > 4) {
      moviesNew.shift();
    }
    moviesNew.unshift(that.data.firstImg);
    that.setData({
      movies: moviesNew
    })
  
    
    for (var i = 0; i < productVos.length; i++){
      if (productVos[i].imageSpecificationValueId == e.target.dataset.colorkeyhtml){
        sizeListstock.push(productVos[i].stock);
        sizeListChose.push(productVos[i].textSpecificationValueId);
      }
    }
    
    for (var i = 0; i < sizeListstock.length; i++){
      if (sizeListstock[i] == 0){
        sizeChose.push(sizeListChose[i])
      }
    }
    
    for (var i = 0; i < that.data.sizes.length; i++){
      for (var j = 0; j < sizeChose.length; j++){
        if (that.data.sizes[i].key == sizeChose[j]){
          that.data.sizes[i].isSelect = 'false'
        }
      }
    }

    that.setData({
      sizes: that.data.sizes
    })
    
    that.data.stockBuy = '';
    that.setData({
      colorClicClass: e.target.dataset.idx,
      colorKey: e.target.dataset.colorkeyhtml,
      colorChoseId: e.target.dataset.colorkeyhtml,
    });
    
    
    if (that.data.sizeChoseId != '' && that.data.colorChoseId != '') {
      for (var i = 0; i < that.data.productVos.length; i++) {
        if (that.data.productVos[i].imageSpecificationValueId == that.data.colorChoseId && that.data.productVos[i].textSpecificationValueId == that.data.sizeChoseId) {
          that.setData({
            stockBuy: that.data.productVos[i].stock,
            firstImg: that.data.productVos[i].thumbnail,
          })
        }
      }
      var moviesNew = that.data.movies;
      if (moviesNew.length > 4){
        moviesNew.shift();
      }
      moviesNew.unshift(that.data.firstImg);
        that.setData({
          movies: moviesNew      
        })
    }
    if (that.data.colorChoseVal != '' && that.data.sizeChoseVal != '') {
      var choeseSAC = '已选：' + that.data.colorChoseVal + ' ' + that.data.sizeChoseVal + '码'
      that.setData({
        choseSizeAndColor: choeseSAC
      })
    }
  },
  changeSizeClass: function (e) {
    var that = this
    
    for (var i = 0; i < that.data.colors.length; i++) {
      that.data.colors[i].isSelect = ''
    }
    that.data.stockBuy = '';
    that.setData({
      sizeClicClass: e.target.dataset.indx,
      sizeKey: e.target.dataset.sizekeyhtml,
      sizeChoseId: e.target.dataset.sizekeyhtml,
      sizeChoseVal: e.target.dataset.sizeval
    });
    if (that.data.sizeChoseId != '' && that.data.colorChoseId != ''){
      for (var i = 0; i < that.data.productVos.length; i++){
        if (that.data.productVos[i].imageSpecificationValueId == that.data.colorChoseId && that.data.productVos[i].textSpecificationValueId == that.data.sizeChoseId){
          that.setData({
            stockBuy: that.data.productVos[i].stock,
            firstImg: that.data.productVos[i].thumbnail,
          })
          var moviesNew = that.data.movies;
          if (moviesNew.length > 4) {
            moviesNew.shift();
          }
          moviesNew.unshift(that.data.firstImg);
          that.setData({
            movies: moviesNew
          })
        }
      } 
    }
    var productVos = that.data.productVos;
    var sizeListstock = [];
    var sizeListChose = [];
    var sizeAll = [];
    var sizeChose = [];

 

    for (var i = 0; i < productVos.length; i++) {
      if (productVos[i].textSpecificationValueId == e.target.dataset.sizekeyhtml) {
        sizeListstock.push(productVos[i].stock);
        sizeListChose.push(productVos[i].imageSpecificationValueId);
      }
    }

    for (var i = 0; i < sizeListstock.length; i++) {
      if (sizeListstock[i] == 0) {
        sizeChose.push(sizeListChose[i])
      }
    }
    for (var i = 0; i < that.data.colors.length; i++) {
      for (var j = 0; j < sizeChose.length; j++) {
        if (that.data.colors[i].key == sizeChose[j]) {
          // that.data.colors[i].isSelect = 'false'
        }
      }
    }

    that.setData({
      colors: that.data.colors
    })
    
    if (that.data.colorChoseVal != '' && that.data.sizeChoseVal != '') {
      var choeseSAC = '已选：' + that.data.colorChoseVal + ' ' + that.data.sizeChoseVal + '码'
      that.setData({
        choseSizeAndColor: choeseSAC
      })
    }
  },
  subtraction: function () { //购买数减 
    var that = this;
    var i = this.countBuy;
    that.data.countBuy--;
    if (that.data.countBuy <= 1){
      that.data.countBuy = 1;  
    }
    that.setData({
      countBuy: that.data.countBuy
    })
  },
  addition: function () { //购买数加 
    var that = this;
    // colorChoseId   sizeChoseId
    if (that.data.colorChoseId == '' || that.data.sizeChoseId == ''){
      wx.showModal({
        title: '提示',
        content: '请选择颜色尺寸',
        showCancel: false,
        success: function (res) {
         
        }
      });
      return
    }
    that.data.countBuy++;
    if (that.data.countBuy >= that.data.stockBuy) {
      that.data.countBuy = that.data.stockBuy;
    }
    that.setData({
      countBuy: that.data.countBuy
    })
  },
  initData(){
    wx.showToast({
      mask:true,
      title: '加载中',
      icon: 'loading'
    });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.request({//详情页请求数据
      url: 'https://test.aipaike.com/api/product/content.jhtml?spuId=' + that.data.spuId,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        

        wx.hideToast();
        if (res.data.desc == '该商品已下架') {
          wx.showToast({
            title: '该商品已下架',
            icon: 'success',
            duration: 2000
          });
          // wx.navigateBack({
          //   delta: 1
          // })

        }
        
        if (res.data.content.marketable == true) {
          var evaluateDateCreat = [];
          for (var i = 0; i <= res.data.content.reviewList.length; i++) {
            // evaluateDateCreat.push(res.data.content.reviewList[i].createDate.substring(0, 10));

          }
          var couponNewList = [];
          for (var i = 0; i < res.data.content.couponVoPage.content.length; i++) {
            res.data.content.couponVoPage.content[i].getNumber = 1;
            res.data.content.couponVoPage.content[i].getSelect = true;
            res.data.content.couponVoPage.content[i].getText = '领取'
          }

          that.setData({
            movies: res.data.content.productImagesSource,
            spuIdshopCar: res.data.content.spuId,
            productName: res.data.content.name,
            price: res.data.content.price,
            marketPrice: res.data.content.marketPrice,
            couponVoPageList: res.data.content.couponVoPage.content,
            couponIcon: res.data.content.couponVoPage.content.slice(0, 3),
            attributeVo: res.data.content.attributeVo,
            promotionVo: res.data.content.promotionVo,
            promotionVoFirst: res.data.content.promotionVo[0],
            introduceList: res.data.content.introduce,
            // introduceList: res.data.content.introduceList.slice(0,12),
            reviewList: res.data.content.reviewList,

            maxRbateValue: res.data.content.maxRebateValue,
            maxDiscount: res.data.content.maxDiscount,
            discountPrice: res.data.content.discountPrice,
            marketable: res.data.content.marketable
          });
          var replaecHtmlList = that.data.introduceList;
          WxParse.wxParse('replaecHtmlList', 'html', replaecHtmlList, that, 5);
        }
     


      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    }),
      wx.request({//请求颜色，尺寸数据
      url: 'https://test.aipaike.com/api/product/getProductProperty.jhtml?spuId=' + that.data.spuId,
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success: function (res) {
          
          console.log(res)
          that.setData({
            colors: res.data.content.colors,
            sizes: res.data.content.sizes,
            productVos: res.data.content.productVos
          });
        }
      });
    //购物车加载数据

    var cartUrl = 'https://test.aipaike.com/api/cart/listNew.jhtml';
    var data = {};
    app.httpGET(cartUrl, data, function (res) {

      if (res.data.content.totalQuantity > 99){
        res.data.content.totalQuantity = '99+'
      };
      that.setData({
        carNum: res.data.content.totalQuantity
      })


    });
  },
  onLoad: function (option) {
    
    var that = this;
    var timmer = null;
    if (wx.getStorageSync('globalDataKey') == null || wx.getStorageSync('globalDataKey').javaToken == null) {
      timmer = setInterval(function () {
        app.getJavaTokenFn();
        if (wx.getStorageSync('globalDataKey') && wx.getStorageSync('globalDataKey').javaToken) {
          clearInterval(timmer);
          this.setData({
            spuId: option.id,
          });
          that.initData();
        }
      }, 800)
    } else {
      clearInterval(timmer);
      this.setData({
        spuId: option.id,
      });
      that.initData();
    }
  },
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