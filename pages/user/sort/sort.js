//index.js
//获取应用实例
const app = getApp()
Page({
    data:{
      selectedChildren:true,
      selectedTeacher:false,
      // showOperation:false,
      contentList:[]
    },
    selectedChildren:function(e){
        this.setData({
            selectedTeacher:false,
            selectedChildren:true
        })
    },
    selectedTeacher:function(e){
        this.setData({
            selectedChildren:false,
            selectedTeacher:true
        })
    },
    showActionSheetFunc(e){
      console.log(e)
      var key = 'contentList['+ e.target.dataset.operation +'].showOperation'
      console.log(key)
      this.setData({
        [key]: !e.target.dataset.status
      })
      console.log(this.data.contentList)
    },
    onLoad(){
      var self = this
      wx.request({
        url: 'http://192.168.0.101:3000/mock/user/sort', //仅为示例，并非真实的接口地址
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          self.setData({
            contentList:res.data
          })
        }
      })
    }
})
