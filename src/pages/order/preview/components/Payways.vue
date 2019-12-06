<template>
  <div class="payways" >
    <div class="xian"></div>
    <div class="weui-cells__title" v-if="title">{{ title }}</div>
    <div class="weui-cells weui-cells_after-title">
      <radio-group @change="radioChange">
        <label class="weui-cell weui-check__label" v-for="item in payways" v-bind:key="item.value">
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
            icon: 'https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_icon_wechat@2x.png',
            value: 'weixinAppletPaymentPlugin'
          }
        ]
      }
    },

    methods: {
      radioChange(e) {
        this.$emit('change', e.mp.detail.value)
      }
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
