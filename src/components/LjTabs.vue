<template>
  <scroll-view :scroll-x="true" class="lj-tabs-scroll">
    <div class="lj-tabs" :class="{ 'lj-tabs_flex': flex }">
      <block v-for="(item, index) in tabs" :key="index">
        <div :id="index" class="lj-tabs__item" :class="{ 'lj-tabs__item_on': activeIndex == index }"  @click="select(index)">
          {{ item.title }}{{ item.pcName }}
          <span class="weui-badge" v-if="item.badge">{{ item.badge }}</span>
        </div>
      </block>
    </div>
  </scroll-view>
</template>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        default: () => []
      },
      activeIndex: {
        type: Number,
        default: 0
      },
      flex: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'activeIndex',
      event: 'change'
    },
    methods: {
      select(index) {
        this.$emit('change', index)
      }
    }
  }
</script>

<style lang="scss" scoped>
.lj-tabs__item{
  flex: 1;
  justify-content:center; 
  text-align: center;
}
  .lj-tabs-scroll {
    background-color: #fff;

  .lj-tabs {
    display: flex;
    white-space: nowrap;
    background-color: #fff;
    &__item {
      position: relative;
      display: inline-block;
      padding: 14rpx 20rpx;
      line-height: 60rpx;
      font-size: 30rpx;
      color: #3B3D40;
      align-items: center;
      &_on {
        position: relative;
        display: flex;
        flex:1;
        // font-size: 32rpx;
        color: $theme-color-light;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 80rpx;
          margin-left: -40rpx;
          height: 8rpx;
          background-color: $theme-color-light;
          border-radius: 4rpx;
        }
      }
      .weui-badge {
        position: absolute;
        right: 0;
        top: 10rpx;
      }
    }
  }
  }

</style>
