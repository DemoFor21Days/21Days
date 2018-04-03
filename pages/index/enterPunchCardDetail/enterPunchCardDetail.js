//index.js
//获取应用实例
const app = getApp()
Page({
  	data: {
	    userInfo:'',
	    selectedDK:true,
	    selectedXQ:false,
  	},
  	selectedDK:function(e){
        this.setData({
            selectedXQ:false,
            selectedDK:true
        })
	},
	selectedXQ:function(e){
	    this.setData({
	        selectedDK:false,
	        selectedXQ:true
	    })
	},
  	onLoad:function(){
  		this.setData({
      	userInfo:app.globalData.userInfo
    })
  }
})
