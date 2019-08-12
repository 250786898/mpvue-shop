<template>
  <div>
    <lj-tabs :tabs="tabs" v-model="activeIndex"></lj-tabs>
    <div style="background-color: #F3F3F3; height: 20rpx;"></div>
    <!-- 空值 -->
    <div v-if="false" class="empty-tip">
      <!-- TODO: 换一个图标 -->
      <img src="/static/images/integraldetails_bg@2x.png">
      <div class="empty-tip__text">暂时没有订单喔~</div>
    </div>
    <div v-else>
      <navigator url="/pages/scanorder/detail/main" class="weui-panel weui-panel_card">
        <div class="weui-panel__hd">
          2017-06-24 08:56:34
          <span>完成</span>
        </div>
        <div class="weui-panel__bd">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              华景0001
            </div>
            <div class="weui-cell__ft">
              <div class="weui-cell__ft_in-access">共2件</div>
              <div>合计：<span class="text-red">250.00</span></div>
            </div>
          </div>
        </div>
      </navigator>

      <navigator url="/pages/scanorder/detail/main" class="weui-panel weui-panel_card">
        <div class="weui-panel__hd">
          2017-06-24 08:56:34
          <span>待出场</span>
        </div>
        <div class="weui-panel__bd">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              华景0001
            </div>
            <div class="weui-cell__ft">
              <div class="weui-cell__ft_in-access">共2件</div>
              <div>合计：<span class="text-red">250.00</span></div>
            </div>
          </div>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
  import LjTabs from '@/components/LjTabs'

  export default {
    components: {
      LjTabs
    },

    data () {
      return {
        activeIndex: 0,
        tabs: [
          { title: '全部' },
          { title: '待出场' },
          { title: '已完成' }
        ]
      }
    },

    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .weui-panel_card {
    margin-top: 40rpx;
    margin-bottom: 40rpx;

    .weui-panel {
      &__hd {
        span {
          color: #0FD7C0;
        }
      }
    }
  }
</style>
