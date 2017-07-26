var app = getApp();
var QR = require("../../utils/wxqrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    alertName: "",//弹窗模板名
    alertMask: "none",//是否显示遮罩
    havenoUsesmArrow: "use_explain_arrow",//未使用初始样式
    haveUsesmArrow: "use_explain_arrow",//已使用初始样式
    haveOverdueArrow: "use_explain_arrow",//已过期初始样式
    havenoUsesList: [],//未使用列表
    haveUsesList: [],//已使用列表
    haveOverdueList: [],//已过期列表
    userCellId: '',//列表id 
    userCellId2: '',//列表id
    userCellId3: '',//列表id
    coupon_code: '',//优惠券号
    coupon_code_img: '',//优惠券号二维码
    couponListUse: [],
    couponListUseChose: [],
    balanceTypeId: '',
    checkTrueOrFalse: '',
    balanceId: '',
    isExclus: '',
    isDifferent: '',
    couponArrayIdUse: '',//判断是购物车的还是直接购买的
    choseId: [],
  },
  checkboxChange: function (e) {
    var couponListId = [];
    var that = this;
    var couponList = [];
    var BalanceTypeIdList = [];
    var isExclusiveList = [];
    var isDifferentExclusiveList = [];
    var arrySplit = [];
    if (e.detail.value.length <= that.data.choseId.length) {
      couponList = [];
      for (var r = 0; r < e.detail.value.length; r++) {
        couponList.push(e.detail.value[r].split('-')[0])
      }

    } else {
      for (var i = 0; i < e.detail.value.length; i++) {

        var newC = e.detail.value[e.detail.value.length - 1];
        var newCId = newC.split('-')[0];
        var newCTypeId = newC.split('-')[1];
        var newCExclusiveId = newC.split('-')[2];
        var newCDifferentId = newC.split('-')[3];
        if (i < e.detail.value.length - 1) {
          var oldC = e.detail.value[i];
          var oldCId = oldC.split('-')[0];
          var oldCTypeId = oldC.split('-')[1];
          var oldCExclusiveId = oldC.split('-')[2];
          var oldCDifferentId = oldC.split('-')[3];
          if (newCTypeId == oldCTypeId) {
            if (newCExclusiveId == "true" || oldCExclusiveId == "true") {
            } else {
              couponList.push(oldCId);
            }
          } else {
            if (newCDifferentId == "true" || oldCDifferentId == "true") {
            } else {
              couponList.push(oldCId);
            }
          }
        }
        if (i == e.detail.value.length - 1) {
          couponList.push(newCId);
        }
      }
    }
    for (var k = 0; k < that.data.couponListUse.length; k++) {
      var couponCodeId = that.data.couponListUse[k].couponCodeId;
      for (var j = 0; j < couponList.length; j++) {
        var couponCodeIdChecke = couponList[j];
        if (couponCodeId == couponCodeIdChecke) {
          that.data.couponListUse[k].isSelected = true;
          break;
        } else {
          that.data.couponListUse[k].isSelected = false;
        }

      }
    }

    that.setData({
      choseId: couponList
    })
    console.log(couponList);
    that.setData({
      couponListUseChose: couponList
    })
    // couponListUse: JSON.parse(option.couponList),
    that.setData({
      couponListUse: that.data.couponListUse,

    });


  },
  usrCouponSure: function () {//确定使用优惠券
    var that = this;
    var ConponListBack = that.data.couponListUseChose;

    wx.redirectTo({
      url: '../balances/balances?couponIdArry=' + ConponListBack + '&cartItemType=' + that.data.couponArrayIdUse,
    })

  },
  havenoUseSmDisplay: function (e) { //设置未使用箭头样式
    var that = this;

    that.setData({
      userCellId: e.target.dataset.idx,
    });


  },
  haveUseSmDisplay: function (e) { //设置已使用箭头样式
    var that = this;

    that.setData({
      userCellId2: e.target.dataset.indx,
    });

  },
  haveOverdueDisplay: function (e) { //设置已过期箭头样式
    var that = this;
    that.setData({
      userCellId3: e.target.dataset.indx,
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {

    var that = this;
    var couponList = [];
    that.setData({
      couponListUse: JSON.parse(option.couponList),
      balanceTypeId: JSON.parse(option.couponList),
      couponArrayIdUse: option.couponArrayId
    });



debugger
    for (var i = 0; i < that.data.couponListUse.length; i++) {
      if (that.data.couponListUse[i].isSelected == true) {
        couponList.push(that.data.couponListUse[i].couponCodeId)
      }
    }
    that.setData({
      choseId: couponList
    })

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
  closeAlert: function () {
    var that = this
    that.setData({
      alertName: "",
      alertMask: "none",
    })
  },
  alertConpunDetails: function (e) {
    var that = this

    that.setData({

      coupon_code: e.target.dataset.code,
      alertName: "coupon-number-template",
      alertMask: "",
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