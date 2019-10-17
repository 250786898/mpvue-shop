<template>
  <div class="coupon-card">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/qrcode_bg_coupon@2x.png" class="coupon-card__bg" mode="widthFix"/>

    <!-- 已使用 -->
    <img v-if="status == 1" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/coupon_label_used@2x.png" class="stamp">
    <img v-else-if="status == 2" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/coupon_label_expired@2x.png" class="stamp">

    <div class="weui-panel weui-panel_access coupon-item">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <template v-if="item.limitType == 0">
              <div class="coupon-item__price">不限</div>
            </template>
            <template v-else>
              <div class="coupon-item__price">￥<span>{{ item.couponAmount }}</span></div>
              <div class="coupon-item__price-tip">{{ item.useLimit }}</div>
            </template>
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">
              {{ item.couponName }}
              <template v-if="status === 0">
                <!-- 线下使用 -->
                <!-- TODO: 图标不对 -->
                <navigator :url="'/pages/coupon/qrcode/main?id='+item.couponId" class="weui-cell__ft"
                  v-if="item.showUseCode">
                  <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/orderdetails_img_qrcode.png">
                </navigator>
                <!-- 线上使用 -->
                <template v-else>
                  <navigator v-if="item.showUSEntrance && item.showUGEntrance"
                    :url="'/pages/coupon/goods/main?id=' + item.couponId"
                    class="weui-cell__ft weui-cell__ft_in-access"
                    style="width: 40rpx; height: 40rpx;">
                  </navigator>
                  <navigator v-else-if="item.showUSEntrance" :url="'/pages/coupon/goods/shop?id=' + item.couponId" class="weui-cell__ft weui-cell__ft_in-access" style="width: 40rpx; height: 40rpx;"></navigator>
                  <navigator v-else url="/pages/index/main" open-type="switchTab" class="weui-cell__ft weui-cell__ft_in-access" style="width: 40rpx; height: 40rpx;"></navigator>
                </template>
              </template>
            </div>
            <div class="weui-media-box__desc">{{ item.startTime }}至{{ item.endTime }}</div>
          </div>
        </div>
      </div>
      <div class="weui-panel__ft">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <!-- 限门店限商品 -->
          <div class="weui-cell__bd">
            <template v-if="item.showUSEntrance && item.showUGEntrance">
              指定部分商品及门店适用
              <navigator :url="'/pages/coupon/goods/main?id=' + item.couponId" v-if="status === 0">查看适用门店</navigator>
            </template>
            <template v-else-if="item.showUSEntrance">
              指定门店适用
              <navigator :url="'/pages/coupon/shop/main?id=' + item.couponId" v-if="status === 0">查看适用门店</navigator>
            </template>
            <template v-else>
              全部商品门店适用
              <navigator url="/pages/index/main" open-type="switchTab" v-if="status === 0">去使用</navigator>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      // online offline
      useway: {
        type: String,
        default: 'online'
      },
      status: {
        type: Number,
        default: 0 // 0为正常，1为已使用，2为已过期
      }
    }
  }
</script>

<style lang="scss" scoped>
  .coupon-card {
    position: relative;
    &__bg {
      width: 100%;
      height: 270rpx;
    }
  }

  .stamp {
    position: absolute;
    width: 126rpx;
    height: 126rpx;
    top: 20rpx;
    right: 20rpx;
  }

  .coupon-item {
    background-color: transparent;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 20rpx;
    &:before,
    &:after {
      display: none;
    }
    .weui-media-box {
      padding: 30rpx 10rpx;
      &__title {
        position: relative;
        margin-bottom: 12rpx;
        font-size: 32rpx;
        color: $text-black;
        .weui-cell__ft {
          position: absolute;
          right: 16rpx;
          top: 50%;
          transform: translateY(-50%);
          img {
            vertical-align: middle;
            width: 42rpx;
            height: 42rpx;
          }
        }
      }
      &__desc {
        -webkit-line-clamp: 1;
        font-size: 24rpx;
        color: $text-gray;
      }
      &__hd_in-appmsg {
        margin-right: 30rpx;
        width: 180rpx;
        height: 120rpx;
        line-height: 44rpx;
        border-right: 1rpx solid #ccc;
      }
    }

    .weui-panel__ft .weui-cell {
      padding: 18rpx 50rpx;
      font-size: 24rpx;
      color: $text-black;
      &:before {
        display: none;
      }
      navigator {
        display: inline-block;
        margin-left: 16rpx;
        padding: 0 20rpx;
        border: 2rpx solid #B1B1B1;
        line-height: 38rpx;
        border-radius: 20rpx;
      }
    }

    &__price {
      margin-top: 12rpx;
      font-size: 38rpx;
      color: $text-black;
      span {
        font-size: 66rpx;
      }
      &-tip {
        font-size: 24rpx;
        color: $text-gray;
      }
    }

    & + .coupon-item {
      margin-top: 16rpx;
    }
  }
</style>
