<template>
  <div class="nav">

    <div class="nav-list">
      <div class="nav-list-item"  @click="tabCategory(-1)" :class="{ 'active-item' : currentIndex == -1  }">
        全部
      </div>
      <div
        class="nav-list-item"
        v-for="(item, index) in categoryList"
        v-bind:key="index"
        :class="{ 'active-item' : index == currentIndex }"
        @click="tabCategory(index)"
      >
        时令尝鲜
      </div>


      <div class="downward-icon" @click="handleCategoryShow">
       <img src="/static/images/cate-downward-icon.png" alt="">
      </div>

    </div>

    <template v-if="isshowAllCategory">
      <div  class="category">
        <div class="category-header">
          <span class="category-header__title">全部分类</span>
          <img src="/static/images/cate-upward-icon.png" alt="" class="upward-icon" @click="handleCategoryShow" />
        </div>
        <div class="category-list">
          <div class="category-list-item"  @click="tabCategory(-1)" :class="{ 'active-item' : currentIndex == -1  }">
          全部
          </div>
          <div
            class="category-list-item"
            v-for="(item, index) in categoryList"
            v-bind:key="index"
            :class="{ 'active-item' : index == currentIndex }"
            @click="tabCategory(index)"
          >
            时令尝鲜
          </div>
        </div>
        <div class="category-mask">

        </div>
      </div>
    </template>
  </div>
</template>

<script>
import DownwardIcon from '../DownwardIcon'
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
      isshowAllCategory : false, //是否显示全部导航
      currentIndex: -1, //当前所在栏目索引 -1代表全部
    }
  },
  components: {
    DownwardIcon
  },
  methods: {

    /**
     * @description 点击了栏目
     */
    tabCategory (index) {
      this.currentIndex = index //设置当前索引
    },

    /**
     * @description 显示全部分类
     */
    handleCategoryShow () {
      this.isshowAllCategory = !this.isshowAllCategory
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  position: relative;
  &-list{
    margin-top: 25rpx;
    display: flex;
    align-items: center;
    padding-left: 12rpx;
    flex-wrap: wrap;
    height: 50rpx;
    overflow: hidden;
    &-item{
      width:120rpx;
      height:50rpx;
      box-sizing: border-box;
      line-height: 50rpx;
      text-align: center;
      border:2rpx solid rgba(231,232,236,1);
      border-radius:8rpx;
      color: #434343;
      font-size: 22rpx;
      margin-right: 10rpx;
    }
  }

  .downward-icon{
    width: 75rpx;
    height: 100rpx;
    position: absolute;
    background: #fff;
    display: flex;
    align-items: center;
    right: 0;
    z-index: 9;
    top: -23rpx;
    text-align: center;
    justify-content: center;
    img{
      width:28rpx;
      height: 16rpx;
    }
  }

  // 全部分类popup样式
  .category {
    z-index: 99;
    height:calc(100vh - 104rpx);
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    &-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12rpx;
      background: #fff;
      &__title{
        color: #727272;
        font-size: 28rpx;
        padding: 20rpx 0;
      }
      .upward-icon{
        width: 44rpx;
        height: 44rpx;
      }
    }
    &-list{
      background: #fff;
      display: flex;
      flex-wrap: wrap;
      padding: 0 12rpx 10rpx;
      &-item{
        width:176rpx;
        height:64rpx;
        line-height: 64rpx;
        text-align: center;
        border:2rpx solid #E7E8EC;
        border-radius:8rpx;
        color: #434343;
        font-size: 22rpx;
        margin-right: 8rpx;
        margin-bottom: 8rpx;
        &:nth-of-type(3n){
          margin-right: 0rpx;
        }
      }
    }
    &-mask{
      background: #000000;
      opacity:0.25;
      height: 100%;
      width: 100%;
    }
  }

  .active-item{
    color: #01BD9F;
    border-color: #01BD9F;
  }
}
</style>
