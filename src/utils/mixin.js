let MIXIN = {
  onShow () {
    console.log('canIUse',wx.canIUse('hideHomeButton'))
    if(wx.canIUse('hideHomeButton')) { //兼容低版本微信
      wx.hideHomeButton({}) //隐藏返回首页按钮
    }

  },
  onLoad () {
    if(typeof this.data !== 'undefined') {
      console.log('mixin',this.$data,typeof this.$options.data())
      Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
    }
  }
}
export default MIXIN
