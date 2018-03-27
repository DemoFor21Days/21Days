const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const loginCheck = pageObj => {
    if (pageObj.onLoad) {
        let _onLoad = pageObj.onLoad;
        // 使用onLoad的话需要传递options
        pageObj.onLoad = function (options) {
            if(wx.getStorageSync('USERID')) {
                // 获取当前页面
                let currentInstance = getPageInstance();
                _onLoad.call(currentInstance, options);

            } else {
                //跳转到登录页
                wx.redirectTo({
                    url: "/pages/index/index"
                });
            }
        }
    }
    return pageObj;
}

// 获取当前页面    
const getPageInstance = ()=> {
    var pages = getCurrentPages();
    console.log('pages')
    console.log(pages)
    return pages[pages.length - 1];
}

exports.loginCheck = loginCheck;

module.exports = {
  formatTime: formatTime,
  getPageInstance: getPageInstance
}
