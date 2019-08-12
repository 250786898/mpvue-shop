<template>
  <div>
    <div class="weui-cells weui-cells_pure">
      <div class="weui-cell" v-for="(item,index) of list" :key="item.storeId" @click="openLocation(item)" hover-class="navigator-hover">
        <div class="weui-cell__bd">
          <div class="shop-name">{{item.storeName}}</div>
          <div class="shop-address">{{item.storeAddress}}</div>
        </div>
        <div class="weui-cell__ft">
          <div class="shop-distance">
            <img src="/static/images/common_icon_greenlocation@2x.png">
            <div>{{item.storeDistance}}公里</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => ([])
      }
    },

    methods: {
      openLocation(item) {
        wx.openLocation({
          latitude: item.storeLat,
          longitude: item.storelng,
          name: item.storeName,
          address: item.storeAddress
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shop {
    &-name {
      margin-bottom: 10rpx;
      font-size: 32rpx;
      color: $text-black;
      font-weight: 700;
    }
    &-address {
      font-size: 30rpx;
      color: $text-gray;
    }
    &-distance {
      font-size: 26rpx;
      text-align: center;
      color: $text-gray;      
      img {
        vertical-align: middle;
        width: 50rpx;
        height: 50rpx;
        margin-bottom: 10rpx;
      }
    }
  }
  
  .weui-cell__bd {
    padding-right: 80rpx;
  }
</style>
