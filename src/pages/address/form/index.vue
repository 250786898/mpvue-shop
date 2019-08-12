<template>
  <form>
    <div class="weui-cells weui-cells_form address-form">
      <!-- 联系人 -->
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="weui-label">联系人</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="收货人姓名" v-model.trim="form.userName">
        </div>
      </div>
      <!-- 称呼 -->
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="weui-label"></div>
        </div>
        <div class="weui-cell__bd">
          <radio-group class="radio-group" @change="radioChange">
            <div class="weui-flex">
              <label class="weui-flex__item weui-check__label" v-for="(item, index) in sexArray" :key="item">
                <radio class="weui-check" :value="index" :checked="form.sex == index"/>
                <icon class="weui-icon-radio" type="success" size="20" color="#10D7C0" v-if="form.sex == index"></icon>
                <div v-else class="radio-placeholder"></div>
                <span>{{ item }}</span>
              </label>
              <!-- <label class="weui-flex__item weui-check__label">
                <radio class="weui-check" value="女士" :checked="form.sex == '女士'"/>
                <icon class="weui-icon-radio" type="success" size="20" color="#10D7C0" v-if="form.sex == '女士'"></icon>
                <div v-else class="radio-placeholder"></div>
                <span>女士</span>
              </label> -->
            </div>
          </radio-group>
        </div>
      </div>
      <!-- 手机号 -->
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="配送员联系你的手机号" type="number" v-model.trim="form.phone">
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="weui-cell weui-cell_access" @click="chooseLocation">
        <div class="weui-cell__hd">
          <div class="weui-label">收货地址</div>
        </div>
        <div class="weui-cell__bd">
          <div v-if="form.areaInfo" class="fz30">
            {{ form.areaInfo }}
          </div>
          <div v-else class="placeholder">小区/写字楼/学校</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
      <!-- 门牌号 -->
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="weui-label">门牌号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="例如：6号楼606室" v-model.trim="form.address">
        </div>
      </div>
      <!-- 标签 -->
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="weui-label">标签</div>
        </div>
        <div class="weui-cell__bd">
          <div class="tag-list">
            <span v-for="label in labels"
              :class="{ active: form.label === label }"
              @click="form.label = label">
              {{ label }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="button-area">
      <button type="primary" class="radius bg-gradient" :disabled="!isValid" @click="submit">保存</button>
    </div>
  </form>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    components: {},

    data () {
      return {
        labels: ['家', '公司', '学校', '其他'],
        sexArray: ['先生', '女士'],
        form: {
          addressId: '',
          userName: '',
          sex: 0,
          phone: '',
          areaInfo: '',
          address: '',
          label: '家',
          provinceId: '',
          cityId: '',
          areaId: '',
          latitude: '',
          longitude: ''
        }
      }
    },

    computed: {
      isValid() {
        return this.form.userName &&
          this.form.phone &&
          this.form.areaInfo &&
          this.form.address
      }
    },

    methods: {
      chooseLocation() {
        wx.chooseLocation({
          success: res => {
            this.form.areaInfo = res.address
            this.form.latitude = res.latitude
            this.form.longitude = res.longitude
          }
        })
      },

      radioChange(e) {
        this.form.sex = e.mp.detail.value
      },

      submit() {
        if (!/^1\d{10}$/.test(this.form.phone)) {
          return wx.showToast({
            title: '手机号码格式不正确',
            icon: 'none'
          })
        }

        wx.showLoading({
          title: '提交中',
          mask: true
        })

        Api.address.saveOrUpdateAddress(this.form)
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            wx.showToast({
              title: '保存成功'
            })
            // 如果是来源订单页的地址新增，保存成功后自动选中
            if (this.$mp.page.options.op === 'select') {
              wx.showLoading({ mask: true })
              Api.address.addressList().then(res => {
                if (res.code == Api.CODES.SUCCESS) {
                  this.$store.commit('updateTempOrder', {
                    address: res.data.addressList[res.data.addressList.length - 1]
                  })
                }
              })
              .catch(e => console.log(e))
              .then(() => {
                wx.hideLoading()
                wx.navigateBack()
              })
            } else {
              wx.navigateBack()
            }
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
      console.log(e)
      if (e && e.id) {
        wx.showLoading()
        Api.address.addressDetail({ addressId: e.id }).then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            this.form = res.data
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(() => wx.hideLoading())
      } else {
        this.form = {
          addressId: '',
          userName: '',
          sex: 0,
          phone: '',
          areaInfo: '',
          address: '',
          label: '家',
          provinceId: '',
          cityId: '',
          areaId: ''
        }
      }
    }
  }
</script>

<style lang="scss">
  page { background-color: #F3F3F3; }
</style>

<style lang="scss" scoped>
  .address-form {
    margin-top: 20rpx;
    &:before,
    &:after {
      display: none;
    }
    .weui-cell {
      &:before {
        left: 0;
        border-top: 2rpx dashed #EDEDED;        
      }
    }
    .weui-label {
      width: 150rpx;
      font-size: 30rpx;
      color: #333;
    }
    .weui-input{
      font-size: 30rpx;
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

    .placeholder,
    .input-placeholder {
      font-size: 30rpx;
      color: #999;
    }
    .weui-input,
    .radio-group,
    .placeholder {
      height: 70rpx;
      min-height: 70rpx;
      line-height: 70rpx;
    }    
  }

  .tag-list {
    padding-top: 8rpx;
    padding-bottom: 8rpx;
    span {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      border-radius: 24rpx;
      border: 2rpx solid #BBB;
      line-height: 46rpx;
      width: 90rpx;
      font-size: 30rpx;
      color: #BBB;
      + span {
        margin-left: 20rpx;
      }
      &.active {
        border-color: $theme-color;
        color: $theme-color;
      }
    }
  }

  .button-area {
    padding: 90rpx 140rpx;
  }
</style>

