let app = getApp();
let util = require('../../utils/util.js');
// pages/searchs/searchs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideBarFlag: false,
    //noSearchRecord:false,//没有搜索记录
    brandHotsArrY: [],//热搜
    searchRecordsArrY: [],//历史记录数据
    hotHistoryContainer: true,//热搜和历史记录显示隐藏
    searchListContainer: false,//搜索列表一开始隐藏
    searchListEmpty: false,//搜索内容结果是否为空
    goodsListArrY: [],//搜索列表的数据
    sxUp: false,
    jxDown:false,
    pageNum: 1,//默认只加载一页
    inputValue: '',//input 默认值
    currentTab: "0",
    sxBrands: true,//筛选中的品牌标题块
    sxBrandsArr: [],//帅选中的品牌的数组
    subSearchCategoryVoListArr: [],//二级分类的值
    priceAscDescFlag: 0,//价格升序降序-》圣墟
    inputStartSearch: true,
    falseSlideBar:false//侧边栏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showLoading();
    var that = this;
    const hotHistoryUrl = app.globalData.apkBase + '/api/product/search_index.jhtml';
    var timmer = null;
    if(wx.getStorageSync('globalDataKey') == null || wx.getStorageSync('globalDataKey').javaToken == null){
      // debugger;
     timmer =  setInterval(function(){
          app.getJavaTokenFn();
          if(wx.getStorageSync('globalDataKey') && wx.getStorageSync('globalDataKey').javaToken){
            clearInterval(timmer);
            app.httpGET(hotHistoryUrl, {}, that.hotAndHistoryFn);
          }
      },800)
    }else{
      // debugger;
      app.httpGET(hotHistoryUrl, {}, that.hotAndHistoryFn);
    }

     // 判断从帅选过来是否有值
    if(options.sel){
      this.setData({
        hotHistoryContainer:false,
        searchListContainer:true,
        inputValue:options.keyword
      })
      this.allSearchFnXsn(options.keyword, 1, 20, '', false, options.category01Name, options.category02Name, options.startPrice, options.endPrice)
    }
  },
  bindscrolltolower(evnet){
    debugger;
    var that = this;
    var keyword = that.data.inputval;
    var pageNum = 1;
    pageNum++

    this.allSearchFnXsn(keyword, pageNum, 20);
  },
  currentTabValue(e) {
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  //综合排序的时候
  comrankFn: function (e) {
    this.currentTabValue(e);
    this.setData({
      sxUp: false,
      jxDown:false
    })
    let sort = e.currentTarget.dataset.comrank;
    this.allSearchFnXsn(this.data.inputValue, this.data.pageNum, 20, sort, 'true');
  },
  // 排序销量
  salenumFn(event) {
    // debugger;
    this.setData({
      sxUp: false,
      jxDown:false
    })
    this.currentTabValue(event);
    let sort = event.currentTarget.dataset.salenum;
    this.allSearchFnXsn(this.data.inputValue, this.data.pageNum, 20, sort, 'true');
  },
  //价格
  sortFn(e) {
    var sort;
    this.currentTabValue(e);
    let _flag = this.data.priceAscDescFlag++
    if (_flag == 1) {
      this.setData({
        priceAscDescFlag: 0
      })
    }
    if (_flag == 0) {
      sort = e.currentTarget.dataset.pricesx;
       this.setData({
        sxUp: true,
        jxDown:false
      })
    } else if (_flag == 1) {
      sort = e.currentTarget.dataset.pricejx;
      this.setData({
        sxUp: false,
        jxDown:true
      })
    }
    this.allSearchFnXsn(this.data.inputValue, this.data.pageNum, 20, sort, 'true');
  },

  // 热搜和历史搜索开始 get
  hotAndHistoryFn(res) {
    let content = res.data.content;
    let brandHotsArr = content.brandHots;//热搜
    let searchRecords = content.searchRecords//历史搜索
    if (res.data.code == 0) {
      util.hideLoading();
      // 热搜的数据
      var brandHotsArrY = [];
      for (let i = 0; i < brandHotsArr.length; i++) {
        brandHotsArrY.push(brandHotsArr[i]);
      }

      //历史搜索记录开始
      var searchRecordsArrY = [];
      var searchRecordsLength = searchRecords.length;
      if (searchRecordsLength > 8) {
        searchRecords = searchRecords.slice(0, 8);
      } else {
        if (searchRecordsLength > 0) {
          for (let i = 0; i < searchRecords.length; i++) {
            searchRecordsArrY.push(searchRecords[i].searchContent);
          }
        }
      }
    } else if (res.data.code === 11011) {

    }

    this.setData({
      brandHotsArrY: brandHotsArrY
      // searchRecordsArrY: searchRecordsArrY
    });
  },

  //头部input搜索 get
  onBindBlur(event) {
    var that = this;
    if (that.data.inputStartSearch) {
        let keyword = that.trim(event.detail.value);
        if (util.isEmpty(keyword)) {
          var searchInpuEmpTips = '请输入关键词';
          var imgicon = '../assets/images/warn_icon.png'
          util.spTips(searchInpuEmpTips, imgicon);
          return false;
        } else {

          that.setData({
            inputValue: keyword
          });
    console.log(that.data.inputval)
          
          util.showLoading();
          that.allSearchFnXsn(keyword, that.data.pageNum, 20, '', '');
        }
    }
  },
  //总的搜索方法
  allSearchFnXsn(keyword, pageNum, pageSize, sort, isUpdateData, category01Name, category02Name, startPrice, endPrice) {
    var that = this;

    if (category01Name && category02Name && startPrice && endPrice) {

    } else {
      category01Name = '';
      category02Name = '';
      startPrice = '';
      endPrice = '';
    }
debugger;

    let params = {
      keyword: keyword,
      pageNum: pageNum,
      pageSize: pageSize,
      sort: sort,
      platform: 3,
      isSameStore: true,//是否是门店同款
      category01Name: category01Name,
      category02Name: category02Name,
      startPrice: startPrice,
      endPrice: endPrice
    };

    const searchUrl = 'https://tadmin.aipaike.com/aoksearch/queryNewGoodsSR';
    app.httpGET(searchUrl, params, function (res) {
      // debugger;
      //如果搜索的商品不存在的时候
      if (util.isEmpty(res.data.content)) {
        // debugger;
        that.setData({
          hotHistoryContainer: false,
          searchListEmpty: true,
          searchListContainer: true
        });
        util.hideLoading();
        return;
      } else {
        //搜索的商品存在并且返回0
        let successCode = res.data.code;
        let goodsListArrY = [];
        if (successCode == 0 && !util.isEmpty(res.data.content)) {
          // debugger;

          that.setData({
            searchListEmpty: false,
            searchListContainer: true,
            hotHistoryContainer: false
          })
          let goodsVlPageContent = res.data.content.goodsVoPage.content;
          for (let i = 0; i < goodsVlPageContent.length; i++) {

            // 1、//如果有特价就限时特价 ，，没有显示商城价
            // 2、判断goodsVlPageContent[i].promotionPriceH5是否存在
            // 3、判断特价是否存在
            let price = goodsVlPageContent[i].price;
            let promotionPriceH5 = goodsVlPageContent[i].promotionPriceH5;

            if (!util.isEmpty(promotionPriceH5)
              && !util.isEmpty(promotionPriceH5.showPrice)) {
              price = promotionPriceH5.showPrice;
            }

            var tabArray = [];
            if (goodsVlPageContent[i].vipName != null) {
              tabArray[tabArray.length] = goodsVlPageContent[i].vipName;
            }
            if (goodsVlPageContent[i].rebateRatioDsc != null) {
              tabArray[tabArray.length] = goodsVlPageContent[i].rebateRatioDsc;
            }
            if (promotionPriceH5 != null && promotionPriceH5.signName != null) {
              tabArray[tabArray.length] = promotionPriceH5.signName;
            }

            //是否更新数组内容
            if (isUpdateData == true) {
              // debugger;
              that.setData({
                goodsListArrY: []
              })
            }
            var temp = {
              goodsId: goodsVlPageContent[i].goodsId,
              goodsName: goodsVlPageContent[i].goodsName,
              goodsImg: goodsVlPageContent[i].goodsImg,
              isSameStore: goodsVlPageContent[i].isSameStore,//是否门店同款
              price: price,
              tabArray: tabArray
              // tablength:tablength,
              // rebateRatioDsc:goodsVlPageContent[i].rebateRatioDsc,//返利20%
              // vipName:goodsVlPageContent[i].vipName,//会员标签
              // signName:goodsVlPageContent[i].promotionPriceH5.signName,//特卖、限时、促销标签   
            }
            goodsListArrY.push(temp);
          }
          // debugger;
          that.setData({
            goodsListArrY: goodsListArrY,
            searchListEmpty: false,
            searchListContainer: true,
            hotHistoryContainer: false
          });
          util.hideLoading();
        }
      }
    })
  },
  
  //清空历史记录
  empAllSearchRecord() {
    var that = this;
    let delAllUrl = app.globalData.apkBase + '/api/product/deleteSearchHistory.jhtml';
    let params = {};
    app.httpGET(delAllUrl, params, function (res) {
      if (res.data.code == 0) {
         that.hotAndHistoryFn();
      }
    })
  },
  //删除当前条 get
  delCurrentBar(event) {
    var that = this;
    let delUrl = app.globalData.apkBase + '/api/product/deleteSearchHistory.jhtml';
    let keyword = event.currentTarget.dataset.itemText;
    let params = {
      keyword: keyword
    };
    app.httpPOST(delUrl, params, function (res) {
      if (res.data.code == 0) {
        that.hotAndHistoryFn();
      }
    })
  },
  //搜索框小关闭的按钮get
  returnSeactOne() {
    this.setData({
      searchListContainer: false,
      hotHistoryContainer: true
    })
  },
  //单机热搜、历史记录进行搜索  
  hotSearchFn(even) {
    // debugger
    this.setData({
      inputStartSearch: false
    });

    let currentKeyword = even.currentTarget.dataset.item;

    this.setData({
      inputValue: currentKeyword
    });

    this.allSearchFnXsn(currentKeyword, this.data.pageNum, 20, '', '');
    this.setData({
      inputStartSearch: true
    });
  },
  // 筛选
  slideToggle(even) {
    var k = even.currentTarget.dataset.inputval;
    this.currentTabValue(even);
    wx.navigateTo({
      url:'../sxBsing/sxBsing?keyword='+k
    })
  },
  //取消
  switchTabFn() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  trim(str) {
    return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
  }
})