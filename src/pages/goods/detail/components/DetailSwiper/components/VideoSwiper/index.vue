<template>
  <div class="video-wrap">
    <video  :src="videoSrc" class="video-item"></video>
  </div>
</template>

<script>
export default {
  props: {
    videoSrc: { //video 路径
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrap{
  width: 750rpx;
  height: 750rpx;
  .video-item{
    width: 100%;
    height: 100%;
  }
}
</style>
