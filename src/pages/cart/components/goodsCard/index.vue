<template>
  <div class="card">
    <div class="card-left">

      <label class="checkbox"  v-if="isFailure">

      </label>
      <label class="checkbox"  v-else>
        <switch type="checkbox" class="weui-check" :checked="item.isSelect" @change="onGoodsCBChange($event, item)"/>
        <div class="weui-cell__hd weui-check__hd_in-checkbox">
          <icon v-if="item.isSelect && item.isSale " class="weui-icon-checkbox_success" type="success" size="20" color="#12D6BE" ></icon>
          <icon v-else-if="!item.isSale" class="weui-icon-checkbox_success" type="success" size="20" color="#eee" ></icon>
          <icon v-else class="weui-icon-checkbox_circle" type="circle" size="20"></icon>
        </div>
      </label>


      <div :class="{ 'failure-img' : isFailure }">
        <image class="goods-img" :src="item.goodsImage" mode="aspectFit" />
      </div>


    </div>
    <div class="card-right">
      <div class="good-name" :class="{ 'failure-good-name' : isFailure }">
        {{ item.goodsName }}
      </div>
      <div class="date-num" v-if="!isFailure">
        <div class="start-sell-date"><span v-if="item.isSale == 0">{{saleTime}}开售</span></div>
        <div class="sell-num-box">
          <span v-if="item.activityLimitNum && item.itemTotalNum > item.activityLimitNum - item.buyedNum">限购{{item.activityLimitNum}}份</span>
          <span v-else-if="item.maxNum && item.itemTotalNum > item.maxNum">剩余{{item.maxNum}}份</span>
          <span v-else> </span>
        </div>
      </div>

      <div class="good-main" v-if="isFailure">
        <goods-price :item="item" :isFailure="true"></goods-price>
      </div>
      <div class="good-main" v-else>
        <goods-price :item="item" :isFailure="false"></goods-price>
        <counter v-model="item.itemTotalNum" :max="maxNum" @change="onGoodsNumChange($event,item)"></counter>
      </div>
    </div>
  </div>

</template>

<script>
import { formatSaleDate } from "@/utils/index"
import Counter from '../Counter/index'
import GoodsPrice from '../GoodsPrice/index'
export default {
  props: {
    item: { //购物车商品对象
      type: Object,
      default: () => {}
    },
    isFailure: { //是否是失效商品
      type: Boolean,
      default: false
    }
  },
  components: {
    Counter,
    GoodsPrice
  },
  computed: {
    saleTime () { //显示的销售时间
      return  this.item.saleTime ? formatSaleDate(this.item.saleTime) : ''
    },
    maxNum () { //商品购买的最大值
      //限购数量优先级高于库存
      return this.item.activityLimitNum ? this.item.activityLimitNum - this.item.buyedNum : this.item.maxNum
    }
},
  methods: {

    /**
     * @description 购物车单个商品选择emit
     */
    onGoodsCBChange (e, item) {
      if(item.isSale) {
        console.log('onGoodsCBChange',item)
        this.$emit('onGoodsCBChange',e, item)
      }
    },

    /**
     * @description 购物车数量修改emit
     */
    onGoodsNumChange (count,item) {
      this.$emit('onGoodsNumChange',count,item)
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  background:#fff;
  display: flex;
  padding: 20rpx;
  box-sizing: border-box;
  min-height: 222rpx;
  align-items: center;
  border-bottom: 1rpx solid #F4F4F4;
  &-left{
    display: flex;
    margin-right:18rpx;
  }
  &-right{
    width: 100%;
    .start-sell-date {
      color: $text-gray-deep;
      font-size: 24rpx;
    }
  }
  .date-num{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .sell-num-box{
      color: #CC3333;
      font-size: 24rpx;
    }
  }
  .checkbox{
    display: flex;
    align-items: center;
    width: 75rpx;
  }
  .goods-img{
    height: 192rpx;
    width: 174rpx;
  }
  .good-name{
    font-size:28rpx;
    padding-right: 72rpx;
    padding-bottom: 10rpx;
  }
  .failure-text,.failure-good-name{
    color: #999999;
  }
  .failure-img{
    opacity: 0.8;
  }
  .good-main{
    display: flex;
    padding-top: 21rpx;
    align-items: center;
    justify-content: space-between;
  }

}
</style>
