<template>
  <div class="applicable">
    <div class="applicable-header">

      <div class="applicable-header-desc">
        <div class="applicable-header-desc__title">以下商品可使用满199元减99元的优惠券</div>
        <div class="applicable-header-desc__date">有效期：2018-08-01 至 2018-08-30</div>
        <div class="applicable-store">
          <span>查看适用门店</span>
          <img src="/static/images/coupon_goods_right.png" class="applicable-store__icon" alt="">
        </div>
      </div>


    </div>

    <div class="applicable-main">
      <div class="goods-list">
        <template v-for="item in applicableGoodsList">
          <div class="goods-item" :key="item.goodsId">
            <goods-item :item="item"/>
          </div>
        </template>
      </div>
    </div>

    <div class="cart-icon">
      <cart-icon :type="'black'"/>
    </div>


  </div>
</template>

<script>
import CartIcon from "@/components/CartIcon"
import GoodsItem from "@/components/GoodsRowItem"
export default {
   components:{
     CartIcon,
     GoodsItem
   },
   data () {
     return {
       applicableGoodsList: [
         {"goodsId":"6578537564871860224","goodsName":"进口南非橙4个约0.95kg","goodsSellDesc":"","goodsImage":"http://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1568445471913.jpg","onlinePrice":10.80,"onlineScribingPrice":22.80,"goodsTagStatus":0,"goodsTagImage":"","isGroup":false,"groupPartner":0,"activityId":null,"activityType":null,"activityPrice":null,"points":null,"id":null,"tagList":[]},
         {"goodsId":"6588360964196802560","goodsName":"海南玫珑瓜约2.5斤","goodsSellDesc":"","goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1570787614009.jpg","onlinePrice":16.80,"onlineScribingPrice":22.80,"goodsTagStatus":0,"goodsTagImage":"","isGroup":false,"groupPartner":0,"activityId":null,"activityType":null,"activityPrice":null,"points":null,"id":null,"tagList":[]},
         {"goodsId":"6578537564871860224","goodsName":"进口南非橙4个约0.95kg","goodsSellDesc":"","goodsImage":"http://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1568445471913.jpg","onlinePrice":10.80,"onlineScribingPrice":22.80,"goodsTagStatus":0,"goodsTagImage":"","isGroup":false,"groupPartner":0,"activityId":null,"activityType":null,"activityPrice":null,"points":null,"id":null,"tagList":[]},
         {"goodsId":"6588360964196802560","goodsName":"海南玫珑瓜约2.5斤","goodsSellDesc":"","goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1570787614009.jpg","onlinePrice":16.80,"onlineScribingPrice":22.80,"goodsTagStatus":0,"goodsTagImage":"","isGroup":false,"groupPartner":0,"activityId":null,"activityType":null,"activityPrice":null,"points":null,"id":null,"tagList":[]}
       ]
     }
   }

}
</script>

<style>
page{
  background: #f5f5f5;
}
</style>

<style lang="scss" scoped>
.applicable{
  padding: 20rpx;
  padding-bottom: 180rpx;
  box-sizing: border-box;
  &-header{
    display: flex;
    &-desc{
      flex: 1;
      &__title{
        font-size: 30rpx;
        margin-bottom: 19rpx;
      }
      &__date{
        font-size: 30rpx;
        color: #929493;
        margin-bottom: 18rpx;
      }
      .applicable-store{
        color: #259BED;
        font-size: 30rpx;
        display: flex;
        align-items: center;
        &__icon{
          width: 12rpx;
          height: 19rpx;
          margin-left: 10rpx;
        }
      }
    }
  }
  &-main{
    margin-top: 20rpx;
    .goods-list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .goods-item{
        // flex:1;
      }
    }
  }
  .goods-tabs__tip {
    height: 116rpx;
    padding: 20rpx;
    font-size: 26rpx;
    line-height: 124rpx;
    color: $text-gray;
    text-align: center;
  }
  .cart-icon{
    position: fixed;
    z-index: 9;
    left: 20rpx;
    bottom: 64rpx;
  }
}
</style>
