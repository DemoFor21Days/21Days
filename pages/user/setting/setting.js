//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  	checked:true,
  	changeSetting:false
  },
  onLoad:function(){
    var self = this
    wx.request({
        url: 'http://192.168.0.101:3000/mock/user/setting', //仅为示例，并非真实的接口地址
        data: {
          createBy:app.globalData.userInfo.nickName
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          self.setData({
            dataLists:res.data
          })
        }
      })
  },
  checkCode:function(){
  	this.data.checked = !this.data.checked
  	this.setData({
  		checked:this.data.checked
  	})
  },
  changeSetting:function(){
  	this.setData({
  		changeSetting:true
  	})
  },
  finishFunc:function(){
  	this.setData({
  		changeSetting:false
  	})
  }
})
