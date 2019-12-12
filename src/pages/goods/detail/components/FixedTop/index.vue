<template>
  <div class="fixed-wrap" v-if="fiexedShow">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575880871268.jpg" mode="aspectFit" class="goods-img" >
    <OnlinePrice />
  </div>
</template>

<script>
import OnlinePrice from "@/components/OnlinePrice"
export default {
  components: {
    OnlinePrice
  },
  data () {
    return {
      fiexedShow: false //悬浮是否显示
    }
  },
  onPageScroll (e) {
    if(e.scrollTop >= 375) {
      this.fiexedShow = true
    }else{
      this.fiexedShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes fadeInDown{
  from {
    transform: translateY(-100%);

  }
  to {
    transform: translateY(0);
  }
}
.fixed-wrap {
  height:106rpx;
  width: 100vw;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 10;
  animation: fadeInDown .3s linear;
  .goods-img{
    width: 91rpx;
    height: 91rpx;
  }
}
</style>
