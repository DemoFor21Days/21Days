//index.js
//获取应用实例
const app = getApp()
const swiper = require('../../utils/swiper')
// 实际实例
var Swiper  

const conf = {
  data: {
    userInfo: {},
    hasUserInfo: false,
    // hasProject: true,
    /*** 图片区域****/
    // swiper 容器宽度
    swiperContainWidth: 10000,
    // 手指移动时的偏移量
    swiperTranX: 0,
    // 轮播动画控制变量
    swiperAnimationData:{} ,
    // 跳转到的图片索引 swiperIndex
    swiperIndex: 0 ,
    bindPunchCard:false,
    // bindPunchCardList:[],
    mustChoise: true,
    editbindPunchCard:false,
    sliderNumber:'1',
    dataLists:{
      name:'员工领导力培训',
      processTime:'5',
      totalTime:'12',
      stage:[{
        stateName:'时间管理1',
        stageTime:'3.14',
        stageStage:'课前',
        stageIndex:'1',
        location:false
      },{
        stateName:'时间管理1',
        stageTime:'3.14',
        stageStage:'课前',
        stageIndex:'1',
        location:false
      },{
        stateName:'时间管理2',
        stageTime:'3.14',
        stageStage:'课中',
        stageIndex:'2',
        location:false
      },{
        stateName:'时间管理3',
        stageTime:'3.14',
        stageStage:'课后',
        stageIndex:'3',
        location:false
      }]
    },
    punchCardList:{
      allNum:'3',
      neceNum:'1',
      clockers:[{
          'id':'1',
          'name':'我是活动打卡名1',
          'intro':'介绍1',
          'partyMainImg':'',
          'beginTime':'',
          'endTime':'',
          'cycle':'',
          'type':'',
          'necessary':'',
          'stageOrder':'',
          'remark':'',
          'projectName':''
          // 'stageMustChoose':false
        },{
          'id':'2',
          'name':'我是活动打卡名2',
          'intro':'介绍2',
          'partyMainImg':'',
          'beginTime':'',
          'endTime':'',
          'cycle':'',
          'type':'',
          'necessary':'',
          'stageOrder':'',
          'remark':'',
          'projectName':''
          // 'stageMustChoose':false
        },{
          'id':'3',
          'name':'我是活动打卡名3',
          'intro':'介绍3',
          'partyMainImg':'',
          'beginTime':'',
          'endTime':'',
          'cycle':'',
          'type':'',
          'necessary':'',
          'stageOrder':'',
          'remark':'',
          'projectName':''
          // 'stageMustChoose':false
        }]
      },
    dataListsStageIndex:'1',
    projectName:''
  },
  drawProgressbg: function(){
     // 使用 wx.createContext 获取绘图上下文 context
     var ctx = wx.createCanvasContext('canvasProgressbg')
     ctx.setLineWidth(4);// 设置圆环的宽度
     ctx.setStrokeStyle('#8196c2'); // 设置圆环的颜色
     ctx.setLineCap('round') // 设置圆环端点的形状
     ctx.beginPath();//开始一个新的路径
     ctx.arc(24.5, 24.5, 23, 0, 2 * Math.PI, false);
     //设置一个原点(100,100)，半径为90的圆的路径到当前路径
     ctx.stroke();//对当前路径进行描边
     ctx.draw();
   },
   drawCircle: function (step){  
     var context = wx.createCanvasContext('canvasProgress');
       context.setLineWidth(4);
       context.setStrokeStyle('#ffffff');
       context.setLineCap('round')
       context.beginPath();
       // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
       context.arc(24.5, 24.5, 23, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
       context.stroke();
       context.draw()
  },
  onReady: function () {
      this.drawProgressbg();
      this.drawCircle(this.data.dataLists.processTime/this.data.dataLists.totalTime*2)
  },
  //下拉刷新
  onPullDownRefresh:function(){
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '加载中',
    })
    //模拟加载
    setTimeout(function()
    {
      // complete
      // wx.hideNavigationBarLoading() //完成停止加载
      wx.hideLoading()
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
  },
  onLoad(option){
    this.initSwiper()
    console.log(option.projectName)
    option.projectName ? this.setData({'projectName': option.projectName}) : ''
    console.log(this.data.projectName)
    var self = this
    wx.getUserInfo({
      success: function(res) {
        // userInfo,nickName,avatarUrl,gender,province,city,country
        self.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.log('this.data.canIUse:' + this.data.canIUse)
      // this.getUserInfo()
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('*************')
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } 
    this.setData({
      dataListsStageIndex:1
    })
  },
  getUserInfo: function(e) {
    console.log('*******getUserInfo*******')
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addProjectFunc: function() {
    wx.navigateTo({
      url: 'addProject/addProject?operation=new'
    })
  },
  addNew: function (){
    wx.navigateTo({
      url: 'addPunchCard/addPunchCard?projectName='+this.data.projectName + '&operation=new'
    })
  },
  historyPunchCardFunc:function(){
    wx.navigateTo({
      url: 'historyPunchCard/historyPunchCard?projectName='+this.data.projectName
    })
  },
  sliderChange: function(e){
    console.log(e)
    this.setData({
      sliderNumber:e.detail.value
    })
  },
  editFinshFunc: function(e){
    this.setData({
      editbindPunchCard:false
    })
  },
  editProject:function(e){
    wx.navigateTo({
      url: 'addProject/addProject?operation=update'
    })
  },
  //打卡
  bindPunchCard: function (e) {
    console.log(e.target.dataset.index)
    console.log(e.target.dataset.location)
    var key = "dataLists.stage[" + e.target.dataset.index + "].location"
    this.setData({
      bindPunchCard:true
    })
    this.setData({
      [key]:!e.target.dataset.location
    })
  },
  editPunchCard: function () {
    console.log('here')
    this.setData({
      editbindPunchCard:true
    })
  },
  editPunchCardIdFunc:function(e){
    wx.navigateTo({
      url: 'addPunchCard/addPunchCard?id=' + e.target.dataset.id +'&projectName=' + this.data.projectName + '&operation=update'
    })
  },
  deletePunchCardIdFunc:function(e){
    console.log('删除: ' + e.target.dataset.id)
  },
  onShow(){
    var that = this
    // 同步 系统信息
    var systemInfo = wx.getSystemInfoSync()
    // Swiper.computedScreenRatio(systemInfo)

    Swiper = new swiper({
      imgLength: this.data.dataLists.stage.length ,
      success: function(width){
        that.setData({
          swiperContainWidth : width
        })
      },
      systemInfo: systemInfo
     })
  },
  initSwiper(){
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.swiperAnimation = animation
    var fastAnimation = wx.createAnimation({
      duration: 10,
      timingFunction: 'ease'
    })
    this.swiperFastAnimation = fastAnimation
  },
  newSwiperAnimation( tranX ){
    // 通过算法获取 偏移量
    // tranY 已带 rpx 单位
    var _tranX = tranX 
    this.swiperAnimation.translateX( _tranX ).step()
    this.setData({
      swiperAnimationData: this.swiperAnimation.export()
    })
    
  },
  newFastSwiperAnimation(tranX) {
    // 通过算法获取 偏移量
    // tranY 已带 rpx 单位
    var _tranX = tranX + 'px'
    this.swiperFastAnimation.translateX(_tranX).step()
    this.setData({
      swiperAnimationData: this.swiperFastAnimation.export()
    })
  },
  swiperTouchStart(e){
    Swiper.keepStartX(e,function(){})
  },
  swiperTouchMove(e){

    var swiper_endX, swiper_endY
    swiper_endX = e.changedTouches[0].pageX
    swiper_endY = e.changedTouches[0].pageY
    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动 
    var touch_angel_result = this.GetSlideDirection(Swiper._x_start, Swiper._y_start, swiper_endX, swiper_endY)
    if( touch_angel_result == 1 ){
      this.closeCalendar()
    } else if (touch_angel_result == 2){
      this.openCalender()
    } else if (touch_angel_result == 3 || touch_angel_result == 4 ){
      var that = this
      Swiper.moveBox(e, function (tranX) {
        that.newFastSwiperAnimation(tranX)
      })
    }
  },
  swiperTouchEnd(e){
    var that = this 
    Swiper.ontouchEnd(e, function(canExchange, tranX){
      if(canExchange){
        that.setData({
          swiperIndex : Swiper.swiperIndex 
        })
        that.newSwiperAnimation( tranX )
      }
      else{
        that.newSwiperAnimation( Swiper.boxTranslateX )
      }
    }) 
  },
  //返回角度  
  GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI
  },
  //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动  
  GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短  
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return result;
    }
    var angle = this.GetSlideAngle(dx, dy);
    var littleAngle = 60
    var biggerAngle = 180 - 60 // 120
    if (angle >= -littleAngle && angle < littleAngle) {
      result = 4;
    } else if (angle >= littleAngle && angle < biggerAngle) {
      result = 1;
    } else if (angle >= -biggerAngle && angle < -littleAngle) {
      result = 2;
    }
    else if ((angle >= biggerAngle && angle <= 180) || (angle >= -180 && angle < -biggerAngle)) {
      result = 3;
    }
    return result;
  }  

};

Page(conf);
