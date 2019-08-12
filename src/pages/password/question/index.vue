<template>
  <div class="pwd-form">
    <div :hidden="step !== 1" class="questions">
      <div class="weui-cells__title">请选择回答安全问题</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell" hover-class="weui-cell_active" v-for="item in questions" :key="item"
          @click="selecteQuestion(item)">
          {{ item }}
        </div>
      </div>
    </div>

    <div :hidden="step !== 2">
      <div class="title">请回答安全问题</div>
      <div class="desc">{{ question }}</div>
      <div class="input-box">
        <input type="text" v-model.trim="answer" placeholder="请输入答案" :focus="focus">
      </div>
      <button :disabled="!answer" class="input-button" hover-class="button-hover" @click="submit">完成</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api';

  export default {
    data () {
      return {
        step: 1,
        question: '',
        questions: [
          '我的姓名？',
          '最喜欢的宠物是什么？',
          '最喜欢的运动是什么？',
          '我爸爸的生日是几月几号？',
          '最喜欢的宠物是什么？',
          '最喜欢的运动是什么？'
        ],
        answer: '',
        password: '',
        focus: false
      }
    },

    methods: {
      selecteQuestion(q) {
        this.question = q
        this.step = 2
        setTimeout(() => this.focus = true, 500)
      },

      submit() {
        wx.showLoading({
          title: '提交中',
          mask: true
        })
        Api.user.setPayPwd({
          password: this.password,
          checkPassword: this.password,
          question: this.question,
          answer: this.answer
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            wx.showToast({ title: '设置完成' })
            wx.navigateBack()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      }
    },

    onLoad(e) {
      this.password = e.password
    }
  }
</script>

<style>
  page { background-color: #F6F6F6; }
</style>

<style lang="scss" scoped>
  .questions {
    margin: -60rpx;
    text-align: left;
    .weui-cells {
      &:before { display: none; }
      &:after { border-color: #DEDEDE; }

      &__title {
        margin-bottom: 0;
        font-size: 36rpx;
        color: #000;
      }
    }
    .weui-cell {
      font-size: 32rpx;
      &:before {
        left: 0;
        border-color: #DEDEDE;
      }
    }
  }

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
