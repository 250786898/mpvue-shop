<template>
  <div class="card">
    <div class="goods-img">
      <img :src="item.goodsImage" mode="aspectFit" />
    </div>
    <div class="card-main">
      <div>
        <div class="goodsName">{{ item.goodsName }}</div>
        <div class="pickup-time">
          <!-- <span class="already-pickup" v-if="true">09月30日已提货</span> -->
          <!-- <span class="wait-pickup" v-else>×月×日可提货</span> -->
        </div>
      </div>
      <div class="after-sell" v-if="item.refundState != 0" @click="navToAfterSell">
        <div class="after-sell-btn">查看售后</div>
      </div>

      <div class="card-main-content">
        <OnlinePrice :price="item.onlinePrice" :signSize="22" :beforeSize="32" :afterSize="32" />
        <div class="goods-num">数量 ×{{ item.goodsNum || 0 }}</div>
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
  },
  methods: {
    /**
     * @description 查看售后
     */
    navToAfterSell () {
      wx.navigateTo({
        url: `/pages/order/returndetail/main?id=${this.item.refundId}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  display: flex;
  border-bottom: 1rpx solid #e8e8e8;
  padding: 30rpx 0;
  .goods-img {
    width: 192rpx;
    height: 192rpx;
    margin-right: 21rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .after-sell {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 26rpx;
    &-btn {
      width: 112rpx;
      height: 34rpx;
      line-height: 34rpx;
      text-align: center;
      border: 1px solid rgba(153, 153, 153, 1);
      border-radius: 4rpx;
      color: #999999;
      font-size: 22rpx;
    }
  }
  .card-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    .goodsName {
      font-size: 32rpx;
      line-height: 45rpx;
      width: 425rpx;
      margin-bottom: 2rpx;
      position: relative;
      top: -6rpx;
    }
    .pickup-time {
      color: #ff7200;
      font-size: 24rpx;
      margin-top: 10rpx;
      .already-pickup {
        color: #787878;
      }
    }
    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .goods-num {
        color: #999999;
        font-size: 28rpx;
      }
    }
  }
}
</style>
