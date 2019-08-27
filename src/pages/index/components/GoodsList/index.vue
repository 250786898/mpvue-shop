<template>
	<div class="goods-recommend">
    <div class="goods-recommend__title">
       今日秒杀
    </div>
   
    <div class="goods-recommend__bd" v-if="goodsList && goodsList.length > 0">
      <goods-tabs
        :goodsList="this.goodsList"
        :classList="this.tab"
        :loading="loading"
        :isAllLoaded="isAllLoaded"
        @tabChange="tabChange($event)">
      </goods-tabs>
    </div> 
    <!-- 商品空的时候显示空组件 -->
     <EmptyGoods v-if="goodsList.length == 0 && !loading"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import GoodsTabs from '@/components/GoodsTabs'
  import GoodsRowItem from '@/components/GoodsRowItem'
  import EmptyGoods from "../EmptyGoods/index"

  //显示商品的数量
  const showPageSize = 10

  export default {
    props: {
      goodsList: {//商品列表
        type: Array,
        default: () => ([])
      },
       isAllLoaded: {
        type: Boolean,
        default: false
      },
       //是否向上触发更新
      loading: {
        type: Boolean,
        default: false
      },
    },

    data () {
      return {
        "currentPage": 1, //当前页数
        "tab": [], //分类栏
        "pcId": null //当前分类编码
      }
    },
    components: {
      GoodsTabs,
      GoodsRowItem,
      EmptyGoods
    },
    computed: {
      ...mapState(['storeId']),
    },
    methods: {
      /**
       * @param
       * @description 获取商品数据
       */
      getGoodsClassList(storeId, pcId, pageNumber, pageSize) {
        this.loading = true
        let promise
        console.log('getGoodsClassList',storeId)

          promise = Api.index.topGoods({ storeId, pcId, pageNumber, pageSize }).then(res => {
            if(res.code == Api.CODES.SUCCESS){
              var data = res.data
              this.tab = data.classList        
              if(data.shopGoodsList.length > 0) {
                this.goodsList = this.goodsList.concat(data.shopGoodsList)          
              } else {
                //没有可以加载的数据了，显示到底
                this.isAllLoaded = true
              }
            }
          })

          promise
          .catch(e => e)
          .then(() => this.loading = false)
      },

      //切换分类
      tabChange (val) {
        this.pcId = this.tab[val].pcId
        this.goodsList = []
        this.currentPage = 1
        this.isAllLoaded = false
        this.getGoodsClassList(this.storeId , this.pcId , this.currentPage , showPageSize)
      },

      initData(){
        this.currentPage = 1
        this.goodsList = []//商品数据
        this.isAllLoaded = false//是否全部加载数据,
        this.loading =  false//是否向上更新
      }
    },

    onShow() { 
      // this.initData()
      // this.getGoodsClassList(this.storeId , this.pcId , this.currentPage , showPageSize)
    },
    
    mounted() {
      // this.getGoodsClassList(this.storeId , this.pcId , this.currentPage , showPageSize)
    },

    //上触发加载分页数据
    onReachBottom: function(){
      // if (this.isAllLoaded || this.loading) return
      // //还有数据，加载数据
      // this.currentPage++
      // this.getGoodsClassList(this.storeId, this.pcId, this.currentPage , showPageSize)
    },

    /**
     * @description 向上更新商品数据
     */
    onPullDownRefresh () {
      console.log('onPullDownRefresh')
      // this.getGoodsClassList(this.storeId , this.pcId , 1 , showPageSize)
    }
  }
</script>


<style scoped lang="scss">
  .goods-row-item{
        // background-color:rgb(190, 29, 29);
        margin-bottom: 6rpx;
      }

  .goods-row-item__price{
    position:absolute;
    margin-top:36rpx;
  }

 .goods-recommend {
    &__title {
      margin: 0 auto;
      line-height: 101rpx;
      text-align: left;
      font-size: 36rpx;
      color: #272727;
      padding-left: 25rpx;
      font-weight:800;  
      &::before,
      &::after {
        // content: '';
        display: inline-block;
        vertical-align: 8rpx;
        width: 10rpx;
        height: 10rpx;
        margin: 0 20rpx;
        border-radius: 10rpx;
        background-color: #333;
      }
    }
      .goods-list {
        padding: 10rpx;
        .weui-flex {
          flex-wrap: wrap;
          &__item {
            flex: 0 0 48%;
            // border-radius: 16rpx;
            width:48%;
            margin:1%;
            height: 538rpx;
            background: #fff;
          }
        }

    


        /deep/ .goods-row-item {
          margin: 5rpx;
          background-color: rgb(146, 27, 27);
          // border-radius: 10rpx;
          height: 538rpx;
          .weui-media-box {
            padding: 10rpx;
            &_appmsg {
              flex-direction:column;
            }
            &__hd_in-appmsg {
              width: 330rpx;
              height: 330rpx;
              margin-right: 0;
            }
            &__bd {
              padding-left: 10rpx;
              padding-right: 10rpx;
              width: 100%;
              box-sizing: border-box;
            }
            &__title {
              margin-top: 10rpx;
              margin-bottom: 4rpx;
              font-size: 28rpx;
              width: 300rpx;
            }
            &__desc {
              margin-bottom: 30rpx;
              line-height: 32rpx;
              height: 32rpx;
              font-size: 24rpx;
              -webkit-line-clamp: 1;
            }
          }
          &__tb {
            min-height: 72rpx;
            padding-bottom: 16rpx;
            .primary {
              font-size: 32rpx;
            }
            .icon-cart {
              right: -4rpx;
              bottom: 22rpx;
            }
          }
        }
      }
  }
</style>