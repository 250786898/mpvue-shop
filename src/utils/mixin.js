let MIXIN = {
  onShow () {
    wx.hideHomeButton({}) //隐藏返回首页按钮
  },
  onLoad () {
    if(this.$options.data) {
      // console.log('mixin')
      // Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
    }
  }
}
export default MIXIN