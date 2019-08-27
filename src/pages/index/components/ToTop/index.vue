<template>
  <div  class="returntop">
    <img src="/static/images/home_btn_top@2x.png" v-if="backToTopButtonShowed" @click="returnTop">
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      backToTopButtonShowed: false, //返回顶部按钮是否显示
    }
  },
  methods: {
    /**
     * @description 回到顶部
     */
    returnTop() {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({ scrollTop: 0 })
      }
    }
  },

  /**
   * @description 滚动到200的时候显示按钮
   */
  onPageScroll(e) {
    this.backToTopButtonShowed = e.scrollTop >= 200
  }
}
</script>

<style lang="scss" scoped>
.returntop {
  position: fixed;
  right: 6rpx;
  bottom: 35rpx;
  img{
   width: 100rpx;
    height: 100rpx;
  }
}
</style>