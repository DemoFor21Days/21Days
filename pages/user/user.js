//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  	userInfoImg: '',
    userNickName: ''
  },
  onLoad:function(){
  	console.log(app.globalData.userInfo.avatarUrl)
  	this.setData({
  		userInfoImg:app.globalData.userInfo.avatarUrl,
      userNickName:app.globalData.userInfo.nickName
  	})
  },
  gotoSettings:function(){
    wx.navigateTo({
      url: 'setting/setting'
    })
  },
  personalFunc:function(){
    wx.navigateTo({
      url: 'sort/sort'
    })
  }
})
