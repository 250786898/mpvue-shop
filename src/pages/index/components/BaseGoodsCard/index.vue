<template>
  <div class="goods-row-item">
    <navigator
      :url="'/pages/goods/detail/main?id=' + item.id+ '&activityId=' + (item.activityId || '') + '&activityGoodsId=' + (item.id || '')"
      class="weui-media-box weui-media-box_appmsg goods-card"
      hover-class="weui-cell_active"
      >
      <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
        <img class="weui-media-box__thumb" :src="item.goodsImage" mode="aspectFit"/>
        <img :src="item.goodsTagImage" class="marker" v-if="item.goodsTagStatus == 1">
        <div class="sell-out-icon" v-if="!item.activityStock">已抢光</div>
      </div>

      <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
        <div class="goods-maim-content">
          <div class="weui-media-box__title">{{ item.goodsName }}</div>
          <div class="weui-media-box__desc" v-if="item.goodsSellDesc">{{ item.goodsSellDesc || '' }}</div>
          <div class="limit-tag" v-if="item.activityLimitNum">限量秒杀</div>
        </div>

        <div class="goods-handle-box" v-if="item">
        <!-- 替换组件 -->
        <div class="goods-row-item__price">

          <div class="primary">￥{{ item.discountedPrice }}</div>
          <div class="secondary" v-if="item.scribingPrice">￥{{ item.scribingPrice }}</div>

          <!-- <div class="primary">￥{{ item.onlinePrice }}</div>
          <div class="secondary" v-if="item.onlineScribingPrice">￥{{ item.onlineScribingPrice }}</div> -->
        </div>
          <!-- <goods-price :item="item"></goods-price> -->

          <div class="counter" v-if="currentGoodsCartNum > 0">
            <counter  v-model="currentGoodsCartNum" :max="item.inventoryAmount" @change="onGoodsNumChange($event,item)"></counter>
          </div>
          <form report-submit="true" @submit="uploadFormId" v-else>
            <button hover-class="none" form-type="submit" class="hiddenBtn"  v-if="!item.activityStock">
              <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_btn_shopcart_sellout.png@2x.png" class="icon-cart">
            </button>
            <button hover-class="none" form-type="submit" class="hiddenBtn" @click.stop="addToCart(item.id)" v-else >
              <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_btn_shopcart_small.png@2x.png" class="icon-cart" >
            </button>
          </form>


        </div>
      </div>
      <div class="xian"></div>

    </navigator>
    <navigator class="sell-out-mask" v-if="!item.activityStock"  :url="'/pages/goods/detail/main?id=' + item.id+ '&activityId=' + (item.activityId || '') + '&activityGoodsId=' + (item.id || '')"></navigator>
  </div>
</template>

<script>
  import {Api} from '@/http/api'
  import GoodsPrice from '@/components/GoodsPrice'
  import Counter from '@/components/Counter'

  export default {
    components: {
      GoodsPrice,
      Counter
    },
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        currentGoodsCartNum: 0, //当前购物车数量
      }
    },

    computed: {
    },


// 接收后台返回的商品信息

    methods: {
      /**
       * @param {object} e count:增加或则减少的数量 type:类型(增加或则减少)
       * @description 增加或则减少购买的数量
       */
      onGoodsNumChange ({ count,type },item) {
        // console.log('count',count)
        // switch(type){
        //   case 'add':
        //   //添加购物车数量
        //   this.addToCart()
        //   break
        // }
        this.addToCart()
      },

      uploadFormId (e) {
        this.formId = e.target.formId
        Api.user.addFormId({
          formId: this.formId
        }).then((res) =>{
          if(res.code == Api.CODES.SUCCESS) {
            console.log('777',res)
          }
        })
      },

      addToCart(activityGoodsId = '') {
        console.log('currentGoodsCartNum',this.currentGoodsCartNum)
        this.$store.dispatch('addToCart', {
          goodsId: this.item.id,
          activityId: this.item.activityId,
          activityGoodsId
        })
      }
    },

onLoad(){
}

  }
</script>

<style lang="scss" scoped>

  // 已抢购相关样式
  .sell-out-card{
    background:rgba(253,253,253,1);
    opacity:0.5;
  }

  .sell-out-mask{
    background:rgba(253,253,253,1);
    opacity:0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }


  .sell-out-icon{
    width:140rpx;
    height:140rpx;
    line-height: 140rpx;
    text-align: center;
    background:rgba(0,0,0,1);
    border-radius:50%;
    color: $white-color;
    font-size: 28rpx;
    position: absolute;
    top: 15rpx;
    left: 45rpx;
    opacity:0.6;
    z-index: 8;
  }

  .goods-maim-content{
    display: flex;
    flex-direction: column;
    .limit-tag{
      width:56rpx;
      height:25rpx;
      line-height: 25rpx;
      text-align: center;
      border:1rpx solid rgba(248,172,8,1);
      border-radius:4rpx;
      color: #F8AC08;
      font-size:18rpx;
    }
  }

  .goods-handle-box{
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
  }

  .goods-card{
    height:268rpx;
  }

  .counter{
    position: absolute;
    top:160rpx;
    right: 0;
  }
  .weui-media-box__bd_in-appmsg{
    float:right;
    width: 428rpx;

  }
  .weui-media-box_appmsg{
    align-items: stretch;
  }
  .goods-row-item .weui-media-box{
    padding: 30rpx 20rpx;
  }

  .goods-row-item__price{
    .secondary{
      padding: 0;
    }
    .secondary{
      text-align: left;
    }
  }

.goods-row-item__tb{
    .hiddenBtn{
      right:-8rpx;
      top:111rpx;
    }
}
.goods-row-item{
  // position: relative;
  height:268rpx;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  border-bottom:1px solid rgb(243, 243, 243);
  .xian{
    position:absolute;
    bottom:0rpx;
    left:18rpx;
    width: 669rpx;
    height: 1rpx;
    opacity: 0.7;
  }
  .weui-media-box__desc{
    float:left;
    text-align: left;
    margin: 13rpx 0 ;
    height: 35rpx;
    width: 368rpx;
    line-height: 31rpx;
  }
  .weui-media-box__title{
    float:left;
    width: 405rpx;
    height: 37rpx;
    text-align: left;
    margin-bottom:0;
    font-size: 30rpx;
    font-weight:bold;
    margin-top: 8rpx;
    // word-wrap:break-word;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 33rpx;

  }
  .icon-cart{
    right: 6rpx;
    bottom: 10rpx;
    width: 56rpx;
    height: 56rpx;

  }
}
</style>
