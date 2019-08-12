<template>
  <div class="pwd-form">
    <div>
      <div class="title">请回答安全问题</div>
      <div class="desc">{{ question || '加载中...' }}</div>
      <div class="input-box">
        <input type="text" placeholder="请输入答案" v-model="answer" :focus="focus">
      </div>
      <button class="input-button" hover-class="button-hover" :disabled="!answer" @click="sumbit">完成</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api';

  export default {
    data () {
      return {
        question: '',
        answer: '',
        focus: false
      }
    },

    methods: {
      sumbit() {
        wx.showLoading()
        Api.user.validAnswer({
          answer: this.answer
        })
        .then(res => {
          wx.hideLoading()
          if(res.code === Api.CODES.SUCCESS) {
            wx.redirectTo({
              url: '/pages/password/modify/main?action=find'
            })
          } else {
            wx.showToast({
              title: res.message,
              // title: '您输入的答案有误~',
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
      }
    },

    onLoad() {
      Api.user.getSafeQuestion().then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.question = res.data.question
          this.focus = true
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    }
  }
</script>

<style>
  page { background-color: #F6F6F6; }
</style>

<style lang="scss" scoped>
  .pwd-form {
    .desc {
      text-align: left;
      margin-top: 30rpx;
      font-size: 34rpx;
      + .input-box {
        margin-top: 16rpx;
      }
    }
  }
</style>
