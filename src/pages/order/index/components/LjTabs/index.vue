<template>
   <scroll-view
    class="tabs"
    scroll-x
    :scroll-into-view="toTabId"
    :scroll-with-animation="true"
    >
    <div class="tabs-item" v-for="(item, index) in tabs" :key="index" @click="changeTab(index)" :id="'tab'+index">
      <span :class="{ 'tabs-item__activity': activeIndex == index }">{{ item.title }}</span>
    </div>
  </scroll-view>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => [
        {
          title: '标题'
        },
        {
          title: '标题二'
        },
        {
          title: '标题三'
        },
        {
          title: '标题四'
        },
        {
          title: '标题五'
        },
        {
          title: '标题六'
        },
      ]
    },
  },
  data () {
    return {
      activeIndex: 0 //当前tab的索引
    }
  },

  computed: {
    /**
     * @description 点击目标的tabId
     */
    toTabId () {
      return `tab${this.activeIndex}`
    }
  },

  methods: {
    /**
     * @param {number} index 当前tab索引
     * @description 改变tab
     */
    changeTab (index) {
      this.activeIndex = index
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs{
  white-space: nowrap;
  background: #ffffff;
  width: 100vw;
  padding: 0 20rpx;
  height: 100rpx;
  line-height: 100rpx;
  &-item{
    display: inline-block;
    position: relative;
    margin-right: 50rpx;
    line-height: 32rpx;
    color: #798194;
    font-size: 32rpx;
    &__activity{
      color:#363F52;
      font-weight:bold;
      display: flex;
      align-items: center;
      flex-direction: column;
      &:after {
        content: '';
        display: block;
        width:52rpx;
        height:10rpx;
        background-color: $theme-color;
        border-radius: 5rpx;
        margin-top: 14rpx;
      }
    }
  }
}
</style>
