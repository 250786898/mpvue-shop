<template>
  <div class="nav">
    <scroll-view
      :scroll-x="true"
      :scroll-into-view="toCurrentNavItem"
      :scroll-with-animation="true"
      style=" white-space: nowrap; display: flex"
      class="nav-list"
    >
    <!--  display: inline-block-->
      <div class="nav-list-item"  @click="tabCategory('',-1)" id="item-1" :class="{ 'active-item' : currentIndex == -1  }">
        全部
      </div>
      <div
        class="nav-list-item"
        v-for="(item, index) in categoryList"
        v-bind:key="index"
        :class="{ 'active-item' : index == currentIndex }"
        :id="'item'+index"
        @click="tabCategory(item,index)"
      >
        {{item.gcName}}
      </div>
    </scroll-view>

     <div class="downward-icon" @click="handleCategoryShow">
       <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/downward-bg-icon.png" alt="" class="downward-icon__bg">
       <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/cate-downward-icon.png" alt="" class="downward-icon__main">
     </div>

    <template v-if="isshowAllCategory">
      <div  class="category">
        <div class="category-header">
          <span class="category-header__title">全部分类</span>
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/cate-upward-icon.png" alt="" class="upward-icon" @click="handleCategoryShow" />
        </div>
        <div class="category-list">
          <div class="category-list-item"  @click="tabCategory('',-1)" :class="{ 'active-item' : currentIndex == -1  }">
          全部
          </div>
          <div
            class="category-list-item"
            v-for="(item, index) in categoryList"
            v-bind:key="index"
            :class="{ 'active-item' : index == currentIndex }"
            @click="tabCategory(item,index)"
          >
            {{item.gcName}}
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
       return [
         '时令水果','悠闲食品','安心乳品','酒饮冲调','肉蛋食材','放心蔬菜','粮油速食','美妆护肤','个人护肤'
       ]
      }
    } //分类列表
  },
  data () {
    return {
      isshowAllCategory : false, //是否显示全部导航
      currentIndex: -1, //当前所在栏目索引 -1代表全部
      scrollLeft: '300'
    }
  },
  watch: {
    'currentIndex' : function () {
      console.log('currentIndex')
      this.hideCategoryDialog()
    },
    categoryList :function (){
      this.currentIndex=-1;
    }
  },
  components: {
    DownwardIcon
  },
  computed: {
    toCurrentNavItem () {
      return `item${this.currentIndex}`
    }
  },
  methods: {

    /**
     * @description 点击了栏目
     */
    tabCategory (item,index) {
      this.$emit('getSecondaryCate',item.id)
      this.currentIndex = index //设置当前索引
      item.id ? this.$emit('update:isAllGoods',false) : null
    },

    /**
     * @description 显示全部分类
     */
    handleCategoryShow () {
      this.isshowAllCategory = !this.isshowAllCategory
    },

    /**
     * @descption 隐藏分类弹窗
     */
    hideCategoryDialog() {
      this.isshowAllCategory = false
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  position: relative;
  &-list{
    padding-left: 12rpx;
    height: 100rpx;
    padding-top: 25rpx;
    width:582rpx;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    padding-right: 50rpx;
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
      display: inline-block;
      margin-right: 10rpx;
    }
  }

  .downward-icon{
    width: 75rpx;
    height: 100rpx;
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    z-index: 9;
    top: 0rpx;
    text-align: center;
    justify-content: center;
    &__bg{
      width: 100%;
      height:100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    &__main{
      width:28rpx;
      height: 16rpx;
      z-index: 10;
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
      width: calc(100vw - 168rpx);
    }
  }

  .active-item{
    color: #01BD9F;
    border-color: #01BD9F;
  }
}
</style>
