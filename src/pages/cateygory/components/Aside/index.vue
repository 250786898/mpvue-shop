<template>
   <scroll-view
    scroll-y
    class="aside"
    scroll-with-animation
    >
    <div class="category-item "
      v-for="(item, index) in categoryList"
      v-bind:key="index"
      :class="{ 'category-Activity' : index == currentIndex }"
      @click="tabCategory(index)"
    >
      时令水果水果
    </div>

  </scroll-view>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default: () => {
       return [1,2,3,4,5]
      }
    }
  },
  data () {
    return {
      currentIndex: 0 //当前所在栏目索引
    }
  },
  methods: {

    /**
     * @description 点击了栏目
     */
    tabCategory (index) {
      this.currentIndex = index //设置当前索引
    }
  }
}
</script>

<style lang="scss" scoped>
.aside{
  width: 168rpx;
  background: #F4F4F4;
  height:calc(100vh - 104rpx);
  .category-item{
    width:168rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    color: #444444;
    font-size: 24rpx;
  }
  .category-Activity{
    background: #ffffff;
    border-left: 8rpx solid #01BD9F;
    color: #000000;
    font-weight: 800;
  }
}
</style>
