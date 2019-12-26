<template>
  <img :src="imgSrc" class="activity-bg">
</template>

<script>
export default {
  props: {
    imgSrc: { //背景图片路径
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-bg{
  position: absolute;
  width: 750rpx;
  height: 595rpx;
  top: 0;
  left: 0;
}
</style>
