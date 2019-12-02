<template>
	<view class="goods-recommend min-contaner" id="goods-list">

        <!-- <goods-list-tab /> -->
      <div class="goods-recommend__title" :class="{'fixed-tab' : isCeiling}" :style="isCeiling ? fixedTop : '' " v-if="tab.length == 1">
        <span v-for="item in tab" :key="item.id">{{item.activityName}}</span>
      </div>

      <div v-else>

        <van-tabs
          @tab="tabChange"
          :active="activeIndex"
          tab-active-class="tab-active-class"
          custom-class="custom-class"
          :swipe-threshold="4"
          tab-class="tab-class"
          line-width="26"
          line-height="5"
          line-bottom="11"
          color="#01BD9F"
          :ellipsis="false"
          :class="isCeiling ? 'fixed-tab' : ''"
          :style="isCeiling ? fixedTop : '' "
        >

          <van-tab  v-for="item in tab" :title="item.activityName" :key="item.id"></van-tab>

        </van-tabs>

      </div>


      <div class="goods-recommend__bd goods-list" :style="{ marginTop:isCeiling? '40px' : '0px' }"  v-if="goodsList && goodsList.length > 0">
        <template v-for="item in goodsList">
          <div class="goods-card" :key="item.id">
            <goods-card :item="item"  :isSellOut="item.activityStock == 0"/>
          </div>

          <!-- <base-goods-card :item="item" :key="item.id" :isSellOut="item.activityStock == 0"/>  -->
        </template>
      </div>
        <!-- 加载更多 -->
        <div class="goods-recommend__footer">
          <lj-loading v-if="!isAllLoaded && loading" />
          <div class="goods-tabs__tip" v-if="isAllLoaded && goodsList.length">我是有底线的！</div>
      </div>

      <template v-if="goodsList.length == 0 && !loading">
          <EmptyGoods/>
      </template>




  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import GoodsTabs from '@/components/GoodsTabs'
  import GoodsRowItem from '@/components/GoodsRowItem'
  import EmptyGoods from "../EmptyGoods/index"
  import BaseGoodsCard from "../BaseGoodsCard/index"
  import GoodsCard from './components/GoodsCard'
  import BeginGoodsCard from "../BeginGoodsCard/index"
  import LjLoading from '@/components/LjLoading'
  import GoodsModel from '@/model/goods'

  const goodsModel = new GoodsModel()
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
        tab: [], //分类栏
        activityId: '', //当前分类编码
        activeIndex: 0, //当前分类索引
        goodsList: [],  //商品列表
        isAllLoaded: false, //是否全部加载完毕
        loading: false, //是否触发更新数据

      }
    },
    components: {
      GoodsTabs,
      GoodsRowItem,
      EmptyGoods,
      BaseGoodsCard,
      BeginGoodsCard,
      GoodsCard,
      LjLoading
    },
    computed: {
      ...mapState(['storeId',"indexGoodsTop","indexBarHeight"]),
      fixedTop () {
        return `top:${this.indexBarHeight}px`
      }
    },
    watch: {
      storeId: function () {
        console.log('goodlostStoreId修改了aaaaaaaaaaaaaaaaaaa',this.storeId)
        this.initData()
        this.setTabsList()
      }
    },


    //上触发加载分页数据
    onReachBottom: function(){
      if (this.isAllLoaded || this.loading) return
      //还有数据，加载数据
      this.currentPage++
      this.getGoodsListByActivityId(this.storeId , this.activityId , this.currentPage )
    },

      /**
     * @description 向上更新商品数据
     */
    onPullDownRefresh () {
      console.log('onPullDownRefresh')
      this.initData()
      this.setTabsList()
    },


    mounted() {
      let _this = this

  　　setTimeout(function(){
  　    　_this.getElementHeight('#goods-list')
  　　}, 100)

        if(this.storeId) {
          this.setTabsList()
          this.getGoodsListByActivityId()
        }
    },

    methods: {

      getElementHeight(id = "") {
　　　　 let _query = wx.createSelectorQuery();
　　　　_query.select(id).boundingClientRect()
　　　　_query.exec((res) =>{
          console.log('#affix节点的上边界坐2222222222',res); // #affix节点的上边界坐
          const tTop = res[0] && res[0].top != null ? res[0].top : ''
          this.$store.commit('setIndexGoodsTop',tTop)
　　　　 })
　　 },

      clickTab (event) {
        console.log('clickTab',event)
      },


      async setTabsList () {
        const res = await goodsModel.findActivityByStoreId({
          storeId: this.storeId || ''
        })
        console.log('res.code11111111111111111',res.code)
        if(res.code == Api.CODES.SUCCESS) {
          this.tab = res.data.activityList
          this.activityId = this.tab[0].id  //设置默认活动Id
          this.getGoodsListByActivityId(this.storeId , this.tab[0].id , this.currentPage )
        }

      },

      async refreshTabsList () {
        const res = await goodsModel.findActivityByStoreId({
          storeId: this.storeId || ''
        })
        console.log('res.code11111111111111111',res.code)
        if(res.code == Api.CODES.SUCCESS) {
          this.tab = res.data.activityList
        }

      },

      getGoodsListByActivityId (storeId, activityId, pageNumber) {
        this.loading = true
        let promise
       promise = goodsModel.findGoodsByActivity({
         storeId, activityId, pageNumber
        }).then(res => {
          if(res.code == Api.CODES.SUCCESS){
            var data = res.data
            console.log('数据条用成功了',data.goodsList == null)
            if(data.goodsList != null) {
              console.log('//有可以加载的数据了',data.goodsList)
              this.goodsList = this.goodsList.concat(data.goodsList)
            } else {
              //没有可以加载的数据了，显示到底
              console.log('//没有可以加载的数据了，显示到底')
              this.isAllLoaded = true
            }
          }
        })
        promise
        .catch(e => e)
        .then(() => this.loading = false)
      },


      /**
       * @description  切换分类
       */
      tabChange ({ mp: { detail: { index } } }) {
        if(this.isCeiling) {
          //如果已经处于吸顶状态切换到初始化相对应的滚动条
          const ceilingDistance =  this.indexGoodsTop - this.indexBarHeight
          wx.pageScrollTo({ scrollTop: ceilingDistance })
        }
        this.goodsList = []
        this.currentPage = 1
        this.isAllLoaded = false
        this.activeIndex = index
        this.activityId = this.tab[index].id
        this.getGoodsListByActivityId(this.storeId , this.activityId , this.currentPage )
      },


      initData(){
        this.currentPage = 1
        this.goodsList = []//商品数据
        this.activeIndex = 0 //恢复默认索引
        this.isAllLoaded = false//是否全部加载数据,
        this.loading =  false//是否向上更新
      }
    },







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

.min-contaner{
  min-height: 1300rpx;
}

.custom-class{
  border-bottom: 1rpx solid rgba(204, 204, 204, 0.3);
}

//tab栏样式
.fixed-tab{
  z-index: 10;
  width: 100%;
  position: fixed;
  left: 0;
  animation: fadeInDown .3s linear;
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
  color:#798194 !important;
  font-size: 34rpx !important;
  font-weight:500 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

// 标签激活态样式类
.tab-active-class{
  color:#363F52 !important;
  font-weight:bold !important;
  font-size: 34rpx;
}
</style>

<style scoped lang="scss">
  .goods-row-item{
    margin-bottom: 6rpx;
  }

  .goods-row-item__price{
    position:absolute;
    margin-top:36rpx;
  }

  .goods-tabs__tip {
    padding: 25rpx 0 50rpx;
    font-size: 28rpx;
    color: #B2B2B2;
    text-align: center;
  }

 .goods-recommend {
    width: 710rpx;
    box-sizing: border-box;
    border-radius:14rpx;
    .goods-list{
      padding: 0 20rpx;
    }
    .goods-card {
      border-bottom:1px solid rgba(204,204,204,0.3);
      &:nth-last-of-type(1){
        border-bottom: none;
      }
    }
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
