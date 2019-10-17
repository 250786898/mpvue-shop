<template>
  <div class="goods-item">

    <div class="begin-time" >7月27日 14：00开抢</div>

    <div class="goods-item-img">
      <img class="weui-media-box__thumb" :src="item.goodsImage" mode="aspectFit"/>
    </div>

    <div class="weui-media-box__title">{{ item.goodsName }}</div>
    <div class="weui-media-box__desc" v-if="item.shareDescription">{{ item.shareDescription || '' }}</div>

    <div class="goods-item-main">
      <div class="counter" v-if="currentGoodsCartNum > 0">
        <counter  v-model="currentGoodsCartNum" :max="item.inventoryAmount" @change="onGoodsNumChange($event,item)"></counter>
      </div>
      <form report-submit="true" @submit="uploadFormId" v-else>
        <button hover-class="none" form-type="submit" class="hiddenBtn" @click.stop="addToCart(item.id)">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_btn_shopcart_small.png@2x.png" class="icon-cart" @click.stop="addToCart(item.id)">
        </button>
      </form>
    </div>
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
          goodsId: this.item.goodsId || this.item.id,
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
.goods-item{
  width:346rpx;
  height:510rpx;
  background:rgba(255,255,255,1);
  box-shadow:1rpx 4rpx 43rpx 0px rgba(153,153,153,0.2);
  border-radius:10rpx;
}
</style>
