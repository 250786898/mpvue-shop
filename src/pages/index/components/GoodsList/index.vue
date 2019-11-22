<template>
	<view class="goods-recommend min-contaner" id="goods-list">
      <!-- <goods-list-tab /> -->
      <div class="goods-recommend__title" :class="{'fixed-tab' : isCeiling}" v-if="tab.length == 1">
        <span v-for="item in tab" :key="item.id">{{item.activityName}}</span>
      </div>
      <template v-else>
         <van-tabs sticky @change="tabChange" :active="activeIndex" tab-active-class="tab-active-class" :swipe-threshold="4" tab-class="tab-class" color="#0FD7C0" class="fixed-tab" v-if="isCeiling">

          <van-tab  v-for="item in tab" :title="item.activityName" :key="item.id"></van-tab>


        </van-tabs>

        <van-tabs sticky @change="tabChange" :active="activeIndex" tab-active-class="tab-active-class" :swipe-threshold="4" tab-class="tab-class" color="#0FD7C0" v-if="!isCeiling">

          <van-tab  v-for="item in tab" :title="item.activityName" :key="item.id"></van-tab>


        </van-tabs>

      </template>

    <!--
     <div class="goods-recommend__title">
        <span>今日秒杀</span> :class="{'ceiling-goods-list' : isCeiling}"

      </div> -->

      <div class="goods-recommend__bd" :style="{ marginTop:isCeiling? '40px' : '0px' }">
        <template v-for="item in goodsList">
          <base-goods-card :item="item" :key="item.id" :isSellOut="item.activityStock == 0"/>
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


  </view>
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
        tabColor: '#11D2C8', //tab颜色值
        goodsList: [],  //商品列表
        isAllLoaded: false,
        loading: false, //是否向上触发更新
        activeColor: '#000',
        fontSize: 24
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
      ...mapState(['storeId',"indexGoodsTop","indexBarHeight"])
    },
    watch: {
      storeId: function () {
        console.log('goodlostStoreId修改了aaaaaaaaaaaaaaaaaaa',this.storeId)
        // this.getGoodsListByActivityId(this.storeId , this.activityId , 1 )
        this.initData()
        this.setTabsList()
        // this.getGoodsClassList(this.storeId , this.pcId , 1 , showPageSize)
      }
    },


    //上触发加载分页数据
    onReachBottom: function(){
      if (this.isAllLoaded || this.loading) return
      //还有数据，加载数据
      this.currentPage++
      this.getGoodsListByActivityId(this.storeId , this.activityId , this.currentPage )
      // this.getGoodsClassList(this.storeId, this.pcId, this.currentPage , showPageSize)
    },

      /**
     * @description 向上更新商品数据
     */
    onPullDownRefresh () {
      console.log('onPullDownRefresh')
      this.initData()
      this.setTabsList()
      // this.refreshTabsList()
      // this.getGoodsListByActivityId(this.storeId , this.activityId , 1 )
      // this.getGoodsClassList(this.storeId , this.pcId , 1 , showPageSize)
    },


    mounted() {
      　let _this = this

　　setTimeout(function(){
　    　_this.getElementHeight('#goods-list')
　　}, 100)
      // const query = wx.createSelectorQuery()
      // console.log('#affixquery',query)
      // query.select('#the-id').boundingClientRect()
      // console.log('#affixquery2',query)
      // // query.selectViewport().scrollOffset()
      // // console.log('#affixquery3',query)
      // query.exec(function(res){
      //   console.log('#affixquery4',res)
      //   // res[0].top       // #the-id节点的上边界坐标
      //   // res[1].scrollTop // 显示区域的竖直滚动位置
      // })
      // console.log('goodMountedList',this.storeId)
      // wx.createSelectorQuery().select('#goods').boundingClientRect((rect) =>{
      //      console.log('#affix节点的上边界坐',rect); // #affix节点的上边界坐
      // }).exec()

      if(this.storeId) {
        this.setTabsList()
        this.getGoodsListByActivityId()

        // this.getGoodsClassList(this.storeId , this.pcId , this.currentPage , showPageSize)
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
          const ceilingDistance =  this.indexGoodsTop - this.indexBarHeight
          console.log('tabChange',this.indexBarHeight,this.indexGoodsTop,ceilingDistance)
          wx.pageScrollTo({ scrollTop: ceilingDistance })
        }



        this.activeIndex = index
        this.activityId = this.tab[index].id
        this.goodsList = []
        this.currentPage = 1
        this.isAllLoaded = false
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
  // margin-top: 44px;
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
  color:#333 !important;
  font-size: 30rpx !important;
  font-weight:800 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  // border-right: 1px solid #eee !important;
  // &:after{
  //   content: ' ' !important;
  //   width: 1px !important;
  //   height: 50rpx !important;
  //   background: $text-black !important;
  //   display: flex !important;
  //   margin-left: 0rpx;
  // }
}

// 标签激活态样式类
.tab-active-class{
  color:#333 !important;
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
