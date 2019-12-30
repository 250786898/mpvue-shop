<template>
  <div class="card" @click="tabGoods">
    <div  class="goods-img">
      <img :src="item.goodsImage" mode="aspectFit">
      <div class="sell-gone-tag" v-if="!item.activityStock">已抢光</div>
    </div>

    <div class="card-main">
      <div class="card-main-top">
        <div class="goods-name">
          {{ item.goodsName }}
        </div>
        <div class="goods-desc" v-if="item.shareDescription">{{ item.shareDescription || '' }}</div>
        <div class="limit">
           <div class="limit-tag" v-if="item.activityLimitNum" >限购</div>
        </div>

      </div>
       <div class="card-main-bottom">
         <div class="card-main-bottom-left">
           <div class="price-area">
              <div class="current-price">
                <online-price :color="'#ff0000'" :signSize="20" :beforeSize="34" :afterSize="24" :price="item.discountedPrice" />
              </div>
              <div class="line-price" v-if="item.scribingPrice">￥{{item.scribingPrice}}</div>
           </div>
           <div class="sell-num">已售{{item.salesNum+item.virtualSalesNum?item.virtualSalesNum:0}}份</div>
         </div>
         <div class="card-main-bottom-right">
            <NumHandle :count="count"  />
         </div>
      </div>
    </div>
    <div class="card-mask"  v-if="!item.activityStock"></div>
  </div>
</template>

