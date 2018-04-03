//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo:'',
    dataList:{
      'projectName': '员工领导力模拟数据',
      'stage':'阶段一',
      'totalTime':'21',
      'enterNumber':'1000',
      'punchCardNumber':'2000',
      'punchCardDetail':'员工必须在每日12点前完成打卡',
      'party':[{
        'avatarUrl':'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epc5HicBfcefQN5pzdwThdD8qC0vtX8ykhYFgyRUibxOpbGhRk4D8ZTwnhbmXQ3qh4Evm1KIQNicbzIA/0',
        'userInfoName':'adore',
        'childrenPunchCardTime':'2天前',
        'childrenPunchCard':'2天',
        'commentImg':'http://f2.topitme.com/2/b9/71/112660598401871b92l.jpg',
        'comment':'基层铃铛李培训打卡,收回了...',
        'thumbUp':['https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epc5HicBfcefQN5pzdwThdD8qC0vtX8ykhYFgyRUibxOpbGhRk4D8ZTwnhbmXQ3qh4Evm1KIQNicbzIA/0','https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epc5HicBfcefQN5pzdwThdD8qC0vtX8ykhYFgyRUibxOpbGhRk4D8ZTwnhbmXQ3qh4Evm1KIQNicbzIA/0'],
        'otherComments':[{
          'avatarUrl':'',
          'userInfoName':'cherish',
          'comment':'大白菜(●—●)哈哈哈'
        }]
      },{
        'avatarUrl':'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epc5HicBfcefQN5pzdwThdD8qC0vtX8ykhYFgyRUibxOpbGhRk4D8ZTwnhbmXQ3qh4Evm1KIQNicbzIA/0',
        'userInfoName':'adore',
        'childrenPunchCardTime':'3天前',
        'childrenPunchCard':'5天',
        'comment':'基层铃铛李培啦啦...',
        'thumbUp':['https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epc5HicBfcefQN5pzdwThdD8qC0vtX8ykhYFgyRUibxOpbGhRk4D8ZTwnhbmXQ3qh4Evm1KIQNicbzIA/0','https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epc5HicBfcefQN5pzdwThdD8qC0vtX8ykhYFgyRUibxOpbGhRk4D8ZTwnhbmXQ3qh4Evm1KIQNicbzIA/0'],
        'commentImg':'',
        'otherComments':[{
          'avatarUrl':'',
          'userInfoName':'cherish',
          'comment':'大白菜(●—●)哈哈哈123'
        }]
      }]
    }
  },
  onLoad:function(){
    this.setData({
      userInfo:app.globalData.userInfo
    })
    console.log(app.globalData.userInfo.avatarUrl)
    wx.setTabBarItem({
      index: 0,
      text: 'text',
      iconPath: '/path/to/iconPath',
      selectedIconPath: '/path/to/selectedIconPath'
    })
    wx.showTabBar({
      success:function(){
        console.log('success')
      },
      fail:function(){
        console.log('fail')
      }
    })
  },
  enter:function(){
    // 跳转去 加入 的 打卡活动详情页面
    wx.navigateTo({
      url: '../enterPunchCardDetail/enterPunchCardDetail'
    })
  }
})
