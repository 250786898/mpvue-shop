<template>
  <div class="video-wrap">
    <video  src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/aaa.mp4" class="video-item"></video>
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
