<template>
  <div>
    <div class="list">
      <div class="weui-cells weui-cells_after-title">
        <checkbox-group @change="checkboxChange">
          <label class="weui-cell weui-check__label" v-for="item in items" :key="index">
            <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
            <div class="weui-cell__hd weui-check__hd_in-checkbox">
              <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
              <icon class="weui-icon-checkbox_success" type="success" color="#0EDABC" size="23" v-if="item.checked"></icon>
            </div>
            <div class="weui-cell__bd">
              <h4>{{ item.name }}</h4>
              <div class="weui-flex">
                <div class="weui-flex__item">
                  ￥140 ×1
                </div>
                <div @click.stop>
                  <counter></counter>
                </div>
              </div>
            </div>
          </label>
        </checkbox-group>
      </div>
    </div>

    <div class="footer-bar">
      <div class="lj-form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <picker @change="onReasonChange" :value="reason" :range="reasonArray">
              <view class="picker picker_triangle">
                <template v-if="reason != 0">{{ reasonArray[reason] }}</template>
                <div v-else class="picker__placeholder">退款原因</div>
              </view>
            </picker>
            <div class="weui-flex warning-tip">
              <div>
                <img src="/static/images/warning_icon@2x.png">
              </div>
              <div>退货前您必须保证此订单已出场，发货退货后请到收银台办理后续事宜</div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-flex">
        <div style="width: 46%;">
          <label class="weui-cell weui-check__label">
            <switch type="checkbox" class="weui-check" :checked="allChecked" @change="onAllCheckedChange"></switch>
            <div class="weui-check__hd_in-checkbox">
              <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!allChecked"></icon>
              <icon class="weui-icon-checkbox_success" type="success" color="#0EDABC" size="23" v-if="allChecked"></icon>
            </div>
            <div>全选</div>
          </label>
        </div>
        <div class="weui-flex__item">
          <button type="primary" @click="submit">提交退货申请</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Counter from '@/components/Counter'

  export default {
    components: {
      Counter
    },

    data() {
      return {
        items: [
          { name: '蓝月亮亮白洗衣液', value: '1', checked: false },
          { name: '蓝月亮亮白洗衣液', value: '2', checked: false }
        ],
        reason: 0,
        reasonArray: [
          '',
          '商品已损坏',
          '商品质量有问题',
          '其他'
        ],
        allChecked: false
      }
    },

    methods: {
      checkboxChange(e) {
        let checkedValue = e.mp.detail.value
        this.items.forEach(item => item.checked = checkedValue.indexOf(item.value) !== -1)
        this.allChecked = checkedValue && (checkedValue.length === this.items.length)
      },

      onAllCheckedChange(e) {
        this.allChecked = e.mp.detail.value
        this.items.forEach(item => item.checked = this.allChecked)
      },

      onReasonChange(e) {
        this.reason = e.mp.detail.value
        console.log(this.reason)
      },

      submit() {
        var curHours = new Date().getHours()
        if(curHours >= 20) {
          return wx.showToast({
            title: '请在20:00前退款',
            icon: 'none'
          })
          return false
        }
        wx.showToast({
          title: '请至少选择一项退货商品',
          icon: 'none'
        })
        return 
        wx.showToast({
          title: '请选择退货原因',
          icon: 'none'
        })
        return 
      }
    }
  }
</script>

<style>
  page { padding-bottom: 360rpx; }
</style>

<style lang="scss" scoped>
  .list {
    .weui-cells {
      &:before { display: none; }
      &:after {
        border-color: #EDEDED;
      }
    }
    .weui-check__label {
      font-size: 30rpx;
      &:before {
        left: 0;
        border-color: #EDEDED;
      }
      h4 {
        line-height: 40rpx;
        height: 40rpx;
        margin-bottom: 40rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .weui-check__hd_in-checkbox {
        margin-right: 20rpx;
      }
      .weui-icon-checkbox_circle, .weui-icon-checkbox_success {
        margin: 0;
      }
    }
  }
  
  .footer-bar {
    background-color: #fff;
    .lj-form {
      padding-bottom: 30rpx;
      border-bottom: 1rpx solid #DEDEDE;
    }
    .warning-tip {
      margin-top: 10rpx;
      font-size: 28rpx;
      color: $text-black;
      img {
        vertical-align: middle;
        width: 32rpx;
        height: 32rpx;
        margin-right: 10rpx;
      }
    }

    .weui-check__label {
      font-size: 32rpx;
    }
  }
</style>
