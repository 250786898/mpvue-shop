<template>
  <div>
    <div style="height: 20rpx; background-color: #F3F3F3"></div>
    
    <div class="weui-cells__title">投诉原因</div>
    <div class="weui-cells weui-cells_after-title weui-cells_no-border">
      <checkbox-group>
        <label class="weui-cell weui-check__label" v-for="item in reason" :key="index">
          <div class="weui-cell__bd">{{ item.title }}</div>
          <div class="weui-cell__ft">
            <checkbox :value="item.title" :checked="item.checked" />
          </div>
        </label>
      </checkbox-group>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="textarea-wrap">
            <textarea placeholder="可以输入其他问题或详细描述(不超过500字）" :maxlength="500"></textarea>
          </div>
        </div>
      </div>
    </div>

    <button type="primary">提交</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        reason: [
          { title: '服务态度恶劣', checked: false },
          { title: '配送严重超时', checked: false },
          { title: '骑手提前点击送达', checked: false },
          { title: '送错货品', checked: false },
          { title: '货品缺失/损坏', checked: false },
          { title: '骚扰顾客', checked: false },
          { title: '恐吓威胁顾客', checked: false },
          { title: '其他', checked: false }
        ],
        desc: ''
      }
    }
  }
</script>

<style lang=scss scoped>
  .weui-cells {
    &__title {
      font-size: 34rpx;
      color: #000;
      margin-bottom: 20rpx;
    }
  }
  .weui-check__label{
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    font-size: 34rpx;
  }

  .textarea-wrap {
    margin-top: 20rpx;
    padding: 10rpx;
    height: 180rpx;
    border-radius: 2rpx;
    border: 1rpx solid $text-gray;
    
    textarea {
      width: 100%;
      height: 100%;
      font-size: 28rpx;
    }
  }

  button {
    margin: 60rpx 70rpx 0;
  }
</style>
