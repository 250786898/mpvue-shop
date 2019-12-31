<template>
  <div class="card">
    <div class="card-content">
       <div class="goods-img">
        <img :src="item.goodsImage"  mode="aspectFit" >
      </div>
      <div class="card-main">
        <div>
          <div class="goodsName">{{ item.goodsName }}</div>
          <!-- <div class="pickup-time">可提货</div> -->
        </div>
        <div class="card-main-content">
          <OnlinePrice :price="item.goodsPayPrice" />
          <div class="goods-num">
          数量 ×{{ item.goodsNum || 0 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
export default {
  components: {
    OnlinePrice
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  padding: 0 30rpx;
  box-sizing: border-box;
  &-content{
    padding: 30rpx 0rpx;
    display: flex;
    border-bottom: 1rpx solid #E4E4E4;
  }
  .goods-img {
    width: 192rpx;
    height: 192rpx;
    margin-right: 21rpx;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .card-main{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    .goodsName{
      font-size: 32rpx;
      line-height: 45rpx;
      width: 425rpx;
      margin-bottom: 2rpx;
      position: relative;
      top: -6rpx;
    }
    .pickup-time{
      color: #787878;
      font-size: 26rpx;
    }
    &-content{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .goods-num{
        color: #999999;
        font-size: 28rpx;
      }
    }
  }
}
</style>
