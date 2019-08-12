<template>
  <div>
    <ul class="list">
      <li v-for="(item, index) in list" :key="item.id" :class="{ last: index === 0 }">
        <icon type="success" size="20" color="#0FD7C0" v-if="index === 0"></icon>
        {{ item.stateInfo }}
        <p>{{ item.createTime }}</p>
      </li>
      <!-- <li>
        快递小哥  小超越 电话 <span style="color: #0FD7C0;">15112953860</span> 乐家派件中,记得保持电话通畅,请等我哦~
        <p>2018-08-26 20:30:01 </p>
      </li> -->
    </ul>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    data () {
      return {
        list: []
      }
    },

    onLoad(e) {
      this.orderId = e.id
      wx.showLoading({ title: '加载中' })
      Api.order.log({ orderId: this.orderId })
      .then(res => {
        wx.hideLoading()
        if (res.code === Api.CODES.SUCCESS) {
          this.list = res.data.reverse()
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
      .catch(e => wx.hideLoading())
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 70rpx;
      left: 50rpx;
      bottom: 100rpx;
      width: 4rpx;
      background-color: #DEDEDE;
    }
    li {
      position: relative;
      padding: 40rpx 30rpx 40rpx 88rpx;
      font-size: 28rpx;
      color: $text-black;
      word-break: break-all;
      &:before {
        content: '';
        position: absolute;
        top: 46rpx;
        left: 36rpx;
        width: 32rpx;
        height: 32rpx;
        border-radius: 16rpx;
        background-color: #0FD7C0;
      }
      &.last {
        &:before {
          display: none;
        }
        icon {
          position: absolute;
          top: 42rpx;
          left: 32rpx;
        }
      }
      p {
        color: $text-gray;
      }
    }
  }
</style>
