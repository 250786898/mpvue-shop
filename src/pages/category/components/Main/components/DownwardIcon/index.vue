<template>
  <div class="downward-icon" @click="showAllCategory">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/cate-downward-icon.png" alt="">
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * @description 点击向下按钮，显示全部二级分类
     */
    showAllCategory () {
      this.$emit('showAllCategory')
    }
  }
}
</script>

<style lang="scss" scoped>
 .downward-icon{
  width: 75rpx;
  height: 100rpx;
  position: absolute;
  background: #fff;
  display: flex;
  align-items: center;
  right: 0;
  z-index: 9;
  top: 0;
  text-align: center;
  justify-content: center;
  img{
    width:28rpx;
    height: 16rpx;
  }
}
</style>
