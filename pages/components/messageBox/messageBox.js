let _compData = {
  '_messageBox_.modalObject': {
    modalTitle:'',
    modalContent:'',
    hasIcon:'',
    IconUrl:'',
    hasImg:'',
    ImgUrl:'',
    hasCancel:'',
    cancelText:'',
    confirmText:'',
    success:function(){}
  },
  '_messageBox__.daysModalShow': false
}
let messageBoxPannel = {
  show:function(data){
    let self = this
    this.setData({
      '_messageBox_.daysModalShow': true,
      '_messageBox_.modalObject':data
    })
  },
  // onConfirm:function(data){
  //   console.log('onConfirm')
  //   console.log(data)
  //   this.setData({
  //     '_messageBox_.daysModalShow': false,
  //   })
    
  //   // console.log(_compData)
  //   // _compData.success()
  //   // this.triggerEvent('onConfirm', data, {bubbles:false})
  // },
  // onCancel:function(data){
  //   console.log('onCancel')
  //   console.log(data.target.dataset.status)
  //   this.setData({
  //     '_messageBox_.daysModalShow': false,
  //   })
  //   // this.triggerEvent('onCancel', data, {bubbles:false})
  // }
}
function MessageBoxPannel (){
  let pages = getCurrentPages()
  let curPage = pages[pages.length-1]
  this._page = curPage
  Object.assign(curPage,messageBoxPannel)
  curPage.messageBoxPannel = this
  curPage.setData(_compData)
  return this
}
module.exports = {
  MessageBoxPannel
}