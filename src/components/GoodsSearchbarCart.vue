<!-- 搜索Bar with 购物车 -->
<template>
  <div class="weui-search-bar">
    <div class="weui-search-bar__form">
      <div class="weui-search-bar__box">
        <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
        <input type="text"
          class="weui-search-bar__input"
          v-model.trim="inputVal"
          :placeholder="placeholder"
          :focus="inputShowed"
          @focus="focus=true"
          @blur="focus=false"
          @confirm="search(inputVal)"
          disabled
          @click="toSearch"
          />
        <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
          <icon type="clear" size="14"></icon>
        </div>
      </div>
<!--       <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
        <icon class="weui-icon-search" type="search" size="14"></icon>
        <div class="weui-search-bar__text">{{ placeholder }}</div>
      </label> -->
    </div>
    <div class="weui-search-bar__cancel-btn" :hidden="!(inputShowed && focus)" @click="hideInput">取消</div>
    <navigator url="/pages/cart/main" open-type="switchTab" class="cartentry" :hidden="inputShowed && focus">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_tab_icon_shopcart_n@2x.png" alt="">
      <span class="weui-badge" style="position: absolute; top: -.2em; right: 0;">{{ cartNum }}</span>
    </navigator>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '请搜索附近商家商品'
      }
    },

    data () {
      return {
        inputVal: '',
        inputShowed: false,
        searched: '',
        focus: false
      }
    },

    computed: {
      ...mapState(['cartNum'])
    },

    methods: {
      showInput() {
        this.inputShowed = true
      },

      hideInput() {
        this.inputShowed = false
      },

      clearInput() {
        this.inputVal = ''
        this.$emit('clear')
      },

      search(keyword) {
        this.searched = keyword
        this.focus = false
        this.$emit('search', keyword)
      },

      toSearch() {
        wx.navigateTo({
          url: '/pages/index/searchgoods/main'
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .weui-search-bar {
    padding-top: 16rpx;
    padding-bottom: 16rpx;
    background-color: #fff;
    border-top: 0;
    border-bottom-color: #fff;
    &__box {
      padding-left: 74rpx;
    }
    &__form {
      border: 0 none;
      background-color: #f3f3f3;
      border-radius: 32rpx;
    }
    &__input {
      height: 64rpx;
      line-height: 64rpx;
    }
    &__text {
      margin-left: 74rpx;
    }
    &__label {
      background-color: #f3f3f3;
      border-radius: 32rpx;
      text-align: left;
      .weui-icon-search {
        position: absolute;
        left: 30rpx;
        top: 18rpx;
        font-size: 0;
      }
    }
    &__cancel-btn {
      padding-left: 14rpx;
      padding-right: 12rpx;
      line-height: 64rpx;
      font-size: 28rpx;
      color: #000;
    }
    .weui-icon-clear {
      padding-top: 18rpx;
      padding-bottom: 18rpx;
      right: 10rpx;
    }
  }
  .weui-icon-search_in-box {
    left: 30rpx;
    top: 18rpx;
  }

  .cartentry {
    position: relative;
    padding-left: 28rpx;
    padding-right: 10rpx;
    img {
      vertical-align: top;
      width: 64rpx;
      height: 64rpx;
    }
    .weui-badge {
      padding: 0 6rpx;
      font-size: 22rpx;
    }
  }
</style>
