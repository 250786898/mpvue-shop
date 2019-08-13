<template>
	<div class="goods-recommend">
    <div class="goods-recommend__title">
      <template v-if="type == 1">为你推荐</template>
      <template v-else-if="type == 2">猜你喜欢</template>
    </div>
    <div class="goods-recommend__bd">
      <goods-tabs
        :goodsList="this.goodsList"
        :classList="this.tab"
        :loading="loading"
        :isAllLoaded="isAllLoaded"
        @tabChange="tabChange($event)">
      </goods-tabs>
  
      <!-- <div class="goods-list">
        <div class="weui-flex">

            <goods-row-item :item="item"></goods-row-item>
          </div>
      </div>
    </div> -->

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import GoodsTabs from './GoodsTabs'
  import GoodsRowItem from '@/components/GoodsRowItem'

  //显示商品的数量
  const showPageSize = 10

  export default {
    props: {
      type: {
        type: Number,
        default: 1 // 1为“为你推荐”，2为“猜你喜欢”
      }
    },

    data () {
      return {
        "currentPage": 1, //当前页数
        "goodsList": [], //喜欢商品数据
        "tab": [], //分类栏
        "isAllLoaded": false, //是否全部加载数据,
        "loading": false, //是否向上更新
        "pcId": null //当前分类编码
      }
    },
    components: {
      GoodsTabs,
      GoodsRowItem
    },
    computed: {
      ...mapState(['storeId']),
    },
    methods: {
      //获取猜你喜欢数据
      getGoodsClassList(storeId, pcId, pageNumber, pageSize) {
        this.loading = true
        let promise
        console.log('getGoodsClassList',storeId)
        if (this.type === 1) {
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
        } else {
          promise = Api.index.likeGoods({ storeId, pcId }).then(res => {
            if(res.code == Api.CODES.SUCCESS){
              var data = res.data
              this.tab = data.classList
              this.goodsList = data.goodsList
              this.isAllLoaded = true
            }
          })
        }

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
        this.goodsList = []//喜欢商品数据
        this.isAllLoaded = false//是否全部加载数据,
        this.loading =  false//是否向上更新
      }
    },

    onShow() {
      console.log('onShow')
      this.initData()
      this.getGoodsClassList(this.storeId , this.pcId , this.currentPage , showPageSize)
    },
    
    mounted() {
      console.log('log')
      this.getGoodsClassList(this.storeId , this.pcId , this.currentPage , showPageSize)
    },

    //上触发更新数据
    onReachBottom: function(){
      if (this.isAllLoaded || this.loading) return
      //还有数据，加载数据
      this.currentPage++
      this.getGoodsClassList(this.storeId, this.pcId, this.currentPage , showPageSize)
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
      font-size: 40rpx;
      color: #3B3D40;
      padding-left: 25rpx;
      font-weight:bold;
      margin-top:10rpx;
      
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