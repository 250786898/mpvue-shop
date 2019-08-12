<template>
  <div>
    <div class="tip" v-if="tipShown">完善个人信息,有助于我们为您提供更好的会员服务</div>
    <div class="lj-form">
      <form>
        <div class="weui-cells weui-cells_after-title weui-cells_no-border">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              真实姓名
            </div>
            <div class="weui-cell__bd">
              <input type="text" v-model.trim="profile.truename" placeholder="请输入真实姓名"
                :class="{ 'valid-error': truenameError }" :disabled="!isFirstSubmit">
            </div>
          </div>
  
          <!-- NOTE: 手机号码不可修改 -->
          <div class="weui-cell">
            <div class="weui-cell__hd">
              手机号
            </div>
            <div class="weui-cell__bd">
              <input type="text" v-model="profile.mobile" placeholder="请输入手机号" disabled>
            </div>
          </div>

          <div class="weui-cell">
            <div class="weui-cell__hd"></div>
            <div class="weui-cell__bd">
              <radio-group class="radio-group" @change="onSexChange">
                <label class="radio weui-check__label"  v-for="item in sexArray" :key="item.value">
                  <radio class="weui-check" :value="item.value" :checked="item.value == profile.sex" />
                  <icon class="weui-icon-radio" type="success" size="20" color="#10D7C0" v-if="item.value == profile.sex"></icon>
                  <div v-else class="radio-placeholder"></div>
                  <span>{{ item.label }}</span>
                </label>
              </radio-group>
            </div>
          </div>

          <div class="weui-cell">
            <div class="weui-cell__hd">
              生日
            </div>
            <div class="weui-cell__bd">
              <picker @change="onBirthChange" :value="profile.birthday" mode="date" :disabled="!isFirstSubmit">
                <view class="picker" :class="{ 'valid-error': birthdayError }">
                  <template v-if="profile.birthday">{{ profile.birthday }}</template>
                  <div v-else class="picker__placeholder">请选择生日</div>
                </view>
              </picker>
            </div>
          </div>

          <!-- <div class="weui-cell">
            <div class="weui-cell__hd">
              学历
            </div>
            <div class="weui-cell__bd">
              <picker @change="onEduChange" :value="profile.education" :range="eduArray">
                <view class="picker picker_triangle" :class="{ 'valid-error': educationError }">
                  <template v-if="profile.education">{{ profile.education }}</template>
                  <div v-else class="picker__placeholder">请选择学历</div>
                </view>
              </picker>
            </div>
          </div> -->

          <!-- <div class="weui-cell">
            <div class="weui-cell__hd">
              婚姻状况
            </div>
            <div class="weui-cell__bd">
              <picker @change="onMarryChange" :value="profile.maritalStatus" :range="marryArray">
                <view class="picker picker_triangle" :class="{ 'valid-error': maritalStatusError }">
                  <template v-if="profile.maritalStatus">{{ profile.maritalStatus }}</template>
                  <div v-else class="picker__placeholder">请选择婚姻状况</div>
                </view>
              </picker>
            </div>
          </div> -->
        </div>

        <div class="lj-form__ft">
          <button type="primary" class="radius" hover-class="button-hover" @click="submit">提 交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    data () {
      return {
        sexArray: [
          { label: '女士', value: 1 },
          { label: '先生', value: 0 }
        ],
        // eduArray: ['', '小学', '初中', '高中', '大专', '本科', '研究生', '博士'],
        // marryArray: ['', '未婚', '已婚'],

        truenameError: false,
        birthdayError: false,
        // educationError: false,
        // maritalStatusError: false,

        tipShown: false,

        profile: {},

        isFirstSubmit: true //是否第一次修改生日
      }
    },


    methods: {
      onSexChange(e) {
        this.profile.sex =  e.mp.detail.value
      },

      onBirthChange(e) {
        this.profile.birthday = e.mp.detail.value
      },

      // onEduChange(e) {
      //   this.profile.education = this.eduArray[e.mp.detail.value]
      // },

      // onMarryChange(e) {
      //   this.profile.maritalStatus = this.marryArray[e.mp.detail.value]
      // },

      submit() {
        
          this.truenameError = !this.profile.truename
          this.birthdayError = !this.profile.birthday
          // this.educationError = !this.profile.education
          // this.maritalStatusError = !this.profile.maritalStatus

          if (!this.truenameError && !this.birthdayError ) {
            this.updateProfile()
          }
        
      },

      getProfile() {
        Api.user.profile()
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.profile = res.data
            this.tipShown = !this.profile.birthday
            console.log(this.profile.birthday)
            if(this.profile.birthday != '') {
                this.isFirstSubmit = false
            }
          }
        })
      },

      updateProfile() {
        wx.showLoading({
          title: '提交中',
          mask: true
        })
        Api.user.updateProfile(this.profile)
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            wx.showToast({ title: '提交成功~' })
            this.tipShown = false
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

    onLoad() {
      this.getProfile()      
    }
  }
</script>

<style lang="scss" scoped>
  .tip {
    font-size: 28rpx;
    color: #F20F20;
    background-color: #F4F4F4;
    padding: 14rpx 30rpx;
  }

  .lj-form {
    margin-top: 20rpx;
    .radio-group {
      display: -webkit-flex;
      display: flex;
      label {
        flex: 1;
      }
      .weui-check__label {
        font-size: 30rpx;
        .radio-placeholder {
          display: inline-block;
          background: #FFF;
          border: 2rpx solid #DDD;
          border-radius: 20rpx;
          margin-left:6.4rpx;
          margin-right:6.4rpx;
          width: 36rpx;
          height: 36rpx;
          vertical-align: middle;
        }
        icon {
          height: 40rpx;
        }
        span {
          margin-left: 10rpx;
          vertical-align: middle;
        }
      }
    }
    &__ft button {
      margin-top: 140rpx;
      width: 532rpx;
    }
  }
</style>
