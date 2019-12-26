
<template>
  <div class="container">
    <!-- TODO: 是否使用 GoodsSearchbarCart 组件 -->
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input type="text"
            class="weui-search-bar__input"
            placeholder="搜索"
            v-model.trim="inputVal"
            :focus="inputShowed"
            @confirm="search(inputVal)"
            @input="inputTyping"
            />
          <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
            <icon type="clear" size="14"></icon>
          </div>
        </div>
        <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
          <icon class="weui-icon-search" type="search" size="14"></icon>
          <div class="weui-search-bar__text">{{inputVal}}</div>
        </label>
      </div>
      <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
      <navigator open-type="switchTab" url="/pages/cart/main" class="cartentry" :hidden="inputShowed || !resultShowed">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_tab_icon_shopcart_n@2x.png">
        <span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">
          {{ cartNum || '0'}}
        </span>
      </navigator>
    </div>

    <!-- 热门搜索、历史搜索 -->
    <!-- <div v-if="inputShowed || !resultShowed">
      <div class="tag-block">
        <div class="tag-block__title">热门搜索</div>
        <div class="tag-block__bd">
          <span v-for="item in hotKeyList" :key="item" @click="search(item)">{{ item }}</span>
        </div>
      </div>
      <div class="tag-block">
        <div class="tag-block__title">
          搜索历史
          <img class="tag-block__title__icon" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/search_icon_delete@2x.png" @click="clearSearchHistory()">
        </div>
        <div class="tag-block__bd">
          <span v-for="item in histories" :key="item" @click="search(item)">{{ item }}</span>
        </div>
      </div>
    </div> -->

    <!-- 搜索结果 -->
    <!-- <div v-else>
      <goods-row-item v-for="item in goodsList" :item="item" :key="item.goodsId"></goods-row-item>
      <empty v-if="goodsList.length == 0"></empty>
    </div> -->

    <!-- 搜索结果模态窗 -->
    <div class="search-recommend-modal" v-if="recommends.length">
      <div class="weui-cells">
        <div class="weui-cell" v-for="item in recommends" :key="item" @click="search(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import Empty from '@/components/Empty'

  const SEARCH_STORAGE_KEY = 'search_history'
  const SEARCH_HISTORY_LENGTH = 10

  export default {
    components: {
      Empty
    },

    data () {
      return {
        inputVal: '',
        inputShowed: false,
        resultShowed: false,
        searched: '',
        hotKeyList: [],
        recommends: [], // 搜索推荐
        histories: wx.getStorageSync(SEARCH_STORAGE_KEY) || [] ,
        goodsList: [] ///搜索商品结果
      }
    },

    computed: {
      ...mapState(['storeId', 'cartNum'])
    },

    methods: {

      /**
       * @description 根据搜索获取结果
       */
      getGoodsSearch () {
        console.log('search')
        Api.goods.goodsSearch({
          storeId: this.storeId,
          keyword: this.searched
         }).then( res => {
           if(res.code == Api.CODES.SUCCESS) {
             this.goodsList = res.data.goodsList
             this.hideInput()
           }
         })
      },

      showInput() {
        this.inputShowed = true
      },

      hideInput() {
        this.inputShowed = false
        this.clearInput()
      },

      inputTyping({ mp: { detail } }) {
        // Debounce
        clearTimeout(this._timer)
        this._timer = setTimeout(() => {
          if (detail.value) {
            Api.goods.goodsSearchKey({
              storeId: this.storeId,
              keyword: detail.value
            })
            .then(res => {
              if (res.code === Api.CODES.SUCCESS) {
                this.recommends = res.data.goodsNameList
              }
            })
          } else {
            this.recommends.length = 0
          }
        }, 500)
      },

      clearInput() {
        this.inputVal = ''
        this.recommends.length = 0
      },

      getSearchHotKey() {
        Api.goods.searchHotKey({
          storeId: this.storeId
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.hotKeyList = res.data.hotKeyList
          }
        })
      },

      search(keyword) {
        if (!keyword) return
        this.inputVal = keyword
        this.searched = keyword
        this.resultShowed = true
        this.inputShowed = false
        // this.clearInput()
        this.saveSearchHistory(keyword)
        this.getGoodsSearch()
        this.recommends = []
      },

      saveSearchHistory(keyword) {
        // 如果已经有该词的历史记录，刚先删除
        let index = this.histories.indexOf(keyword)
        if (index !== -1) {
          this.histories.splice(index, 1)
        }
        this.histories.unshift(keyword)
        this.histories.splice(SEARCH_HISTORY_LENGTH)
        wx.setStorage({
          key: SEARCH_STORAGE_KEY,
          data: this.histories
        })
      },

      clearSearchHistory() {
        wx.showModal({
          content: '是否清空商品搜索历史记录',
          success: res => {
            if (res.confirm) {
              this.histories = []
              wx.removeStorage({
                key: SEARCH_STORAGE_KEY
              })
            }
          }
        })
      }
    },

    onLoad () {
      setTimeout(() => this.inputShowed = true, 500)
      this.getSearchHotKey()
      this.inputVal = this.searched = ''
      this.inputShowed = this.resultShowed = false
    }
  }
</script>

<style scoped lang="scss">
  .tag-block {
    padding: 20rpx 30rpx;
    &__title {
      position: relative;
      font-size: 30rpx;
      font-weight: 700;
      color: #3B3D40;
      &__icon {
        position: absolute;
        top: -8rpx;
        right: 0;
        width: 64rpx;
        height: 64rpx;
      }
    }
    &__bd {
      span {
        margin-top: 16rpx;
        margin-right: 28rpx;
        padding: 0 20rpx;
        display: inline-block;
        line-height: 50rpx;
        border-radius: 25rpx;
        background-color: #F4F4F4;
        font-size: 30rpx;
        color: #3B3D40;
      }
    }
  }

  .search-recommend-modal {
    position: fixed;
    top: 96rpx;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;
    overflow: auto;
    background-color: #fff;
    .weui-cells {
      margin-top: 0;
      &:before,
      &:after {
        display: none;
      }
      .weui-cell {
        padding-top: 26rpx;
        padding-bottom: 26rpx;
        font-size: 30rpx;
        color: $text-gray;
        &:before {
          left: 0;
          border-color: #EDEDED;
        }
      }
    }
  }

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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width:80%;

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
