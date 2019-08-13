<template>
  <div class="goods-row-item">
    <navigator
      :url="'/pages/goods/detail/main?id=' + item.id+ '&activityId=' + (item.activityId || '') + '&activityGoodsId=' + (item.id || '')"
      class="weui-media-box weui-media-box_appmsg"
      hover-class="weui-cell_active"
      >
      <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
        <img class="weui-media-box__thumb" :src="item.goodsImage" mode="aspectFit"/>
        <img :src="item.goodsTagImage" class="marker" v-if="item.goodsTagStatus == 1">
      </div>

      <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
        <div class="weui-media-box__title">{{ item.goodsName }}</div>
        <div class="weui-media-box__desc" v-if="item.shareDescription">{{ item.shareDescription || '' }}</div>
        <div class="goods-row-item__tb" v-if="item">
  <!-- 替换组件 -->
    <div class="goods-row-item__price"  >
      <div class="primary">￥{{ item.onlinePrice }}</div>
      <div class="secondary" v-if="item.onlineScribingPrice">￥{{ item.onlineScribingPrice }}</div>
    </div>
          <!-- <goods-price :item="item"></goods-price> -->
          <form report-submit="true" @submit="uploadFormId"> 
            <button form-type="submit" class="hiddenBtn" @click.stop="addToCart(item.id)">
              <img src="/static/images/common_btn_shopcart_small.png@2x.png" class="icon-cart" @click.stop="addToCart(item.id)">
            </button>
          </form> 
        </div>
      </div>
      <div class="xian"></div>
    </navigator>
  </div>
</template>

<script>
  import {Api} from '@/http/api'
  import GoodsPrice from '@/components/GoodsPrice'

  export default {
    components: {
      GoodsPrice
    },
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      // isMultiDesc
      // 是否热销
      isHot: {
        type: Boolean,
        default: false
      }
    },

    computed: {
    },


// 接收后台返回的商品信息

    methods: {
        attached(){
       console.log('333333',this.$store.state.shopDetail.storeId)
      //   Api.index.storeGoodsListByshopId({
      //   storeId: this.storeId
      // })
      // .then(res => {
      //   if (res.code === Api.CODES.SUCCESS) {
      //     console.log('9999',res)
      //     this.storeList = res.data.storeList

   
      //   }
      // })

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
      addToCart(activityGoodsId) {
        this.$store.dispatch('addToCart', {
          goodsId: this.item.goodsId || this.item.id,
          activityId: this.item.activityId,
          activityGoodsId    
        })
      }
    },

onLoad(){
  this.attached()
}

  }
</script>

<style lang="scss" scoped>
  .weui-media-box__bd_in-appmsg{
    float:right;
    width: 428rpx;
    height: 208rpx;

  }

  .goods-row-item__price{
    position:absolute;
    top:150rpx;
    .secondary{
      padding: 0;
    }
    .secondary{
      text-align: left;
    } 
  }

.goods-row-item__tb{
  position: relative;
    .hiddenBtn{
      right:-8rpx;
      top:111rpx;
    }
}
.goods-row-item{
  // position: relative;
  background-color: #fff;
  text-align: center;
  position: relative;
  .xian{
    position:absolute;
    bottom:0rpx;
    left:18rpx;
    width: 669rpx;
    height: 1rpx;
    border-bottom:1px solid rgb(243, 243, 243);
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
    position: absolute;
    right: 6rpx;
    bottom: 0rpx;
    width: 66rpx;
    height: 66rpx;

  }
}
</style>
