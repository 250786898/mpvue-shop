<template>
  <div class="payways" >
    <div class="xian"></div>
    <div class="weui-cells__title" v-if="title">{{ title }}</div>
    <div class="weui-cells weui-cells_after-title">
      <radio-group @change="radioChange">
        <label class="weui-cell weui-check__label" v-for="item in payways" :key="index">
          <radio class="weui-check" :value="item.value" :checked="item.value === value" />
          <div class="weui-cell__hd">
            <img :src="item.icon">
          </div>
          <div class="weui-cell__bd">{{ item.name }}</div>
          <div class="weui-cell__ft weui-cell__ft_in-radio">
            <icon class="weui-icon-radio" type="success" size="22" color="#0FD4BE" v-if="item.value === value"></icon>
            <div v-else class="radio-placeholder"></div>
          </div>
        </label>
      </radio-group>
      <template v-if="false">
        <label class="weui-cell weui-check__label" style="padding-top: 0;">
          <switch type="checkbox" class="weui-check" :checked="pp" @change="onPpChange" />
          <div class="weui-cell__hd">
            <img src="/static/images/details_icon_integral@2x.png">
          </div>
          <div class="weui-cell__bd">积分支付(最多使用{{ rewardPoint }}积分）</div>
          <div class="weui-cell__ft weui-cell__ft_in-radio">
            <icon class="weui-icon-radio" type="success" size="22" color="#0FD4BE" v-if="pp"></icon>
            <div v-else class="radio-placeholder"></div>
          </div>
        </label>
      </template>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: 'weixinAppletPaymentPlugin' 
      },
      // 是否使用积分
      pp: {
        type: Boolean,
        default: false
      },
      rewardPoint: {
        type: Number,
        default: 0
      }
    },

    model: {
      prop: 'value',
      event: 'change'
    },

    data() {
      return {
        payways: [
          {
            name: '微信支付',
            checked: true,
            icon: '/static/images/common_icon_wechat@2x.png',
            value: 'weixinAppletPaymentPlugin'
          },
          // {
          //   name: '会员卡支付(剩余：￥0.00）',
          //   checked: false,
          //   icon: '/static/images/common_icon_vip@2x.png',
          //   value: 'balancePaymentPlugin'
          // }
        ],
        balance: 0
      }
    },

    methods: {
      radioChange(e) {
        this.$emit('change', e.mp.detail.value)
      },

      onPpChange(e) {
        this.$emit('update:pp', e.mp.detail.value)
      }
    },

    onLoad() {
      // Api.user.personCenter().then(res => {
      //   if (res.code === Api.CODES.SUCCESS) {
      //     this.payways[1].name = `会员卡支付(剩余：￥${ res.data.balance }）`
      //     this.balance = res.data.balance
      //   }
      // })
    }
  }
</script>

<style lang="scss" scoped>
  .payways {
    position: relative;
    margin-top: 20rpx;
    width: 702rpx;
    border-radius: 14rpx;
    .xian{
       width: 702rpx;
        height: 1rpx;
        background:rgba(204,204,204,1);
        opacity:0.4;
        position: absolute;
        top:85rpx;
        left:0rpx;
        z-index: 1;
    }
    .weui-cells {
      &:before,
      &:after {
        display: none;
      }
      &__title {
        margin: 0;
        line-height: 80rpx;
        background-color: #fff;
        font-size: 28rpx;
        color: $text-black;
      }
    }
    .weui-cell {
      padding-top: 28rpx;
      padding-bottom: 28rpx;
      &:before {
        display: none;
      }
      &__hd {
        margin-right: 20rpx;
        img {
          width: 56rpx;
          height: 56rpx;
          vertical-align: middle;
        }
      }
      &__bd {
        font-size: 28rpx;
      }
      + .weui-cell {
        padding-top: 0;
      }
    }
    &_nogap {
      margin-top: 0;
    }

    .radio-placeholder {
      margin: 0 6rpx;
      width: 40rpx;
      height: 40rpx;
      border: 2rpx solid #D2D2D2;
      border-radius: 24rpx;
    }
  }
</style>