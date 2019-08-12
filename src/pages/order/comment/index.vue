<template>
  <div class="weui-cells comment">
    <div class="weui-cell comment__raters">
      <div class="weui-cell__bd">
        <div>
          乐家服务
          <rater v-model="storeScores"></rater>
        </div>
        <div>
          物流服务
          <rater v-model="logisticsScores"></rater>
        </div>
        <div>
          商品质量
          <rater v-model="goodsScore"></rater>
        </div>
      </div>
    </div>
    <div class="weui-cell comment__form">
      <div class="weui-cell__bd">
        <textarea placeholder="分享您的购买心得" v-model.trim="comment" :maxlength="MAX_INPUT_LENGTH"></textarea>
        <div class="comment__form__cd">{{ inputCountdown }}</div>
        <div class="comment__form__images">
          <image-uploader v-model="img"></image-uploader>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <button type="primary" :disabled="!comment" @click="submit">提 交</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import Rater from '@/components/Rater'
  import ImageUploader from '@/components/ImageUploader'

  const MAX_INPUT_LENGTH = 100

  export default {
    components: {
      Rater,
      ImageUploader
    },

    data () {
      return {
        orderId: '',
        storeScores: 0,
        logisticsScores: 0,
        goodsScore: 0,
        comment: '',
        img: '',
        MAX_INPUT_LENGTH
      }
    },

    computed: {
      inputCountdown() {
        return MAX_INPUT_LENGTH - this.comment.length
      }
    },

    methods: {
      submit() {
        wx.showLoading({ title: '提交中', mask: true })
        Api.evaluate.save({
          orderId: this.orderId,
          storeScores: this.storeScores,
          logisticsScores: this.logisticsScores,
          goodsScore: this.goodsScore,
          comment: this.comment,
          img: this.img
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            getApp().globalData.orderCommentted = true
            wx.redirectTo({
              url: `/pages/order/commenthistory/main?id=${ this.orderId }`
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch()
        .then(e => wx.hideLoading())
      }
    },

    onLoad(e) {
      if (e.id) {
        this.orderId = e.id
      } else {
        wx.showToast({ title: '参数异常', icon: 'none' })
        wx.navigateBack()
      }
    }
  }
</script>

<style>
  page { background-color: #F5F5F5 }
</style>

<style lang="scss" scoped>
  .comment {
    &__raters {
      padding-bottom: 50rpx;
      line-height: 60rpx;
      font-size: 30rpx;
      /deep/ .rater {
        margin-left: 16rpx;
        display: inline-block;
      }
    }
    &__form {
      position: relative;
      padding-top: 30rpx;
      padding-bottom: 60rpx;
      textarea {
        width: 90%;
        height: 240rpx;
        font: 30rpx;
      }
      &__cd {
        position: absolute;
        top: 30rpx;
        right: 30rpx;
        font-size: 30rpx;
        color: $text-gray;
      }
      &__images {
        margin-top: 20rpx;
      }
    }
  }
</style>
