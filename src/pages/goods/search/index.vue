<template>
  <div class="container">
    <search-input @search="search" @clear="clearSearch" />
    <!-- <history-keyword v-if="!isShowSearchGoodsDialog"/> -->
    <!-- <hot-keyword /> -->
    <!-- <search-result /> -->
    <searchGoodsList :show="isShowSearchGoodsDialog" :list="searchGoodsList" />
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import HistoryKeyword from './components/HistoryKeyword'
import HotKeyword from './components/HotKeyword'
import SearchResult from './components/SearchResult'
import searchGoodsList from './components/GoodsList'
export default {
  components: {
    SearchInput,
    HistoryKeyword,
    HotKeyword,
    SearchResult,
    searchGoodsList
  },

  data () {
    return {
      searchGoodsList: [], //搜索的商品列表
      isShowSearchGoodsDialog: false //是否显示搜索商品结果弹窗
    }
  },

  onLoad () {
    console.log('mixin',this.$data,typeof this.$options.data())
    Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
  },

  methods: {
    /**
     * @description 搜索商品
     */
    search (searchGoodsList) {
      if(searchGoodsList) {
        //搜索有结果才弹窗并且赋值商品列表数据
        this.isShowSearchGoodsDialog = true
        this.searchGoodsList = searchGoodsList
      }
    },

    /**
     * @description 清除搜索
     */
    clearSearch () {
      this.isShowSearchGoodsDialog = false //关闭搜索结果弹窗
    }
  }
}
</script>

<style>

</style>
