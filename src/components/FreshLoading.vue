<template>
  <div class="loading_container">
    <div class="load_img"
         :style="{backgroundPositionY: -(positionY%7)*100 + 'rpx'}">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      positionY: 0,
      loadTimer: null,
      ab:1
    }
  },
  mounted () {
    console.log('loadTimerloadTimerloadTimerloadTimerloadTimerloadTimerloadTimerloadTimerloadTimerloadTimerloadTimerloadTimerloadTimerloadTimer')
    this.loadTimer = setInterval(() => {
      this.positionY = this.positionY +1
    }, 600)
  },
  beforeDestroy () {
    clearInterval(this.loadTimer);
  }
}
</script>

<style lang="scss" scoped>
@keyframes load {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes ellipse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}
.loading_container {
  width: 100rpx;
  height: 100rpx;
}
.load_img {
  width: 100%;
  height: 100%;
  background: url(https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/icon_loading.png) no-repeat 0 0;
  background-size: 100rpx auto;
  transform: translateY(0px);
  animation: load 0.6s infinite ease-in-out;
  position: relative;
  z-index: 11;
}
</style>