<script>
import NumHandle from '@/components/GoodsNumHandle.vue'
import OnlinePrice from '@/components/OnlinePrice.vue'
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
        "id":"6609363913249136641","goodsNumErp":368803399,"goodsId":"6577128796548243456","activityId":"6609363912930369536","goodsName":"走地鸡约2斤/只","discountedPrice":39.90,"scribingPrice":49.00,"activityStock":64,"isShow":1,"sortNumber":20,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575792481770.jpg","isDel":0,"shareDescription":"林中散养，肉质鲜美【12.10提货】","goodsNum":0,"tagList":[]},{"id":"6609363913257525248","goodsNumErp":368817474,"goodsId":"6583256419359793152","activityId":"6609363912930369536","goodsName":"百香果（约1000g）/16个","discountedPrice":8.80,"scribingPrice":16.90,"activityStock":49,"isShow":1,"sortNumber":19,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575792275877.jpg","isDel":0,"shareDescription":"果香浓郁，VC满满~【12.10提货】","goodsNum":0,"tagList":[]},{"id":"6609363913257525249","goodsNumErp":368817593,"goodsId":"6597065431297564672","activityId":"6609363912930369536","goodsName":"潮汕鲜橄榄500g","discountedPrice":11.80,"scribingPrice":13.80,"activityStock":56,"isShow":1,"sortNumber":18,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575792236540.jpg","isDel":0,"shareDescription":"酸甜可口，超好吃~【12.10提货】","goodsNum":0,"tagList":[]},{"id":"6609363913253330944","goodsNumErp":368802781,"goodsId":"6596311935635955712","activityId":"6609363912930369536","goodsName":"一级小香梨约1kg","discountedPrice":12.80,"scribingPrice":15.80,"activityStock":129,"isShow":1,"sortNumber":17,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575792302416.jpg","isDel":0,"shareDescription":"汁水化渣，梨味浓郁【12.10提货】","goodsNum":0,"tagList":[]},{"id":"6609363913223970816","goodsNumErp":368818146,"goodsId":"6609355056363872256","activityId":"6609363912930369536","goodsName":"杂色蛤500g","discountedPrice":13.80,"scribingPrice":15.80,"activityStock":59,"isShow":1,"sortNumber":16,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575793003908.jpg","isDel":0,"shareDescription":"个大肉肥，味道鲜美【12.10提货】","goodsNum":0,"tagList":[]},{"id":"6609363913249136640","goodsNumErp":368818118,"goodsId":"6609353463346241536","activityId":"6609363912930369536","goodsName":"乐肴居蜜汁叉烧包300g","discountedPrice":12.90,"scribingPrice":16.90,"activityStock":128,"isShow":1,"sortNumber":16,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575792613725.jpg","isDel":0,"shareDescription":"满满肉香回味无穷~【12.10提货】","goodsNum":0,"tagList":[]},{"id":"6609363913244942336","goodsNumErp":368816814,"goodsId":"6567942712132116480","activityId":"6609363912930369536","goodsName":"精品红薯4袋*500g","discountedPrice":9.90,"scribingPrice":13.60,"activityStock":121,"isShow":1,"sortNumber":15,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575792716497.jpg","isDel":0,"shareDescription":"精品杂粮红薯，香甜糯，越吃越健康【12.10提货】","goodsNum":0,"tagList":[]},{"id":"6609363913215582208","goodsNumErp":368818119,"goodsId":"6609355805386874880","activityId":"6609363912930369536","goodsName":"乐肴居藜麦紫薯球500g","discountedPrice":17.80,"scribingPrice":21.90,"activityStock":117,"isShow":1,"sortNumber":14,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575793186821.jpg","isDel":0,"shareDescription":"糯韧Q弹，咸香饱腹【12.10提货","goodsNum":0,"tagList":[]},{"id":"6609363913219776512","goodsNumErp":368818141,"goodsId":"6609355364406140928","activityId":"6609363912930369536","goodsName":"工厂冻花胶500g","discountedPrice":29.80,"scribingPrice":32.90,"activityStock":57,"isShow":1,"sortNumber":13,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575793087237.jpg","isDel":0,"shareDescription":"胶质厚实，滋补养生【12.10提货】","goodsNum":0,"tagList":[]},{"id":"6609363913228165120","goodsNumErp":368817983,"goodsId":"6606467430371827712","activityId":"6609363912930369536","goodsName":"广州酒家秋之风万福腊肠400g","discountedPrice":25.80,"scribingPrice":34.80,"activityStock":69,"isShow":1,"sortNumber":12,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1575792918939.jpg","isDel":0,"shareDescription":"广式风味，肥而不腻，口感鲜香【12.10提货】","goodsNum":0,"tagList":[]
        }
      }
    },
     count: {
      type: Number,
      default: 1
    },
  },
  components: {
    NumHandle,
    OnlinePrice
  },

  methods: {
    /**
     * @description 点击了商品，正常商品跳转商品详情
     */
    tabGoods () {
      wx.navigateTo({
        url: `/pages/goods/detail/main?id=${this.item.id}&activityId=${this.item.activityId}&activityGoodsId=${this.item.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  align-items: center;
  position: relative;
  .goods-img{
    width: 170rpx;
    height: 170rpx;
    margin-right: 12rpx;
    position: relative;
    // border: 1px solid $theme-color;
    .sell-gone-tag{
      width: 140rpx;
      height: 140rpx;
      line-height: 140rpx;
      text-align: center;
      background:rgba(0,0,0,1);
      opacity:0.6;
      z-index: 10;
      border-radius:50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -70rpx 0 0 -70rpx;
      color:#FFFFFF;
      font-size: 28rpx;
    }
    img{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .card-main{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 380rpx;
    padding-right: 20rpx;
    padding-bottom: 28rpx;
    box-sizing: border;
    padding-top: 28rpx;
    box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E6E6E6;
    &-top{
      .goods-name{
        color:#272727;
        font-weight:500;
        font-size:30rpx;
        width: 338rpx;
        @include ellipsis;
      }
      .goods-desc{
        color:#999999;
        font-size:24rpx;
        width: 331rpx;
        margin: 19rpx 0 13rpx;
        @include ellipsis;
      }
      .limit{
        width:67rpx;
        height:30rpx;
        margin-bottom: 17rpx;
      }
      .limit-tag{
        width:67rpx;
        height:30rpx;
        line-height: 30rpx;
        text-align: center;
        border:1rpx solid rgba(248,172,8,1);
        border-radius:4rpx;
        color: #F8AC08;
        font-size: 22rpx;
      }
    }
    &-bottom{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .price-area{
        display: flex;
        align-items: flex-end;
        line-height: 1;
        margin-bottom: 13rpx;
      }
      .current-price{
        color: #ff0000;
        font-weight: bold;
        margin-right: 10rpx;
        &__sign{
          font-size: 20rpx;
        }
        &-before-point{
          font-size: 34rpx;
        }
        &__point{
          font-size: 34rpx;
        }
        &-after-point{
          font-size: 24rpx;
        }
      }
      .line-price{
        color: #3D3C3C;
        font-size: 22rpx;
        text-decoration: line-through;
      }
      .sell-num{
        color:#787878;
        font-size: 20rpx;
      }
    }
  }
  &-mask{
    background:rgba(253,253,253,1);
    opacity:0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
}
</style>
