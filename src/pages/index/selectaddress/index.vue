<template>
  <div class="container">
    <div class="backdrop" v-if="inputShowed"></div>
    <div class="weui-search-bar">
      <!-- 二期 -->
      <div class="city-selector" @click="cityModalShowed = true">{{cityname}}</div>
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
          <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
            <icon type="clear" size="14"></icon>
          </div>
        </div>
        <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
          <icon class="weui-icon-search" type="search" size="14"></icon>
          <div class="weui-search-bar__text">请输入收货地址</div>
        </label>
      </div>
      <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
    </div>
    <!-- 垫片 -->
    <div style="height: 96rpx;"></div>
    <div class="quick-tip" v-if="!storeId">
      <img src="/static/images/warning_icon@2x.png">
      <span>当前位置不在配送范围之内，请输入您的收货地址</span>
    </div>
    
    <div class="address-panels">
      <!-- <div class="weui-cells__title">我的收货地址</div> -->
      <!-- <div class="weui-panel address-panel">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text"
            v-for="item in addressList"
            :key="item.addressId"
            :class="{ disable: item.disable }"
            @click="selectMyAddress(item)">
            <icon type="success_no_circle" color="#10D7C0" size="16" hidden></icon>
            <div class="weui-media-box__title weui-media-box__title_in-text">{{ item.areaInfo }}</div>
            <div class="weui-media-box__desc">
              {{ item.name }}&nbsp;&nbsp;{{ item.mobPhone }}
            </div>
          </div>
        </div>
      </div> -->
      
      <div class="weui-cells__title"></div>
      <div class="weui-panel weui-panel_access address-panel address-panel_compact"> 
        <div class="weui-panel_caption">
          当前定位
        </div>
        <!-- 分割线 -->
        <div class="weui-panel_wire"></div>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text" >
            <img src="/static/images/common_icon_dangqian@2x.png">
            <div class="relocation" @click="relocation">
              <!-- <img src="/static/images/common_icon_refresh.png@2x.png"> -->
              <span style="color:#ccc;">重新定位</span>
            </div>
            <!-- weui-media-box__title_in-text -->
            <div class="weui-media-box__title">
              {{ relocationing ? '定位中...' : location.address +location.name }}
            </div>
            <!-- 定位 -->
            <!-- <div class="weui-media-box__desc">{{ location.address }}{{location.name}}</div> -->
          </div>
        </div>
      </div>
      <div class="weui-cells__title"></div>

<!-- 当前门店 -->

    <div class="weui-cells weui-cells_pure" @click="shouye()">
      <div class="weui-cells_shop">
        当前门店
      </div>
      <div class="weui-cells_xian"></div>
      <div class="weui-cell"   >
        <div  class="weui-cell__bd">
          <div class="head">
            <!-- <image  :src= "storeLid.storeLogoImg"  alt=""></image> -->
          </div>
          <h2 style="font-weight:bold;margin-bottom:20rpx">{{ storeLid.storeName }}</h2>
          <p style="color:#333;">{{storeLid.city+storeLid.area +storeLid.storeAddress }}</p>
          <h3 style="color:#999;">团长：{{ storeLid.franchiseeName }}</h3> 
          <p>{{item}}</p>
          <h4><span>电话：</span>{{  storeLid.franchiseeTel}}</h4>
          <p style="margin-bottom:20rpx">提货时间: 9：00 - 20：00</p>
        </div>
        <!-- <div class="weui-cell__ft"> -->
          <!-- <div class="weui-cell__ft">距离{{  storeLid.storeDistance }}km</div> -->
           <img src="/static/images/arrows.png">
        <!-- </div> -->
    
      </div>
    </div>
 <div class="weui-cells__title"></div>

