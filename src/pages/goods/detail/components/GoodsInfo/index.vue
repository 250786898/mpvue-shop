<template>
  <div class="good-buy-bar">
     <div class="price-box">
       <span class="current-price"  v-if="currentPrice">￥{{currentPrice}}</span>
       <span class="original-price" v-if="originalPrice">￥{{originalPrice}}</span>
     </div>  
      <div class="end-time-box">
        <div class="end-time-box__title">距离结束时间</div>
        <countdowner :countdown="100"></countdowner>
      </div>  
  </div>
</template>

<script>
import Countdowner from '@/components/Countdowner'
export default {
  props: {
    currentPrice:{
      type: String,
      default: ''
    },
    originalPrice:{
      type: String,
      default: ''
    }
  },
  components: {
    Countdowner
  }
}
</script>

<style lang="scss" scoped>
  .good-buy-bar{
    width:100vw;
    height:120rpx;
    background:linear-gradient(90deg,rgba(18,205,207,1),rgba(12,225,179,1));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25rpx;
    box-sizing: border-box;
    .current-price{    
      font-weight:bold;
      font-size: 72rpx;
    }
    .original-price{
      font-size: 28rpx;
      text-decoration: line-through;
      margin-left: 8rpx;
    }
    .end-time-box{
      color: #0C524D;
      font-size: 24rpx;
      &__title{
        padding-bottom: 15rpx;
      }
    }
  }
</style>