import _Promise from 'bluebird';

/**
 * @param {Function} fun 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
 */
function Promise(fun, options) {
    options = options || {};
    return new _Promise((resolve, reject) => {
        if (typeof fun !== 'function') {
            reject();
        }
        options.success = resolve;
        options.fail = reject;
        fun(options);
    });
}

/**
 * 手势库
 */
function touchstart(e, _this) {
    const t = e.touches[0],
        startX = t.clientX,
        startY = t.clientY;
    _this.setData({
        'gesture.startX': startX,
        'gesture.startY': startY,
        'gesture.out': true
    })
}
/**
 * 左滑
 * @returns {boolean} 布尔值
 */
function isLeftSlide(e, _this) {
    if (_this.data.gesture.out) {
        const t = e.touches[0],
            deltaX = t.clientX - _this.data.gesture.startX,
            deltaY = t.clientY - _this.data.gesture.startY;
            
        if (deltaX < -20 && deltaX > -40 && deltaY < 8 && deltaY > -8) {
            _this.setData({
                'gesture.out': false
            })
            return true;
        } else {
            return false;
        }
    }
}
/**
 * 右滑
 * @returns {boolean} 布尔值
 */
function isRightSlide(e, _this) {
    if (_this.data.gesture.out) {
        const t = e.touches[0],
            deltaX = t.clientX - _this.data.gesture.startX,
            deltaY = t.clientY - _this.data.gesture.startY;

        if (deltaX > 20 && deltaX < 40 && deltaY < 8 && deltaY > -8) {
            _this.setData({
                'gesture.out': false
            })
            return true;
        } else {
            return false;
        }
    }
}


function isEmpty (mixed_var) {  
    if (mixed_var == "" || mixed_var == undefined || mixed_var == null || mixed_var.lenght == 0) {  
        return true;  
    }else{
        return false;
    }
}  


function showLoading(){
    // debugger;
    wx.showLoading({
      mask:true,
      title: '加载中...'
    })
}

function hideLoading(){
   wx.hideLoading();
}

function spTips(msg,image,icon){
    // debugger;
     wx.showToast({
        title: msg,
        image:image || '',
        icon: icon || '',
        duration: 1500
     })
}

module.exports = {
  isEmpty:isEmpty,
  showLoading:showLoading,
  hideLoading:hideLoading,
  spTips:spTips,
  Promise: Promise,
  Gesture: {
    touchstart: touchstart,
    isLeftSlide: isLeftSlide,
    isRightSlide: isRightSlide
  }
}