<!-- 附近门店 -->

    <div class="weui-cells weui-cells_pure" v-if="storeList.length">
      <div class="weui-cells_shop">
        附近门店
      </div>
      <div class="weui-cells_xian"></div>
      <div class="weui-cell" v-for=" item  in storeList" :key="item.storeId" @click="select(item)">
        <div  class="weui-cell__bd">
          <div class="head">
            <image  :src= "item.storeLogoImg"  alt=""></image>
          </div>
          <h2 style="font-weight:bold;margin-bottom:20rpx">{{ item.storeName }}</h2>
          <p style="color:#333;">{{ item.storeAddress }}</p>
          <h3 style="color:#999;">团长：{{ item.shopIsName }}</h3> 
          <p>{{item[0]}}</p>
          <h4><span>电话：</span>{{ item.franchiseeTel }}</h4>
          <p style="margin-bottom:20rpx">提货时间: 9：00 - 20：00</p>
        </div>
        <!-- <div class="weui-cell__ft"> -->
          <div class="weui-cell__ft">距离{{ item.storeDistance }}km</div>
           <img src="/static/images/arrows.png">
        <!-- </div> -->
        <div class="xian"></div>
      </div>
    </div>
    
      <div class="empty-tip" v-else>
        <div class="empty-tip__text">随近没有支持自提的门店</div>
      </div>

    </div>
    
    <!-- <navigator url="/pages/address/form/main" class="footer-bar">
      <button type="primary" :plain="true">
        <img src="/static/images/common_icon_addto.png@2x.png">
        <span>新增收货地址</span>
      </button>

    </navigator> -->
    <!-- 城市选择模态窗 -->
    <select-city-modal v-if="cityModalShowed" @select="cityModalShowHide "></select-city-modal>
    <!-- 搜索结果模态窗 -->
    <div class="search-result-modal" v-if="inputShowed && inputVal">
      <div class="weui-panel weui-panel_access address-panel address-panel_compact">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text"
            v-for="item in recommends"
            :class="{ disable: item.disable }"
            :key="item.id"
            @click="selectRecommend(item)">
            <div class="weui-media-box__title weui-media-box__title_in-text">{{ item.name }}</div>
            <div class="weui-media-box__desc">{{ item.address }}</div>
          </div>
          <empty text="暂无搜索结果" v-if="!searching && !recommends.length"></empty>
          <empty text="正在搜索中..." v-if="searching && !inputShowed"></empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import { AMapWX } from '@/utils/amap-wx'
  import { getFlatternDistance } from '@/utils/'
  import config from '@/config'
  import SelectCityModal from '@/components/SelectCityModal'
  import Empty from '@/components/Empty'
  import { join } from 'path';

  export default {
    components: {
      SelectCityModal,
      Empty
    },

    data () {
      return {
        inputVal: '',
        inputShowed: false,
        addressList: [],
        markers: [],
        relocationing: false,
        recommends: [],
        searching: false,
        checkRegin: [],
        cityModalShowed: false,
        storeList: [],
        storeLid:{},
        cityname:'广州市',
        that:[]
      }
    },

    computed: {
      ...mapState(['storeId', 'storeInfo', 'location'])
    },

    methods: {
      /*
      1.0增加附近门店
      */
    select(item) {
        console.log('0000',item.storeId)
        this.$store.commit('setItem', item.storeId )
        this.$store.commit('setItem', item )
        let storeId = this.$store.state.shopDetail.storeId;
        this.$store.commit('setStoreId', storeId)
        // Api.index.storeGoodsListByshopId({ 
        //   storeId: storeId 
        // })
        // .then(res => {
        //   if (res.code === Api.CODES.SUCCESS) {
        //     console.log("商品信息", res.data.shopStoreGoods);
        //   }
        // })
        
          this.$bus.$emit('shopChange', item)
          wx.navigateBack()
      },
 
     /*
     城市列表
     */ 
     cityModalShowHide(){
       this.cityModalShowed=false
       this.cityname = this.$store.state.cityName
       this.getStoreList()
       this.StoreLid()
     },

      /**
       * @description 显示输入框
       */
      showInput() {
        this.inputShowed = true
      },

      /**
       * @description 隐藏输入框
       */
      hideInput() {
        this.inputShowed = false
        this.clearInput()
      },

      /**
       * @description 监听输入搜索事件
       */
      inputTyping({ mp: { detail } }) {
        this.searching = true
        clearTimeout(this._timer)
        this._timer = setTimeout(() => {
          if (detail.value) {     
            this.amap.getInputtips({ //高德地图获取关键字APi
              keywords: detail.value,
              type: '120201|120302|141400|141200|170100|060101|050101|110101|150500',
              city: '020',
              citylimit: true,
              location: `${ this.location.longitude },${ this.location.latitude }`,
              success: res => {
                wx.hideLoading({})
                let regin = res.tips.map(item => { //过滤所需的关键字
                  if(item.location) {
                    let [lng, lat] = typeof item.location === 'string' ?
                        item.location.split(',') :[] 
                    return {
                      longitude: lng,
                      latitude: lat
                    }
                  }
                }) 
              
                regin = JSON.stringify(regin)
                Api.index.queryByRegin({ regin }).then(res => {
                  if (res.code === Api.CODES.SUCCESS) {
                    res.data.forEach(item => {
                      this.checkRegin.push(item.storeId)
                    });
                  }
                }).then(() => {
                  // console.log(this.checkRegin)
                  this.recommends = res.tips.map((item,index) => {
                    let [lng, lat] = typeof item.location === 'string' ?
                      item.location.split(',') :[] 
                      let checkResult = this.checkRegin[index] ? true : false
                      // console.log('index',checkResult)
                    return {
                      ...item,
                      disable: !checkResult
                    }
                    this.searching = false
                  })
                })
                
                // if (this.storeInfo.storeId) {
                //   this.recommends = res.tips.map((item,index) => {
                //     let [lng, lat] = typeof item.location === 'string' ?
                //       item.location.split(',') :
                //       [] 
                //       console.log('a',this.checkRegin)
                //     return {
                //       ...item,
                //       disable: this.checkRegin[index] || this.storeInfo.scope * 1000 < getFlatternDistance(
                //         this.storeInfo.storeLat,
                //         this.storeInfo.storelng,
                //         +lat,
                //         +lng
                //       )
                //     }
                //   })
                // } else {
                  
                //   this.recommends = res.tips
                // }
                
              },
              fail: () => this.searching = false
            })
          } else {
            this.searching = false
            this.recommends.length = 0
          }
        }, 500)
      },
      
      clearInput() {
        this.inputVal = ''
      },

      getAddressList() {
        Api.address.addressList().then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            if (this.storeInfo.storeId)
            this.addressList = res.data.addressList.map(item => ({
              ...item,
              disable: this.storeInfo.scope * 1000 < getFlatternDistance(
                this.storeInfo.storeLat,
                this.storeInfo.storelng,
                item.locLat,
                item.locLng
              )
            }))
          }
        })
      },

      /**
       * @description 显示选择警告提示
       */
      showUnselectableTip() {
        wx.showModal({
          content: '该地址不在配送范围内',
          showCancel: false
        })
      },


      /**
       * @description 选择我的地址
       */
      selectMyAddress(item) {
        if (item.disable) return this.showUnselectableTip()

        this.$store.commit('setLocationInfo', {
          address: item.areaInfo,
          latitude: item.locLat,
          longitude: item.locLng,
          name: item.areaInfo
        })
        wx.navigateBack()
      },

      /**
       * @description 重新定位
       */
      selectLocation(marker) {
        if (marker.disable) return this.showUnselectableTip()
        this.$store.commit('setLocationInfo', marker)
        wx.navigateBack()
      },

      selectRecommend(item) {
        if (item.disable) return this.showUnselectableTip()

        let [longitude, latitude] = item.location.split(',')

        this.$store.commit('setLocationInfo', {
          name: item.name,
          address: item.address,
          longitude,
          latitude
        })
        this.hideInput()
        
        // wx.navigateBack()
      },

      /**
       * @description 设置门店Id
       */
      _setStoreId({longitude, latitude}) {
        Api.index.isDeliveryScope({
          longitude,
          latitude
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
  
            // @DEBUG:
            // res.data.isInScope = 0
            // 在配送范围内时，自动选择门店，并获取该门店数据
            if (res.data.isInScope === 1) {
              this.$store.commit('setStoreId', res.data.storeId)
              this.$store.commit('setStoreInfo', res.data)
            } 
          } else {
            console.error(res.message)
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },
      relocation() {
        this.relocationing = true
        this.amap.getPoiAround({
          success: res => {
            this.$store.commit('setLocationInfo', res.markers[0])
            console.log('定位',res.markers)
            this.relocationing = false
            // wx.navigateBack()
          },
          fail: e => this.relocationing = false
        })
        // console.log(this.location)
      },
      /**
       * @description 获取开通服务的城市列表
       */
      getServiceCity () {
        Api.index.getServiceCity()
      },

 // 附近门店
      getStoreList() {
          wx.showLoading()
          // console.log(this.location);
          Api.index.storeList({
            latitude: this.location.latitude,
            longitude: this.location.longitude,
            activityId: '',
            city: this.cityname
          })
          .then(res => {
            console.log('8888',res)
            if (res.code === Api.CODES.SUCCESS) {
              this.storeList = res.data.storeList || res.data.cityStore
            }
          })
          .catch(e => console.log(e))
          .then(() => wx.hideLoading())
      },

// 常用门店
        StoreLid() {
          wx.showLoading()
          Api.index.storeLid({
            storeId:this.storeId

          })
          .then(res => {
            console.log('3333333',res)
             if (res.code === Api.CODES.SUCCESS) {
              this.storeLid = res.data.storeLid || res.data.shopStore
            
              console.log('11111',this.storeLid)
            }
            
          })
           .catch(e => console.log(e))
          .then(() => wx.hideLoading())
      },

      chooseLocation() {
        wx.chooseLocation({
          success: res => {
            if (this.storeInfo.storeId) {
              if (this.storeInfo.scope * 1000 < getFlatternDistance(
                this.storeInfo.storeLat,
                this.storeInfo.storelng,
                res.latitude,
                res.longitude
              )) {
                return this.showUnselectableTip()
              }
            } 

            this.$store.commit('setLocationInfo', res)
            wx.navigateBack()
          }
        })
      },

      shouye(){
         wx.switchTab({
        url: "/pages/index/main"
      });
      }

    },

    onLoad (e) {
  // 1.0
  // console.log(this.storeList)
      this.StoreLid()
     this.getStoreList(e)

      this.amap = new AMapWX({ key: config.AMAP_KEY })
      this.amap.getPoiAround({
        location: `${ this.location.longitude },${ this.location.latitude }`,
        success: res => {
          let markers

          // 如果已选择了门店
          if (this.storeInfo.storeId) {
            markers = res.markers.slice(0, 5).map(item => {
              let distance = getFlatternDistance(
                this.storeInfo.storeLat,
                this.storeInfo.storelng,
                item.latitude,
                item.longitude
              )
              return {
                ...item,
                disable: this.storeInfo.scope * 1000 < distance
              }
            })
          } else {
            markers = res.markers.slice(0, 5)
          }

          this.markers = markers
        },
        fail: e => console.log(e)
      })
      this.getAddressList()
    }
  }
