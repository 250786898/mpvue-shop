<template>
  <div v-if="shown">
    <div class="backdrop"></div>
    <div class="vip-dialog">
      <div class="vip-dialog__container">
        <h4 class="vip-dialog__title">会员权益说明</h4>
        <div class="vip-dialog__bd">
          <div class="vip-dialog__li">
            <div class="vip-dialog__li__title">开卡大礼包</div>
            <div class="vip-dialog__li__desc">
            ①开卡会员立即到账 4张5元优惠券；
            ②此券可在乐家生鲜fresh使用，线下门店不可用；
            ③可与免运券同享，不可与其他优惠同享。
            </div>
          </div>
          <div class="vip-dialog__li">
            <div class="vip-dialog__li__title">会员专享价</div>
            <div class="vip-dialog__li__desc">①乐享会员及试用会员均可享受商品会员价；
            ②可享受门店每周商品会员价，具体以门店实际信息为准；
            ③可与优惠券叠加使用。
            </div>
          </div>
          <div class="vip-dialog__li">
            <div class="vip-dialog__li__title">积分多倍</div>
            <div class="vip-dialog__li__desc">乐享VIP每个订单所积累的积分直接加（x）倍
积累的积分可以在积商城兑换兑换喜欢的商品，或者线下门店积分兑换商品。
说明：
①积分是按照订单实际支付金额获得（实付金额不包括；活动赠送金额；会员已返现额；公司赠送金额或在线储值额）
②积分将在订单签收到返到用户账户中。
            </div>
          </div>
          <div class="vip-dialog__li">
            <div class="vip-dialog__li__title">周三会员日</div>
            <div class="vip-dialog__li__desc">①乐享会员及试用会员均可享受会员日商品折扣；
②周三会员日是乐享会员专属权益日，当天更多惊喜活动；
③指定商品享受不同折扣价，会员日商品5折起；活动期间将会在首页专设活动入口，内有更多意想不到的会员超低价商品出现，并且有更多不同的会员专属福利可领取。
④可与优惠券叠加使用。
            </div>
          </div>
          <div class="vip-dialog__li">
            <div class="vip-dialog__li__title">会员生日礼包</div>
            <div class="vip-dialog__li__desc">①生日当天立赠8.8折优惠券，此券可在乐家生鲜fresh使用；
②更多惊喜好礼，敬请留意最新的活动信息。
            </div>
          </div>
        </div>
        <div class="vip-dialog__close" @click.stop="$emit('closeDialog', false)">
          <icon type="cancel" size="40" color="#FDC360"></icon>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
  export default {
    name: 'VipRightDialog',
    props: {
      shown: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vip-dialog {
    &__bd {
      height:800rpx;
      overflow-y: scroll;
    }
    .weui-cells {
      margin-top: 0;
      margin-bottom: 60rpx;
      background-color: transparent;
      &:before {
        display: none;
      }
      &:after {
        border-color: #DBAD4F;
      }
    }
    .weui-cell {
      padding-left: 0;
      padding-right: 0;
      align-items: flex-start;
      &:before {
        left: 0;
        border-color: #DBAD4F;
      }
      &__bd {
        h4 {
          margin-bottom: 4rpx;
          font-size: 30rpx;
          font-weight: 700;
        }
        p {
          font-size: 24rpx;
          opacity: 0.6;
        }
      }
      &__ft {
        font-weight: 700;
        font-size: 28rpx;
        color: #F2D28C;
      }
    }
  }
</style>
