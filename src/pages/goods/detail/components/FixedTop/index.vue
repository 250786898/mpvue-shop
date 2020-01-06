<template>
  <div class="fixed-wrap" v-if="fiexedShow">
    <img :src="goodsBanner[0]" mode="aspectFit" class="goods-img" >
    <OnlinePrice :price="currentPrice" />
  </div>
</template>

<script>
import OnlinePrice from "@/components/OnlinePrice"
export default {
  components: {
    OnlinePrice
  },
   props: {
    currentPrice:{ //商品现在销售的价格
      type: String,
      default: ''
    },
    goodsBanner:{ //商品banner列表
      type: Array,
      default: []
    }
  },
  data () {
    return {
      fiexedShow: false //悬浮是否显示
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
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
