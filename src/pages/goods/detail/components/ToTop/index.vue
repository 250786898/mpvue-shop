<template>
  <div  class="returntop">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/details_btn_top@2x.png" v-if="backToTopButtonShowed" @click="returnTop">
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
  right: 30rpx;
  bottom: 160rpx;
  img{
    width: 84rpx;
    height: 84rpx;
  }
}
</style>
