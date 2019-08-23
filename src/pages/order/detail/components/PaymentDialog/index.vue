<template>
  <div v-if="shown">
    <div class="backdrop" @click="$emit('update:shown', false)"></div>
    <div class="lj-dialog">
      <div class="lj-dialog__hd">
        <img src="/static/images/membershipcard_icon_cancel@2x.png" class="lj-dialog__cancel-btn" @click="$emit('update:shown', false)">
        <div class="lj-dialog__title">请选择支付方式</div>
      </div>
      <div class="lj-dialog_bd">
        <div class="payment">
          <div class="payment__bill">
            <div class="payment__bill__title">{{ title }}</div>
            <div class="payment__bill__price">￥{{ amount }}</div>
          </div>
          <!-- 支付方式 -->
          <div class="payment__list">
            <radio-group>
              <label class="weui-cell weui-check__label">
                <!-- <radio class="weui-check" value="1" :checked="true"/> -->
                <div class="weui-cell__hd">
                  <img src="/static/images/membershipcode_icon_membershipcard@2x.png">
                </div>
                <div class="weui-cell__bd">
                  会员卡支付（￥{{ balance }}）
                </div>
              </label>
              <!--
              <label class="weui-cell weui-check__label">
                <radio class="weui-check" value="1" :checked="false" color="red"/>
                <div class="weui-cell__hd">
                  <img src="/static/images/common_icon_wechat@2x.png">
                </div>
                <div class="weui-cell__bd">
                  微信支付
                </div>
              </label>
            -->
            </radio-group>
          </div>
          <!-- 密码 -->
          <div class="payment__pwd">
            <password v-model="input" @complete="onComplete" ref="password"></password>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import Password from '@/components/Password'

  export default {
    components: {
      Password
    },

    props: {
      shown: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '广州乐家生鲜农产品有限公司'
      },
      amount: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        balance: 0,
        input: ''
      }
    },

    methods: {
      onComplete(e) {
        this.$emit('complete', e)
        this.$emit('update:shown', false)
      }
    },

    watch: {
      shown: {
        immediate: true,
        handler(shown) {
          if (shown) {
            this.input = ''
            Api.user.personCenter().then(res => {
              if (res.code === Api.CODES.SUCCESS) {
                this.balance = res.data.balance
              }
            })
            setTimeout(() => this.$refs.password.setFocus(), 200)
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .lj-dialog {
    top: 40%;
    &__hd {
      position: relative;
      > img {
        position: absolute;
        top: 15rpx;
        left: 15rpx;
        width: 58rpx;
        height: 58rpx;
      }
    }
  }

  .payment {
    &__bill {
      padding: 20rpx;
      &__title {
        font-size: 30rpx;
        line-height: 60rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &__price {
        font-size: 62rpx;
        line-height: 100rpx;
      }
    }
    &__list {
      border-top: 1rpx solid #D2D3D5;
      border-bottom: 1rpx solid #D2D3D5;
      .weui-cell {
        padding-top: 14rpx;
        padding-bottom: 14rpx;
        padding-left: 40rpx;
        &__hd {
          img {
            vertical-align: -8rpx;
            width: 54rpx;
            height: 54rpx;
          }
        }
        &__bd {
          padding-left: 12rpx;
          font-size: 30rpx;
          color: $text-black;
          text-align: left;
        }
        &:before {
          left: 0;
        }
      }
    }
    &__pwd {
      padding: 50rpx;
      /deep/ .password {
        margin: 0 auto;
      }
    }
  }
</style>