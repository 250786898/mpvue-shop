<template>
  <div>
    <div class="weui-cell">
      <div class="textarea-wrap">
        <textarea v-model.trim="content" placeholder="请反馈内容"></textarea>
      </div>
    </div>
    <div class="footer-bar">
      <button type="primary" class="bg-light" :disabled="!content" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    data () {
      return {
        id: '',
        content: ''
      }
    },

    methods: {
      submit() {
        wx.showLoading({ title: '提交中', mask: true })
        Api.refund.addConsult({
          id: this.id,
          content: this.content
        })
        .then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            wx.showToast({
              title: '提交成功'
            })
            wx.navigateBack()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
      }
    },

    onLoad(e) {
      this.id = e.id
      this.content = ''
    }
  }
</script>

<style>
  page {
    background-color: #F5F5F5;
    padding-bottom: 120rpx;
  }
</style>

<style lang="scss" scoped>
  .weui-cell {
    padding-bottom: 400rpx;
    background-color: #fff;
    .textarea-wrap {
      width: 100%;
      height: 380rpx;
      border: 1rpx solid #DEDEDE;
      border-radius: 2rpx;
      padding: 15rpx 20rpx;
      textarea {
        width: 100%;
        height: 100%;
        font-size: 32rpx;
      }
    }
  }
</style>
