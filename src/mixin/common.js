import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['storeId'])
  },
  onShow () {
    // if(wx.canIUse('hideHomeButton')) { //兼容低版本微信
    //   wx.hideHomeButton({}) //隐藏返回首页按钮
    // }

  },
  // onUnload() {
  //   console.log('onUnloadonUnloadonUnloadonUnloadonUnloadonUnloadonUnload')
  //   if (typeof this.$options.data === 'function') {
  //     try {
  //       Object.assign(this.$data, this.$options.data());
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  // },
  methods: {
     /**
     * @description 隐藏页面加载loading
     */
    hidePageLoading () {
      setTimeout(() => { //定时器避免关闭太快出现闪烁状态
        console.log('//关闭页面加载Loading')
        this.showPageLoading = false //关闭页面加载Loading
      },1000)

    },

    /**
     * @description 显示页面加载loading
     */
    shownPageLoading () {
      this.showPageLoading = true //显示页面加载Loading
    }
  }
}