</script>

<style>
  page { background-color: #F4F4F4; padding-bottom: 88rpx; }
</style>

<style  lang="scss" scoped>

.weui-cell:nth-child(1){
  background-color: #000;
  
}

  .weui-search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11;
    padding-top: 20rxp;
    padding-bottom: 20rpx;
    background-color: #fff;
    border-top-color: #fff;
    border-bottom-color: #fff;
    &__form {
      border: 0 none;
      background-color: #f3f3f3;
      border-radius: 28rpx;
    }
    &__label {
      background-color: #f3f3f3;
      border-radius: 28rpx;
      text-align: left;
      .weui-icon-search {
        position: absolute;
        left: 28rpx;
        top: 14rpx;
        font-size: 0;
      }
    }
    &__text {
      margin-left: 66rpx;
      vertical-align: top;
    }
    &__input {
      margin-left: 10rpx;
    }
    &__cancel-btn {
      padding-left: 8rpx;
      padding-right: 4rpx;
      font-size: 28rpx;
      color: #000;
    }
  }

  .weui-media-box__title{
    width: 474rpx;
    height: 70rpx;
    padding-top:8rpx;
    line-height: 35rpx;
    text-align: left;
  }
  .weui-icon-search_in-box {
    left: 28rpx;
    top: 14rpx;
  }

  .city-selector {
    font-size: 28rpx;
    position: relative;
    padding: 0 30rpx 0 10rpx;
    line-height: 56rpx;
    &:after {
      content: '';
      display: inline-block;
      margin-left: 8rpx;
      vertical-align: middle;
      width: 0;
      height: 0;
      border-top: 10rpx solid #666;
      border-left: 8rpx solid transparent;
      border-right: 8rpx solid transparent;
    }
  }

  .address-panel {
    .weui-media-box.disable {
      .weui-media-box__title {
        color: #999;
      }
    }
  }

  .address-panels {
    .shop{
      position:absolute;
      bottom:0rpx;
      left:18rpx;
      width: 669rpx;
      height: 1rpx;
      border-bottom:1px solid rgb(243, 243, 243);
      opacity: 0.7;
    }
    

    .address-panel {
      position: relative;
      margin-top: 0;
      height: 185rpx;

      .weui-panel_caption{
          font-size: 24rpx;
          color:#999;
          padding: 23rpx 0rpx 0rpx 26rpx;
      }
      .weui-panel_wire{
        position:absolute;
        width: 703rpx;
        height: 2rpx;
        background-color: rgb(204, 204, 204);
        opacity: 0.5;
        top:70rpx;
        left:24rpx;
      }
    }
    .weui-cells__title {
      // border-bottom:1rpx solid #ccc;
      margin-top: .5em;
      margin-bottom: .5em;
      font-size: 24rpx;
      color: #333;
      
    }
    .weui-panel {
      // text-align: center;
      &:before,
      &:after {
        display: none;
      }
      &__bd{
        text-align: center;
      }
    }
    
    .weui-media-box {
      position: relative;
      padding: 28rpx 0 20rpx 130rpx;
      // padding-bottom: 20rpx;
      &:before {
        left: 0;
      }
      &__title_in-text {
        margin-bottom: 8rpx;
      }
      img{
        position: absolute;
        top: 32rpx;
        left: 33rpx;
        width: 72rpx;
        height: 72rpx;
        vertical-align: middle;
      }
      .weui-media-box__desc{
        font-size:28rpx;
        width: 440rpx;
        height: 67rpx;
      } 
    }

    .relocation {
      position: absolute;
      top: 60rpx;
      margin-top: -25rpx;
      right: 30rpx;
      font-size: 24rpx;
      color: $theme-color;
      img {
        width: 50rpx;
        height: 50rpx;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
  }

  .footer-bar {
    button {
      img {
        margin-right: 10rpx;
        width: 38rpx;
        height: 38rpx;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
  }

  .search-result-modal {
    position: fixed;
    background-color: #F4F4F4;
    top: 92rpx;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;
    overflow: auto;
    .weui-panel {
      margin-top: 20rpx;
      &_bd{
        // text-align: center;
      }
    }
  }


  // 1.0加附近门店样式
  .xian{
    position:absolute;
    width: 703rpx;
    height: 2rpx;
    background-color: rgb(204, 204, 204);
    opacity: 0.4;
    bottom:10rpx;
    left:24rpx;
  }


  .weui-cells {
    position: relative;
    .weui-cells_xian{
          position:absolute;
          width: 703rpx;
          height: 2rpx;
          background-color: rgb(204, 204, 204);
          opacity: 0.4;
          top:70rpx;
          left:24rpx;
    }
    .weui-cells_shop{
        font-size: 24rpx;
        color:#999;
        padding: 23rpx 0rpx 0rpx 26rpx;
        margin-bottom:18rpx;
    }

    &:after {
      display: none;
    }
    &__title {
      line-height: 40rpx;
      img {
        vertical-align: top;
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .weui-cell {
    position: relative;
    padding: 20rpx 67rpx 20rpx 127rpx;
    .head{
        position:absolute;
        top:24rpx;
        left:25rpx;
        width: 80rpx;
        height: 80rpx;
        image{
        width: 80rpx;
        height: 80rpx;
        border-radius: 50rpx;
        }
      }
    &:before {
      display: none;
    }
    &__bd {
      
      h2 {
        font-size: 32rpx;
        color: $text-black;
        width: 360rpx;
        height: 40rpx;
      }
      p {
        font-size: 26rpx;
        color: #333;
        color: $text-gray;
        width: 554rpx;
        margin-top: 10rpx;
        // margin-bottom:20rpx;
      }
      h3{
        font-size: 20rpx;
        color: $text-black;
        width:260rpx;
        height:35rpx;
        font-size:28rpx;
        color: #999;
      }
      h4{
        width:355rpx;
        height:26rpx;
        font-size:28rpx;
        color:#12D5C0;
        margin-bottom:16rpx;
        span{
          color:#999;
          font-size:28rpx;
        }
      }
    }
    &__ft {
      position:absolute;
      top:30rpx;
      right:70rpx;
      margin-left: 10rpx;
      font-size: 26rpx;
      text-align: center;
      color: $text-gray;
      color: #12D5C0;
    }
    img {
      position: absolute;
      top:126rpx;
      right:16rpx;
        vertical-align: middle;
        width: 30rpx;
        height: 30rpx;
        // margin-bottom: 10rpx;
      }
  }

</style>