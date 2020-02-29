<template>
  <div class="image-wrap">
    <img
      :src="imgInfo.bannerUrl"
      class="slide-image"
      mode
      @click="navToDetail(imgInfo.turnType,imgInfo.turnPage,imgInfo.turnId)"
      v-if="imgInfo"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { resgiterOrLogin } from '@/utils/index'
export default {
  props: {
    list: {
      //主题数据列表
      type: Array,
      dafault: () => []
    }
  },

  computed: {
    ...mapState(['sessionId']),
    imgInfo () { //图片相关信息
      return this.list && this.list[0]
    }
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

<style lang="scss">
.image-wrap{
  img {
    vertical-align: middle;
    width: 100%;
    height: 200rpx;
    border-radius: 20rpx;
  }
}
</style>
