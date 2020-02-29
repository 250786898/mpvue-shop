<template>
  <div class="theme weui-flex">
    <!-- adType === 'ADOne' -->
    <div v-if=" adType === 'ADOne'" class="ad-one">
      <div class="weui-flex" >
        <div class="weui-flex__item ad-one-left"  >
           <block v-for="(item,index) in list" v-bind:key="item.turnId">
              <img :src="item.state ? item.bannerUrl : ''" v-if="index < 1 " @click="navToDetail(item.turnType,item.turnPage,item.turnId)">
            </block>
        </div>
        <div class="weui-flex__item ad-one-right">
          <block v-for="(item,index) in list" v-bind:key="item.turnId">
              <img :src="item.state ? item.bannerUrl : ''" v-if="index >= 1" @click="navToDetail(item.turnType,item.turnPage,item.turnId)">
          </block>
        </div>
      </div>
    </div>
    <div v-else class="weui-flex" >
      <div class="weui-flex__item ad-one-right">
        <div  v-for="(item,index) in list" v-bind:key="item.turnId">
           <img :src="item.state ? item.bannerUrl : ''" v-if="index < 2">
        </div>

      </div>
      <div class="weui-flex__item ad-one-right">
        <div  v-for="(item,index) in list" v-bind:key="item.turnId">
           <img :src="item.state ? item.bannerUrl : ''" v-if="index >= 2">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { resgiterOrLogin } from '@/utils/index'
export default {
  props: {
    adType:{ //广告类型： ADOne(左边单独一张AD，两边两张) ADTwo(左右各两张AD)
      type: String,
      default: 'ADOne'
    },
    list: { //主题数据列表
      type: Array,
      dafault: () => ([])
    }
  },

  computed: {
    ...mapState(['sessionId'])
  },

  methods: {
    /**
     * @param {string} turnType 跳转的类型
     * @param {string} turnUrl 跳转的链接
     * @param {string} turnId 跳转的参数id
     * @description 跳转详情
     */
     navToDetail(turnType, turnUrl, turnId) {
      if (turnType == 1) {
        //跳转商品详情类型
        wx.navigateTo({
          url: `/${turnUrl}?id=${turnId}&type=2`
        })
      } else if (turnType == 2) {
        //跳转活动界面
        if (!this.sessionId) {
          //未登录
          resgiterOrLogin()
          return
        }
        wx.navigateTo({
          url: `/${turnUrl}?id=${turnId}`
        })
      } else if (turnType == 3){
        //跳转其他小程序
        wx.navigateToMiniProgram({
          appId: turnId
        })
      }else {
        //其他类型
        wx.navigateTo({
          url: `/${turnUrl}?id=${turnId}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.theme{
  img{
    border-radius: 20rpx;
  }
  .weui-flex__item{
    width: 50%;
    display: flex;
    flex-direction: column;
    &:nth-of-type(1){
      margin-right: 10rpx;
    }
  }
  .ad-one{
    &-left{
      img{
        width:350rpx;
        height:458rpx;
        border-radius:10prx;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      img{
        width:350rpx;
        height:224rpx;
        border-radius:10prx;
      }
    }
  }
}
</style>
