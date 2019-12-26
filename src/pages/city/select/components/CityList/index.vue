<template>
    <div class="container">
      <scroll-view
        :scroll-y="true"
        :scroll-with-animation="true"
        :scroll-into-view="currentLetter"
        @scroll="scrollCityList"
        class="list"
        >

        <div class="list-item" v-for="(item,key) in cityObject" v-bind:key="key" :id="key">
          <div class="list-item-letter">{{key}}</div>
          <div class="list-item-city" v-for="(cityItem,cityIndex) in item" v-bind:key="cityIndex">
            <span>{{cityItem.name}}</span>
            <!-- <image
              src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_choice_big_s.png"
              mode="scaleToFill"
              lazy-load="false"
              class="current-select-city-icon"
            >
            </image> -->
          </div>
        </div>

        <p class="more-city-tip">更多城市正在努力开通中，敬请期待...</p>

      </scroll-view>

      <div class="letter-list">
          <div
            class="letter-list-item"
            v-for="(item,key) of cityObject"
            v-bind:key="key"
            :class="{ activity: key == currentLetter}"
            @click="changeLetter(key)"
          >
            {{key}}
          </div>
        </div>
      </div>

</template>

<script>
import cityObject from "../../../../../../static/cityList.json";
export default {
  data () {
    return {
      currentLetter: 'A', //当前城市列表字母锚点
      cityObject
    }
  },
  methods: {
    /**
     * @description 改变字母锚点
     */
    changeLetter (letter) {
      if(letter) {
        this.currentLetter = letter
      }
    },


    /**
     * @description
     */
    scrollCityList (e) {
      console.log('e',e)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100vh;
  &-item{
    &-letter{
      line-height: 88rpx;
      padding: 0 20rpx;
      background: #F1F1F1;
      color: #01BD9F;
      font-size: 22rpx;
    }
    &-city{
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 88rpx;
      padding: 0 53rpx 0 30rpx;
      background: #ffffff;
      color: #666666;
      font-size: 30rpx;
      border-bottom:1px solid #EBEBEB;
      &:nth-last-of-type(1){
        border-bottom: none;
      }
    }
  }

  .current-select-city-icon{
    width: 36rpx;
    height: 36rpx;
  }

  .more-city-tip{
    color: #B2B2B2;
    font-size: 28rpx;
    padding: 73rpx 0 123rpx;
    text-align: center;
  }
}
.letter-list{
  position: fixed;
  top: 200rpx;
  right: 20rpx;
  width: 20rpx;
  text-align: center;
  &-item{
    color: #666666;
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }
  .activity{
    color: #01BD9F;
  }
}
</style>
