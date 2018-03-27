var swiper = function(opt){
  // 保存设置
  this.opt =opt
  // 当前 移动块停留索引
  this.currentDirection  = 0
  
  // 盒子容器总偏移量
  this.boxTranslateX = 0 
  // 每移动一张图会增加的偏移量
  this.singleOffsetX = -610
  // 触摸
  this._x_start = 0 
  this._y_start = 0 
  // 移动
  this._x_move = 0 
  // 偏移量
  this._x_offset = 0
  // move 过程中真实偏移
  this._x_realOffset = 0
  // 离开
  this._x_end = 0 
  this.screenWidth = 750
  this.screenHeight = 1210
  this.pixelRatio = 2
  // rpx
  this.maxTranX = this.singleOffsetX * (this.opt.imgLength -1  ) 
  // 容器宽度 width 100 是两边靠墙
  this.width = 100 * 2 + (this.opt.imgLength - 1) *60 + 550 * this.opt.imgLength

  this.swiperIndex = 0
  // 计算宽转换比例
  this.computedScreenRatio(opt.systemInfo)
}
// 计算宽转换比例
swiper.prototype.computedScreenRatio = function (systemInfo){
  this.pixelRatio = systemInfo.pixelRatio
  this.screenWidth = systemInfo.screenWidth
  this.screenHeight = systemInfo.screenHeight  
  //this.singleOffsetX = -610
  // 奇怪的i5 按照算法会 多偏移2 px
  if (systemInfo.model.indexOf('iPhone 5') > -1 ){
    this.singleOffsetX = -(610 * (this.screenWidth / 750) -2  ).toFixed()
  }
  else{
    this.singleOffsetX = -610 * (this.screenWidth / 750)
  }
  this.maxTranX = this.singleOffsetX * (this.opt.imgLength - 1) 
  // 回调绑定vm ,渲染盒子宽度
  this.opt.success && this.opt.success(this.width)
}
// bindtouchstart
swiper.prototype.keepStartX = function(e, callback){
  this._x_start = e.touches[0].pageX
  this._y_start = e.touches[0].pageY
  callback && callback()
}
// bindtouchmove
/*
  函数说明 moveBox
  @params e  事件
  @params {function} callback 图片盒子的偏移量改变，绑定到vm 上面，视图发生变化
*/
swiper.prototype.moveBox = function (e, callback) {
  this._x_move = e.touches[0].pageX 
  this._x_offset = this._x_move - this._x_start 
  var lastTranX = this.computedTranX(this._x_offset)
  
  callback && callback(lastTranX)
}
// 根剧移动偏移量临界值计算出真实位移
swiper.prototype.computedTranX = function ( offsetX ){
    // 滑向上一张
    if( offsetX > 0  ){
      return offsetX + this.boxTranslateX 
    }
    // 滑动下一张
    else if (offsetX < 0 ){ 
      if ( Math.abs(offsetX - this.boxTranslateX) > Math.abs(this.maxTranX - 50) ){
        return this.maxTranX
      }else{
        return offsetX + this.boxTranslateX 
      }
    }
}
// bindtouchend 
swiper.prototype.ontouchEnd = function(e, callback){

  // 记录手指离开屏幕的坐标
  this._x_end = e.changedTouches[0].pageX
  this._x_realOffset = this._x_end - this._x_start
  // 判断滑动距离超过 指定值 轮播一张图
  var canExchangeImgFromOffset = Math.abs(this._x_realOffset) >= 50 ? true : false
  // 滑动距离达到 换图的要求
  if ( canExchangeImgFromOffset ){
    // 变量说明 计算总偏移
    var lastTotalTranlateX ;
    //  滑向上一张
    if (this._x_offset > 0) {
      console.log('//  滑向上一张')
      // 判断是否已经在第一张图，若不是，则滑动上一张
      if (Math.abs(this.boxTranslateX) > 0) {
        // lastTotalTranlateX 递增
        // this.singleOffsetX 为负数 -- 得 +
        this.swiperIndex -= 1
        console.log('当前的index:' + this.swiperIndex)
        lastTotalTranlateX = this.boxTranslateX - this.singleOffsetX
      } 
      else {
        // 已在第一张图 ，动画恢复原位
        this.swiperIndex = 0
        lastTotalTranlateX = 0
      }
    }
    //  滑向下一张
    else {
      console.log('//  滑向下一张:')
      if ( Math.abs(this.boxTranslateX) < Math.abs(this.maxTranX) ) {
        // lastTotalTranlateX 递增
        this.swiperIndex += 1
        console.log('当前的index:' + this.swiperIndex)
        lastTotalTranlateX = this.boxTranslateX + this.singleOffsetX
      } else {
        console.log('到底图了')
        this.swiperIndex = this.opt.imgLength -1
        lastTotalTranlateX = this.maxTranX 
      }  
    }
    this.boxTranslateX = lastTotalTranlateX
    /* callback 说明
      @参数1  是否执行动画
      @参数2  若参数1为true, 则盒子的tranX 应该变成 lastTotalTranlateX，动画飞到对应的图 
       小程序 执行 wx.createAnimation 
    */
    callback && callback(true, lastTotalTranlateX)
    // reset 所有 与touch 相关参数
    this.resetParams()
  }
  else{
    callback && callback(false)
    // reset 所有 与touch 相关参数
    this.resetParams()
  }
}
swiper.prototype.resetParams = function(){
  // 触摸
  this._x_start = 0
  this._y_start = 0
  // 移动
  this._x_move = 0
  // 偏移量
  this._x_offset = 0
  // move 过程中正式偏移
  this._x_realOffset = 0
  // 离开
  this._x_end = 0
}

module.exports = swiper
