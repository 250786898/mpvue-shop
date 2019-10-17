<template>
  <div class="container">
    <div class="search-input">
      <search-bar @searchStore="searchStore" />
    </div>

    <div class="result-list" v-if="!searching && storeList.length > 0">
      <template v-for="item in storeList">
        <store-card :key="item.id" :item="item" />
      </template>
    </div>

    <empty-search v-if="isEmpty && !searching" />

    <div class="loading" v-show="searching">
      <lj-loading />
    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api'
import TopBg from "../select/components/TopBg/index"
import SearchBar from "./components/SearchBar/index"
import StoreCard from "../components/StoreCard/index"
import LjLoading from "@/components/LjLoading"
import EmptySearch from './components/EmptySearch/index'


export default {
  components: {
    SearchBar,
    TopBg,
    StoreCard,
    LjLoading,
    EmptySearch
  },
  data () {
    return {
      searching: false, //是否处于搜索中状态
      storeList: [], //搜索的门店列表
      isEmpty: false //搜索结果是否为空
    }
  },
  computed : {
    ...mapState(['location','cityName'])
  },

  onLoad () {
    if(this.$options.data) {
      console.log('mixin',this)
      Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
    }
  },

  methods: {
    /**
     * @description 监听键盘输入搜索事件emit
     */
    searchStore (searchVal) {
      console.log('searchStore')
      this.initSearchStatus () // 搜索之前初始化搜索状态
      this.setSearchingStatus()
      if(searchVal) {
        this.queryByRegin(searchVal)
      }else {
        this.clearSearchingStatus()
        this.clearSearchEmptyStatus()
        this.clearStoreList()
      }
    },



    /**
     * @param {string} searchVal 搜索的关键字
     * @description 关键字搜索门店
     */
    queryByRegin (searchVal) {
      Api.index.queryByRegin({
        city: this.cityName,
        storeNameLike: searchVal
      }).then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          const searchResultList = res.data.cityStore
          setTimeout(() => { //延迟600毫秒，交互更好
            this.setSearchResult(searchResultList)
            this.clearSearchingStatus()
          },600)

        }
      })
      .catch(e => console.log(e))
      .then(() => {}) //成功失败都关闭搜索中
    },

    /**
     * @description 设置搜索结果
     */
    setSearchResult (storeList) {
      this.clearSearchEmptyStatus()
      if(storeList && storeList.length > 0) {
        this.storeList = storeList
      }else{
        //如果搜索结果为空，显示空状态
        this.setSearchEmptyStatus()
      }
    },

    /**
     * @description 初始化搜索状态
     */
    initSearchStatus () {
      this.clearStoreList()
      this.clearSearchEmptyStatus()
    },

    /**
     * @description 清除搜索结果数据
     */

    clearStoreList () {
      this.storeList = []
    },

    /**
     * @description 设置搜索结果为空
     */
    setSearchEmptyStatus () {
      this.isEmpty = true
    },


    /**
     * @description 清楚搜索结果为空的状态
     */
    clearSearchEmptyStatus () {
      this.isEmpty = false
    },


    /**
     * @description 设置为搜索中状态
     * */
    setSearchingStatus () {
      console.log('setSearchingStatus')
      this.searching = true
    },

    /**
     * @description 清楚搜索中状态
     * */
    clearSearchingStatus () {
      this.searching = false
    },

  }

}
</script>

<style lang="scss">
page{
  background: #f3f3f3;
}
.container{
  display: flex;
  flex-direction: column;
  .search-input{
    padding: 10rpx 0;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .result-list {
    margin-top: 20rpx;
    padding: 30rpx;
    background: #fff;
    display: flex;
    flex-direction: column;
  }
  .loading{
    margin-top: 200rpx;
  }
}
</style>
