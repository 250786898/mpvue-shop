<template>
  <div class="bar">
    <div class="bar-input">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/commom_search_png.png" class="search-icon">
      <input placeholder="请输入商品名称" class="search-input" v-model="keyword">
      <div class="cancel-icon" @click="clearSearch" v-if="keyword">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_icon_close.png" >
      </div>

    </div>
    <div class="search-btn">
      <div class="cart-icon" v-if="showCart">
        <CartIcon />
      </div>
      <span @click="searchGoodsByKeyword" v-else>搜索</span>
    </div>
  </div>
</template>

<script>
import CartIcon from '@/components/CartIcon'
import { Api } from '@/http/api'
import { mapState } from 'vuex'
import GoodsModel from '@/model/goods'

const goodsModel = new GoodsModel()
export default {
  components: {
    CartIcon
  },

  props: {
    showCart: { //显示购物车Icon
      type: Boolean,
      default: false
    }
  },

  computed: {

  },

  data () {
    return {
      keyword: '' //当前输入搜索的关键字
    }
  },

  methods: {

    /**
     * @description 清除搜索
     */
    clearSearch () {
      console.log('clearSearch')
      this.keyword = '' //清空关键字
      this.$emit('clear')
    },

    /**
     * @description 根据关键字搜索商品
     *
     */
    async searchGoodsByKeyword () {
      wx.showLoading({
        title: '搜索中...'
      })
      try {
        const res = await goodsModel.goodsSearch({
          storeId: this.storeId,
          keyword: this.keyword,
          pageNumber: 1,
          pageSize: 1000
        })
        if(res.code == Api.CODES.SUCCESS) {
          this.$emit('search',res.data.goodsList)
        }

      } catch (error) {
        console.log('error',error)
      } finally {
        wx.hideLoading()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bar{
  padding: 20rpx 30rpx 20rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-input{
    width:620rpx;
    height:74rpx;
    background:rgba(243,243,243,1);
    border-radius:10rpx;
    display: flex;
    padding: 0 0 0 15rpx;
    box-sizing: border-box;
    align-items: center;
    .search-icon{
      width: 25rpx;
      height: 25rpx;
      margin-right: 15rpx;
    }
    .search-input{
      color: #929292;
      font-size: 30rpx;
      flex: 1;
    }
  }
  .search-btn{
    color: #4A4949;
    font-size: 28rpx;
  }
  .cancel-icon{
    padding: 15rpx;
    img{
      width: 25rpx;
      height: 25rpx;
    }
  }
}
</style>
