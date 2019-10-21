<template>
	<div class="goods-recommend">
      <!-- <goods-list-tab /> -->
      <!-- <van-tabs sticky @change="tabChange" :active="activeIndex" tab-active-class="tab-active-class" :swipe-threshold="1" tab-class="tab-class" color="#11D2C8" class="fixed-tab" v-if="isCeiling">

        <van-tab  v-for="item in tab" :title="item.title" :key="item.pcId"></van-tab>


      </van-tabs>

      <van-tabs sticky @change="tabChange" :active="activeIndex" tab-active-class="tab-active-class" :swipe-threshold="4" tab-class="tab-class" color="#11D2C8" v-if="!isCeiling">

        <van-tab  v-for="item in tab" :title="item.title" :key="item.pcId"></van-tab>


      </van-tabs> -->
      <div class="goods-recommend__title">
       今日秒杀
      </div>

      <div class="goods-recommend__bd" :class="{'ceiling-goods-list' : isCeiling}">
        <template v-for="item in goodsList">
          <base-goods-card :item="item" :key="item.id" />
        </template>
         <EmptyGoods v-if="goodsList.length == 0 && !loading"/>
      </div>
      <!-- 加载更多 -->
      <div class="goods-recommend__footer">
        <lj-loading v-if="!isAllLoaded && loading" />
        <div class="goods-tabs__tip" v-if="isAllLoaded && goodsList.length">亲,已经看到最后啦！</div>
      </div>







       <!-- <goods-tabs
            :goodsList="this.goodsList"
            :classList="this.tab"
            :loading="loading"
            :isAllLoaded="isAllLoaded"
            @tabChange="tabChange($event)">
          </goods-tabs> -->

         <!-- 商品空的时候显示空组件 -->


  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import GoodsTabs from '@/components/GoodsTabs'
  import GoodsRowItem from '@/components/GoodsRowItem'
  import EmptyGoods from "../EmptyGoods/index"
  import GoodsListTab from "../GoodsListTab/index"
  import BaseGoodsCard from "../BaseGoodsCard/index"
  import BeginGoodsCard from "../BeginGoodsCard/index"
  import LjLoading from '@/components/LjLoading'

  //显示商品的数量
  const showPageSize = 10

  export default {
    props: {
      isCeiling: { //是否吸顶
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        currentPage: 1, //当前页数
        tab: [
          {
            pcId: 1,
            title: '今日秒杀'
          },
          // {
          //   pcId: 10,
          //   title: '即将开抢'
          // },

          // {
          //   pcId: 31,
          //   title: '内容3',

          // },
          // {
          //   pcId: 31,
          //   title: '内容4'

          // },
          // {
          //   pcId: 31,
          //   title: '内容5'

          // },
          // {
          //   pcId: 31,
          //   title: '内容6'
          // }
        ], //分类栏
        pcId: 1, //当前分类编码
        activeIndex: 0, //当前分类索引
        tabColor: '#11D2C8', //tab颜色值
        goodsList: [],  //商品列表
        isAllLoaded: false,
        loading: false, //是否向上触发更新
      }
    },
    components: {
      GoodsTabs,
      GoodsRowItem,
      EmptyGoods,
      GoodsListTab,
      BaseGoodsCard,
      BeginGoodsCard,
      LjLoading
    },
    computed: {
      ...mapState(['storeId']),
    },
    watch: {
      storeId: function () {
        console.log('goodlostStoreId修改了aaaaaaaaaaaaaaaaaaa',this.storeId)
        this.getGoodsClassList(this.storeId , this.pcId , 1 , showPageSize)
      }
    },
    methods: {

      clickTab (event) {
        console.log('clickTab',event)
      },

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
      tabChange ({ mp: { detail: { index } } }) {

        if(this.isCeiling) {
          //如果已经处于吸顶状态切换到初始化相对应的滚动条
          wx.pageScrollTo({ scrollTop: 157 })
        }



        this.activeIndex = index
        console.log('tabChange',index)
        this.pcId = this.tab[index].pcId
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


    mounted() {
      console.log('goodMountedList',this.storeId)
      if(this.storeId) {
        this.getGoodsClassList(this.storeId , this.pcId , this.currentPage , showPageSize)
      }
    },

    //上触发加载分页数据
    onReachBottom: function(){
      if (this.isAllLoaded || this.loading) return
      //还有数据，加载数据
      this.currentPage++
      this.getGoodsClassList(this.storeId, this.pcId, this.currentPage , showPageSize)
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

<style lang="scss">
@keyframes fadeInDown
{
    from {
        transform: translateY(-100%);

    }
    to {
          transform: translateY(0);
    }
}

//tab栏样式
.fixed-tab{
  z-index: 10;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  top: 100rpx;
  animation: fadeInDown .3s linear;
 }

// 吸顶状态下门店列表外边距增加
.ceiling-goods-list{
  margin-top: 0;
  min-height: 1500rpx;
}

//  /*从上到下进入*/
.fadeInDown {
  animation-name: fadeInDown;
}



.fixed-goods-list{
  z-index: 99;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 188rpx;
}

.tab-class {
  color:#717171 !important;
  font-size: 26rpx !important;
  font-weight:800 !important;
}

// 标签激活态样式类
.tab-active-class{
  color:#11D2C8 !important;
  font-size: 32rpx !important;
  font-weight:800 !important;
}
</style>

<style scoped lang="scss">
  .goods-row-item{
    // background-color:rgb(190, 29, 29);
    margin-bottom: 6rpx;
  }

  .goods-row-item__price{
    position:absolute;
    margin-top:36rpx;
  }

  .goods-tabs__tip {
    height: 116rpx;
    padding: 20rpx;
    font-size: 26rpx;
    line-height: 124rpx;
    color: $text-gray;
    text-align: center;
  }

 .goods-recommend {
    width: 710rpx;
    box-sizing: border-box;
    border-radius:14rpx;
    &__bd{
      background: #fff;
      border-bottom-left-radius: 14rpx;
      border-bottom-right-radius: 14rpx;
    }
    &__footer {
      background: #f5f5f5;
    }
    &__title {
      margin: 0 auto;
      height: 90rpx;
      line-height: 90rpx;
      text-align: left;
      font-size: 36rpx;
      color: #272727;
      background: #fff;
      font-weight:800;
      padding-left: 29rpx;
      border-top-left-radius: 14rpx;
      border-top-right-radius: 14rpx;
      border-bottom: #F0F0F0 1rpx solid;
      box-sizing: border-box;
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
