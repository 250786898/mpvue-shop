<template>
  <div>
    <!-- Swiper -->
    <div class="swiper-wrap">
      <swiper class="swiper" @change="onSwiperChange" autoplay="true">
        <div v-for="item in goodsDetailInfo.goodsBanner" :key="item" @click="previewImage(item)">
          <swiper-item>
           <img :src="item" class="slide-image" mode="aspectFit"/>
         </swiper-item>
        </div>
      </swiper>
      <div class="indicator">
        <span>{{ current + 1 }}/</span>{{ goodsDetailInfo.bannerNum || 0 }}
      </div>
    </div>

    <!-- Type start: 团购商品、限时购、秒杀 -->
    <div class="group-buy-bar" :class="{'group-buy-bar-team': activityInfo.activityType === 30}" v-if="activityInfo.activityType === 10 || activityInfo.activityType === 30">
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="group-buy-bar__ib group-buy-bar__price">
            <span>￥</span>{{ goodsDetailInfo.activityPrice }}
          </div>
          <div class="group-buy-bar__ib">
            <div class="group-buy-bar__price_old">￥{{ goodsDetailInfo.onlinePrice }}</div>
            <div class="group-buy-bar__tag" v-if="activityInfo.activityType === 30">{{activityInfo.groupNum}}人团</div>
          </div>
        </div>
        <div class="group-buy-bar__ft">
          <div class="group-buy-bar__ft-tip">距离结束时间</div>
          <div>
            <countdowner :countdown="countdown"></countdowner>
          </div>
        </div>
      </div>
      <img class="xiangqing_bg" v-if="activityInfo.activityType === 30" src="/static/images/xiangqing_bg.png" alt="">
    </div>

    <!-- Type end; -->

    
    <!-- 商品名 -->
    <div class="weui-cell goods-hd-info">
      <div class="weui-cell__bd">
        <div class="goods-hd-info__title">{{ goodsDetailInfo.goodsName }}</div>
        <div class="goods-hd-info__desc">{{ goodsDetailInfo.goodsSellDesc }}</div>
        <!-- Type start: 限时抢购 -->
        <div class="goods-hd-info__bd goods-hd-info__bd_member-only"
          v-if="activityInfo && activityInfo.activityType == 10">
          <div class="member-only">
            ￥{{ goodsDetailInfo.activityPrice }}
            <span class="activity-tag">限时抢购</span>
          </div>
          <!-- <span class="goods-hd-info__price">￥{{ goodsDetailInfo.onlinePrice }}</span> -->
        </div>
        <!-- Type end; -->

        <!-- Type start: 会员价 -->
        <div class="goods-hd-info__bd goods-hd-info__bd_member-only"
          v-else-if="activityInfo && activityInfo.activityType == 50">
          <div class="member-only">
            ￥{{ goodsDetailInfo.activityPrice }}
            <span class="activity-tag activity-tag_member">会员价</span>
          </div>
          <span class="goods-hd-info__price">￥{{ goodsDetailInfo.onlinePrice }}</span>
        </div>
        <!-- Type end; -->

        <!-- Type start: 积分商品(二期) -->
        <div class="goods-hd-info__bd" v-else-if="activityInfo && activityInfo.activityType == 80">
          <span class="goods-hd-info__price">￥{{ goodsDetailInfo.activityPrice }}</span>
          <span class="goods-hd-info__bp">+{{ goodsDetailInfo.points }}</span>
          <img src="/static/images/details_icon_integral@2x.png" class="goods-hd-info__bp-icon">
        </div>
        <!-- Type end; -->
        <div class="goods-hd-info__bd goods-hd-info__bd_member-only"
          v-else-if="activityInfo && activityInfo.activityType == 30">
        </div>
        <!-- Type start: 常规商品 -->
        <div class="goods-hd-info__bd" v-else>
          <span class="goods-hd-info__price">￥{{ goodsDetailInfo.onlinePrice }}</span>
          <span class="goods-hd-info__price-old" v-if="goodsDetailInfo.onlineScribingPrice">
            ￥{{ goodsDetailInfo.onlineScribingPrice }}
          </span>
        </div>
        <!-- Type end; -->
      </div>
      <div class="weui-cell__ft">
        <button open-type="share">
          <img src="/static/images/share.png">
          <div>分享</div>
        </button>
      </div>
    </div>

    <!-- Type start: 团购商品（二期） -->

    <!-- Type start: 自提 -->
    <div class="flashsale" v-if="activityInfo.bespeakStartTime">
      <div class="weui-cells">
        <div class="weui-cell" v-if="activityInfo.bespeakStartTime && activityInfo.bespeakEndTime && activityInfo.bespeakStartTime == activityInfo.bespeakEndTime">
          <img src="/static/images/details_icon_clock@2x.png">
          <span class="take-goods-time">提货时间:</span><span class="take-goods-time-color">{{activityInfo.bespeakStartTime}}</span>
        </div>
        <div class="weui-cell" v-else>
          <img src="/static/images/details_icon_clock@2x.png">
          <span class="take-goods-time">提货时间:</span><span class="take-goods-time-color">{{activityInfo.bespeakStartTime}} ~ {{activityInfo.bespeakEndTime}}</span>
        </div>
      </div>
    </div>
    <!-- Type end; -->
    
    <!-- 这里最多只显示两条数据 -->
    <div class="group-member-list" v-if="activityInfo.activityType == 30 && groupList.length">
      <div class="weui-cells__title">
        <span v-if="activityInfo.groupNum == 1">{{activityInfo.nowGroupNum}}已拼团成功</span>
        <span v-else>{{activityInfo.nowGroupNum}}人在拼单,可直接参与</span>
        <div  v-if="activityInfo.groupNum > 1" class="weui-cell__ft_in-access" @click="groupDialogShowed = true">查看更多</div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <swiper :autoplay="activityInfo.nowGroupNum%2 == 0" :circular="true" :vertical="true" :style="{height: groupList[0].length == 2 ? '244rpx' : '122rpx'}">
          <div v-for="(item, index) in groupList" :key="index">
            <swiper-item>
              <div class="weui-cell group-member-item" v-for="(item1, itemIndex) in item" :key="itemIndex" @touchmove.prevent.stop>
                <div class="weui-cell__hd">
                  <img :src="item1.headImgsUrl"/>
                </div>
                <div class="weui-cell__bd">{{item1.nickName}}</div>
                <div class="weui-cell__ft">
                  <div class="group-member-item__wait">
                    <template v-if="item1.updateTime && activityInfo.groupNum == 1">
                      <span class="assemble-text">拼团成功</span>
                    </template>
                    <template v-else>
                      还差<span>{{item1.diffNum}}人</span>拼成
                    </template>
                  </div>
                  <div class="group-member-item__cd list-time">
                    <template v-if="item1.updateTime && activityInfo.groupNum == 1">
                      {{item1.updateTime}}
                    </template>
                    <template v-if="activityInfo.groupNum > 1">
                      <span>剩余</span><countdowner :countdown="item1.times"></countdowner>
                    </template>
                  </div>
                </div>
                <div class="weui-cell__ft" v-if="item1.updateTime && activityInfo.groupNum > 1">
                  <button type="primary" style="font-size:13px;" class="bg-orange radius" @click="goTeam(item1.groupOrderId)">去拼单</button>
                </div>
              </div>
            </swiper-item>
          </div>
        </swiper>
      </div>
    </div>
    <!-- Type end; -->

    <!-- Type start: 买赠（二期） -->
    <div class="present" v-if="activityInfo && activityInfo.activityType == 20">
      <div class="weui-cells">
        <div class="weui-cell">
          <span class="present__tag">{{activityInfo.activityName}}</span>
          {{activityInfo.activityTitle}}
        </div>
      </div>
    </div>
    <!-- Type end; -->

    <!-- 商品推荐 -->
    <div class="goods-recommend" v-if="commendGoodsList.length">
      <div class="goods-recommend__title" v-if="activityInfo.groupNum">大家都在拼</div>
      <div class="goods-recommend__title" v-else>商品推荐</div>
      <div>
        <template v-if="activityInfo.activityType == 30">
          <assemble-goods-rows :goods="assembleCommendGoodsList" :goodsId="activityInfo.activityGoodsId"></assemble-goods-rows>
        </template>
        <template v-else>
           <goods-rows :goods="commendGoodsList"></goods-rows>
        </template>
        
       
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="goods-detail">
      <div class="goods-detail__title">商品详情</div>
      <!-- <div class="weui-form-preview">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">产地</label>
            <span class="weui-form-preview__value">广州棠安路</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">储存方式</label>
            <span class="weui-form-preview__value">冷藏</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">规格</label>
            <span class="weui-form-preview__value">450g</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">保质期</label>
            <span class="weui-form-preview__value">35天</span>
          </div>
        </div>
      </div> -->
      <rich-text :nodes="goodsDetailInfo.mobileBody"></rich-text>
    </div>


    <!-- 底部栏 -->
    <!-- Type start: 积分商品 -->
    <div style="height: 200rpx;"></div>
    <div class="footer-bar bp-footer-bar" >
      <navigator open-type="switchTab" url="/pages/cart/main" class="cart-icon">
        <img src="/static/images/common_tab_icon_shopcart_n@2x.png">
        <span class="weui-badge">{{ cartNum }}</span>
      </navigator>
      <button type="primary" class="radius bg-gradient" @click="confirmAdd">加入购物车</button>
    </div>
    <!-- Type end; -->

    <!-- Type start: 团购商品 -->
    <!-- TODO: 加动画 -->
    <div style="height: 200rpx;"></div>
    <div class="footer-bar group-footer-bar" v-if="activityInfo.activityType === 30">
      <!-- <div class="weui-cell" v-if="groupList.length">
        <div class="weui-cell__hd">
          <img :src="groupList1[0].headImgsUrl"/>
        </div>
        <div class="weui-cell__bd list-time1">剩余<countdowner :countdown="groupList1[0].times"></countdowner>,还差{{groupList1[0].diffNum}}人拼团</div>
        <div class="weui-cell__ft">
          <button type="primary" class="bg-orange radius" @click="goTeam(groupList1[0].groupOrderId)">去拼单</button>
        </div>
      </div> -->
      <div class="weui-flex" v-if="groupOrderId">
        <div class="weui-flex__item">
          <button type="primary" hover-class="none" class="radius bg-gradient" @click="goTeam(groupOrderId)">￥{{goodsDetailInfo.activityPrice}}一键参团</button>
        </div>
      </div>
      <template v-else>
        <div class="weui-flex" v-if="activityInfo.groupNum > 1">
          <div class="weui-flex__item">
            <button type="primary"  hover-class="none" class="radius bg-gradient" @click="goTeam('two')">￥{{goodsDetailInfo.onlinePrice}}单独购买</button>
          </div>
          <div class="weui-flex__item">
            <button type="primary"  hover-class="none" class="radius bg-gradient_orange" @click="goTeam('one')">￥{{goodsDetailInfo.activityPrice}}发起拼团</button>
          </div>
        </div>
        <div class="weui-flex" v-else>
          <!-- <div class="weui-flex__item">
            <button type="primary" class="radius bg-gradient" @click="goTeam('two')">￥{{goodsDetailInfo.onlinePrice}}单独购买</button>
          </div> -->
          <div class="weui-flex__item">
            <button type="primary" hover-class="none" class="radius bg-gradient" @click="goTeam('one')">￥{{goodsDetailInfo.activityPrice}}一键拼团</button>
          </div>
        </div>
      </template>  
      </div>
     
    <!-- Type end; -->

    <!-- 返回顶部 -->
    <img src="/static/images/details_btn_top@2x.png" v-if="backToTopButtonShowed" class="returntop" @click="returnTop">

    <!-- 拼团列表弹窗（二期） -->
    <!-- TODO: 加动画 -->
    <div v-if="groupDialogShowed">
      <div class="backdrop" @click="groupDialogShowed = false"></div>
      <div class="group-dialog">
        <div class="group-dialog__hd">
          正在拼单
          <icon type="cancel" color="#333333" size="22" @click="groupDialogShowed = false"></icon>
        </div>
        <div class="group-dialog__bd">
          <div class="weui-cells">
            <div class="weui-cell" v-for="item in groupList1" :key="item">
              <div class="weui-cell__hd">
                <img :src="item.headImgsUrl"/>
              </div>
              <div class="weui-cell__bd">
                <div>还差{{item.diffNum}}人</div>
                <div class="list-time1"><span class="shengyu">剩余</span><countdowner :countdown="item.times"></countdowner></div>
              </div>
              <div class="weui-cell__ft">
                <button type="primary" class="bg-orange" @click="goTeam(item.groupOrderId)">去拼团</button>
              </div>
            </div>
          </div>
        </div>
        <div class="group-dialog__ft">仅显示10个正在拼团的人</div>
      </div>
    </div>
    <!-- 数量修改弹窗 -->
    <div v-if="countModifyDialogShowed">
      <div class="backdrop" @click="cancelAdd"></div>
      <div class="count-modify-dialog">
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="goodsDetailInfo.goodsImage" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">{{ goodsDetailInfo.goodsName }}</div>
            <div class="weui-media-box__desc">
              <template v-if="goodsDetailInfo.activityType == 80">
                <span class="goods-price">￥{{ goodsDetailInfo.activityPrice }}</span>
                <span class="goods-price" style="color:#333">+{{ goodsDetailInfo.points }}</span>
                <img src="/static/images/details_icon_integral@2x.png" class="goods-hd-info__bp-icon">
              </template>
              <template v-else>
                <span class="goods-price" v-if="groupOrderId == 'two'">￥{{ goodsDetailInfo.onlinePrice }}</span>
                <span class="goods-price" v-else>￥{{ groupOrderId ? goodsDetailInfo.activityPrice : goodsDetailInfo.onlinePrice }}</span>
              </template>
              <div class="goods-count">
                <!-- activityInfo.maxNum -->
                <counter v-model="currentGoodsCartNum" :noSetMax="isNoHasMaxValue" :max="activityInfo.maxNum"></counter>
              </div>
            </div>
          </div>
        </div>
        <button type="primary" class="bg-gradient"  hover-class="none" @click="confirmAdd">确 定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import { mapState } from 'vuex'
  import { serialize } from '@/utils/'
  import AssembleGoodsRows from '@/components/AssembleGoodsRows'
  import GoodsRows from '@/components/GoodsRows'
  import Countdowner from '@/components/Countdowner'
  import Counter from '@/components/Counter'

  export default {
    components: {
      AssembleGoodsRows,
      GoodsRows,
      Countdowner,
      Counter
    },

    data() {
      return {
        current: 0,
        groupDialogShowed: false,
        countModifyDialogShowed: false,
        backToTopButtonShowed: false,

        activityInfo: {}, // 活动信息
        goodsDetailInfo: {},
        commendGoodsList: [],
        assembleCommendGoodsList: [], //拼团推荐商品，
        currentGoodsCartNum: 1,
        countdown: 0,
        groupList: [],
        timer: null,
        timer1: null,
        groupList1: [],
        groupOrderId: '',
        // storeId: ''
      }
    },

    onLoad(e) {
      //获取拼团id
      this.groupOrderId = this.$mp.page.options.groupOrderId
      //  this.storeId = this.$mp.page.options.storeId
      // this.page.activityId = e.id
      // this.page.storeId = e.storeId || this.storeId
      // this.page.groupOrderId = e.groupOrderId   
    },

    computed: {
      ...mapState(['storeId', 'cartNum']),
       isNoHasMaxValue () {
        return this.groupOrderId == 'two'? true : false
      }
    },

    methods: {
      /**
       * @description 切换swiper
       */
      onSwiperChange(e) {
        this.current = e.target.current
      },

      /**
       * @description 回到顶部
       */
      returnTop() {
        if (wx.pageScrollTo) {
          wx.pageScrollTo({ scrollTop: 0 })
        }
      },

      /**
       * @description 放大全屏预览图片
       */
      previewImage(current) {
        wx.previewImage({
          urls: this.goodsDetailInfo.goodsBanner,
          current
        })
      },

      /**
       * @description 添加到购物车
       */
      addToCart() {
        if (this.goodsDetailInfo.goodsId) {
          this.countModifyDialogShowed = true
        } else {
          //
        }
      },

      /**
       * @description 确认添加
       */
      confirmAdd() {
        // if(this.groupOrderId == 'two') {
          // 单独购买
          // this.confirmAddTeam1()
          // return false
        // }
        if(this.groupOrderId){
          // 拼团活动
          this.confirmAddTeam()
          return false
        }
        this.$store.dispatch('addToCart', {
          goodsId: this.goodsDetailInfo.goodsId,
          count: this.currentGoodsCartNum
        })
        .then(res => {
          this.currentGoodsCartNum = 1
          this.countModifyDialogShowed = false
        })
      },
      
      /**
       * @description 确定添加到拼团
       */
      confirmAddTeam1() {
        this.$store.dispatch('addOneToCart', {
          goodsId: this.goodsDetailInfo.goodsId,
          count: this.currentGoodsCartNum
        })
        .then(res => {
          this.cancelAdd()
        })
      },

      /**
       * @description 获取营销活动相关商品数据
       */
       getAssemblecommendGoodsListData() {
        wx.showLoading({ mask: true, title: '加载中' })
        Api.activity.activityGoodsList({
          activityId:this.$mp.page.options.activityId,
          pageNumber:1,
          storeId:this.storeId,
        }).then(res => {
          if(res.code === Api.CODES.SUCCESS) {
            this.assembleCommendGoodsList = res.data.goodList
          }
          wx.hideLoading()
        }).catch(() => {
          wx.hideLoading()
        })
      },

    /**
     * @description 确定添加到拼团 one:单独购买 two：多人拼团
     */
     confirmAddTeam() {

       var checkGroupOrderId = (this.groupOrderId == 'one' || this.groupOrderId == 'two' )
        let data = {
          goodsId: this.goodsDetailInfo.goodsId,
          count: this.currentGoodsCartNum,
          activityId: this.groupOrderId == 'two' ? '' : this.activityInfo.activityId,
          activityType: this.groupOrderId == 'two' ? '' : this.activityInfo.activityType,
          groupOrderId: checkGroupOrderId ? '' : this.groupOrderId,
          activityGoodsId: this.groupOrderId == 'two' ? '' : this.activityInfo.activityGoodsId,
          activityGoodsIdOftimes: this.activityInfo.activityGoodsId,
          groupPartner: this.activityInfo.groupNum,
          deliveryType: this.goodsDetailInfo.deliveryStatus == 2 ? 1 : 2,
          deliveryStatus: this.activityInfo.deliveryStatus
        }

        wx.setStorageSync('teamOrder', data) //保存拼团订单信息到缓存
        wx.navigateTo({
          url: `/pages/order/preview/main?cartIds=0`
        })
        this.cancelAdd() //取消添加，关闭添加弹窗
        // this.$store.dispatch('addToActivity', {
        //   goodsId: this.goodsDetailInfo.goodsId,
        //   count: this.currentGoodsCartNum,
        //   activityId: this.activityInfo.activityId,
        //   activityType: this.activityInfo.activityType,
        //   groupOrderId: this.groupOrderId == 'one' ? '' : this.groupOrderId,
        //   activityGoodsId: this.activityInfo.activityGoodsId,
        //   groupPartner: this.activityInfo.groupNum,
        //   deliveryType: 1
        // })
        // .then(res => {
        //   this.cancelAdd()
        // })
      },

      /**
       * @description 检查库存是否为0 0则不能继续操作
       */
      inventoryInspection (groupOrderId) {
        console.log('groupOrderId)',groupOrderId)
        if(this.activityInfo.maxNum == 0 && groupOrderId != 'two'){
          wx.showModal({
            title: '温馨提示',
            content: '购买数量超出每日限购',
            showCancel: false,
            success: (res) => {
              if(res.confirm) { }
            }
          })
          return false
        }
        return true
      },

      /**
       * @description 去拼团
       */
      goTeam(groupOrderId) {
        if(this.inventoryInspection(groupOrderId)){
          //检查库存是否为0 0则不能继续操作
          this.countModifyDialogShowed = true  //数量修改弹窗显示
          this.groupOrderId = groupOrderId    //团购Id保存
        } 
        
      },
      
      //取消添加，关闭添加弹窗
      cancelAdd() {
        this.currentGoodsCartNum = 1
        this.groupOrderId = ''
        this.countModifyDialogShowed = false
      },

      /**
       * @description 获取详情页面具体的数据
       */
      getDetail() {
        let options = this.$mp.page.options //获取商品相关参数
        console.log('options',options)
        if (!options.id) {
          return wx.showToast({
            title: '参数错误',
            icon: 'none'
          })
        }

        wx.showLoading()
        let params = {
          goodsId: options.id,
          storeId: this.storeId || '162'
        }

        if (options.activityId) {
          params.activityId = options.activityId
          params.activityGoodsId = options.activityGoodsId
        }

        Api.goods.goodsDetail(params)
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.goodsDetailInfo = res.data.goodsDetailInfo
            this.commendGoodsList = res.data.commendGoodsList
            if(Array.isArray(res.data.groupList) && res.data.groupList.length) {
              let arr = []
              let length = res.data.groupList.length

              res.data.groupList.forEach((item,index) => {
                arr.push(item)
                if(index % 2) {
                  this.groupList.push(arr)
                  arr = []
                }

                if(length % 2 && index == length-1) {
                  this.groupList.push(arr)
                }
                index < 10 && this.groupList1.push(item)
              })
            }
            this.groupList[0] && this.groupList[0].length && this.startListCountdown()
            // this.groupList1.length && this.startListCountdown1()

            if (res.data.activityInfo) {
              console.log('res.data.activityInfo',res.data.activityInfo)
              this.activityInfo = res.data.activityInfo
              console.log('res.data.activityInfo',this.activityInfo)
              // 有倒计时时
              if (this.activityInfo.times) {
                this.startCountdown(this.activityInfo.times)
              }
            }
          } else {
            wx.showModal({
              title: '温馨提示',
              content: res.message,
              showCancel: false,
              success: () => {
                wx.navigateBack()
              }
            })
          }
        })
        .catch(e => console.log(e))
        .then(e => wx.hideLoading())
      },

        /**
       * @description 拼团活动列表开始倒计时
       */
      startListCountdown() {
        clearInterval(this.timer)
        this.handleListTime()
        this.timer = setInterval(() => {
          this.handleListTime()
        }, 1000)
      },

      /**
       * @description 过滤拼团列表时间不满足的数据
       */
      handleListTime() {
        this.groupList = this.groupList.map(item => {
          let newItem = item.map(item1 => {
            item1.times && item1.times--
            return item1
          })
          return newItem
        })
      },

      /**
       * @description 拼团活动列表开始倒计时
       */
      startListCountdown1() {
        clearInterval(this.timer1)
        this.handleListTime1()
        this.timer1 = setInterval(() => {
          this.handleListTime1()
        }, 1000)
      },

      /**
       * @description 过滤拼团列表时间不满足的数据
       */
      handleListTime1() {
        this.groupList1 = this.groupList1.map(item => {
          item.times && item.times--
          return item
        })
      },

      /**
       * @description 拼团活动列表开始倒计时
       */
      startCountdown(countdown) {
        clearInterval(this.countdownTimer)
        this.countdown = countdown
        this.countdownTimer = setInterval(() => {
          this.countdown--
          if (this.countdown === 0) {
            clearInterval(this.countdownTimer)
            this.getDetail()
          }
        }, 1000)
      }
    },
    /*
     * @description 页面分享
     */
    onShareAppMessage() {
      return {
        title: this.goodsDetailInfo.goodsName,
        path: `/pages/index/main?r=${ encodeURIComponent(serialize(this.$mp.page)) }`,
        imageUrl: this.goodsDetailInfo.goodsImage
      }
    },

    onShow () {
      this.activityInfo = {}
      this.goodsDetailInfo = {}
      this.commendGoodsList = []
      this.groupList1 = []
      this.groupList = []
      this.getDetail()
      // this.getAssemblecommendGoodsListData()
    },

    onHide() {
      clearInterval(this.countdownTimer)
      clearInterval(this.timer1)
      clearInterval(this.timer)
    },

    onPageScroll(e) {
      this.backToTopButtonShowed = e.scrollTop >= 200
    }
  }
</script>

<style>
  page {
    background-color: #F8F8F8;
  }
</style>

<style scoped lang="scss">
  .swiper-wrap {
    position: relative;
    background-color: #fff;
    .indicator {
      position: absolute;
      bottom: 20rpx;
      right: 30rpx;
      line-height: 32rpx;
      width: 70rpx;
      text-align: center;
      border: 1rpx solid #7A7A7A;
      border-radius: 17rpx;
      font-size: 24rpx;
      color: $text-gray;
      span {
        color: $text-black;
      }
    }
  }
  .swiper {
    height: 750rpx;
    swiper-item {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .goods-hd-info {
    padding-top: 30rpx;
    padding-bottom: 10rpx;
    background-color: #fff;
    align-items: flex-start;
    &:before {
      left: 0;
      border-color: #EAEAEA;
    }
    &__title {
      font-weight:bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display:  -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 32rpx;
      color: $text-black;
      line-height: 40rpx;
      margin-bottom: 10rpx;
    }
    &__desc {
      font-size: 24rpx;
    }
    &__price {
      font-weight:bold;
      color: $text-red;
      font-size: 46rpx;
      &-old {
        padding-left: 10rpx;
        font-size: 24rpx;
        color: $text-gray;
        text-decoration: line-through;
      }
    }
    &__bp {
      color: $text-black;
      font-size: 46rpx;
      &-icon {
        vertical-align: -4rpx;
        margin-left: 10rpx;
        width: 52rpx;
        height: 50rpx;
      }
    }

    .weui-cell__bd {
      padding-right: 80rpx;
    }
    .weui-cell__ft {
      button {
        &:after {
          border: 0 none;
        }
        padding-left: 6rpx;
        padding-right: 6rpx;
        background-color: transparent;
        border: 0 none;
        font-size: 24rpx;
        color: $text-gray;
        line-height: 40rpx;
        img {
          margin-top: 10rpx;
          width: 46rpx;
          height: 46rpx;
        }
      }
    }
  }
  .goods-detail {
    background-color: #fff;
    margin-top: 20rpx;
    padding: 0 30rpx;
    &__title {
      padding-top: 24rpx;
      padding-bottom: 24rpx;
      text-align: center;
      font-size: 28rpx;
      color: $text-black;
      &:before,
      &:after {
        content: '';
        display: inline-block;
        margin: 0 20rpx;
        width: 10rpx;
        height: 10rpx;
        border-radius: 6rpx;
        background-color: $text-black;
        vertical-align: 4rpx;
      }
    }
    .weui-form-preview {
      &:before,
      &:after {
        display: none;
      }
      &__bd {
        padding-top: 0;
        padding-bottom: 30rpx;
      }
      &__item {
        padding-top: 14rpx;
        padding-bottom: 14rpx;
        border-bottom: 1rpx dashed rgba(153, 153, 153, .6);
        &:last-child {
          border-bottom: 0;
        }
      }
      &__label {
        font-size: 24rpx;
        text-align: left;
        text-align-last: left;
        color: $text-gray;
        margin-right: 2em;
      }
      &__value {
        text-align: left;
        font-size: 24rpx;
        color: $text-black;
      }
    }
    > img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .goods-recommend {
    margin-top: 20rpx;
    background-color: #fff;
    padding: 20rpx 0;
    &__title {
      padding: 0 30rpx;
      margin-bottom: 10rpx;
      font-size: 30rpx;
      color: $text-black;
    }
    /deep/ .goods-item {
      &:first-child { padding-left: 30rpx; }
      &:last-child { padding-right: 30rpx; }
    }
  }

  .footer-bar.bp-footer-bar {
    padding: 10rpx 30rpx;
    background-color: #fff;
    text-align: right;
    .cart-icon {
      position: absolute;
      left: 62rpx;
      top: 50%;
      margin-top: -32rpx;
      img {
        width: 64rpx;
        height: 64rpx;
      }
      .weui-badge {
        position: absolute;
        right: -16rpx;
        top: 0;
      }
    }
    button {
      display: inline-block;
      vertical-align: middle;
      width: 420rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
    }
  }

  .returntop {
    position: fixed;
    right: 30rpx;
    bottom: 160rpx;
    width: 84rpx;
    height: 84rpx;
  }

  .group-buy-bar {
    padding-left: 30rpx;
    background-color: #FF1414;
    &__ib {
      display: inline-block;
      // vertical-align: middle;
      color: #FFF;
    }
    &__price {
      font-size: 72rpx;
      line-height: 92rpx;
      span {
        vertical-align: middle;
        font-size: 40rpx;
      }
      &_old {
        margin-left: 10rpx;
        color: #FFF;
        font-size: 22rpx;
        text-decoration: line-through;
      }
    }
    &__tag {
      margin-left: 10rpx;
      padding: 0 10rpx;
      border-radius: 4rpx;
      background-color: #fff;
      min-width: 60rpx;
      text-align: center;
      font-size: 22rpx;
      line-height: 30rpx;
      color: #FF1414;
    }
    &__ft {
      position: relative;
      padding: 0 50rpx 0 40rpx;
      background-color: #FFEB4B;
      &:before {
        content: '';
        position: absolute;
        left: -30rpx;
        top: 0;
        bottom: 0;
        width: 0;
        border-top: 50rpx solid transparent;
        border-bottom: 50rpx solid transparent;
        border-right: 30rpx solid #FFEB4B;
      }
      &-tip {
        text-align: center;
        font-size: 22rpx;
        color: #FF1414;
        line-height: 40rpx;
      }
      /deep/ .countdowner {
        span {
          line-height: 50rpx;
          height: 50rpx;
          &.num {
            width: 38rpx;
          }
        }
      }
    }
  }

  .group-buy-bar-team{
    background: none;
    position: relative;
    .group-buy-bar__tag {
      background: #CFFFFB;
      color: #FF1414;
    }
    .group-buy-bar__ft {
      background: none;
      &:after{
          display: none;
      }
      &:before{
          display: none;
      }
      .group-buy-bar__ft-tip {
        color: #00D1AF;
      }
      /deep/ .countdowner {
        span {
          &.num {
            background: #00D1AF;
          }
        }
      }
    }
    .xiangqing_bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      height: 50px;
      width: 100%;
    }
  }

  .group-member-list {
    .weui-cells {
      &:before {
        border-color: #DEDEDE;
      }
      &:after {
        display: none;
      }
      .weui-cell {
        &:before {
          display: none;
        }
      }
      &__title {
        margin-bottom: 0;
        background-color: #fff;
        font-size: 28rpx;
        color: #000;
        line-height: 80rpx;
        .weui-cell__ft_in-access {
          float: right;
          font-size: 24rpx;
          color: $text-gray;
          &:after {
            border-color: $text-gray;
          }
        }
      }
    }
    .weui-cell {
      &:before {
        border-color: #DEDEDE;
        left: 0;
      }
      &__hd {
        img {
          margin-right: 20rpx;
          width: 90rpx;
          height: 90rpx;
          border-radius: 45rpx;
          vertical-align: middle;
        }
      }
      &__bd {
        font-size: 28rpx;
      }
    }
  }

  .group-member-item {
    padding-top: 16rpx;
    padding-bottom: 16rpx;
    border-bottom: 1px solid #DEDEDE;
    &:nth-child(2n){
      border-bottom: none;
    }
    &__wait {
      color: #000;
      font-size: 26rpx;
      span {
        color: $text-red;
      }
    }
    &__cd {
      font-size: 22rpx;
      color: #666;
    }
    button {
      margin-left: 20rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      line-height: 60rpx;
      border-radius: 30rpx;
    }
  }

  .group-footer-bar {
    .weui-cell {
      padding-top: 14rpx;
      padding-bottom: 14rpx;
      background-color: #FFCB88;
      &__hd {
        img {
          margin-right: 26rpx;
          width: 60rpx;
          height: 60rpx;
          border-radius: 30rpx;
          vertical-align: middle;
        }
      }
      &__bd {
        font-size: 30rpx;
        span {
          color: $text-red;
        }
      }
      button {
        line-height: 60rpx;
        border-radius: 30rpx;
      }
    }
    .bg-gradient_orange {
      background-image: -webkit-linear-gradient(left, #FF9E03, #FFC003);
      background-image: linear-gradient(left, #FF9E03, #FFC003);
    }
  }

  .group-dialog {
    position: fixed;
    z-index: 11;
    bottom: 0;
    left: 0rpx;
    right: 0rpx;
    background-color: #fff;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
    &__hd {
      position: relative;
      line-height: 80rpx;
      text-align: center;
      font-size: 32rpx;
      border-bottom: 1rpx solid #DEDEDE;
      icon {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
      }
    }
    &__bd {
      height: 660rpx;
      padding-top: 20rpx;
      padding-bottom: 20rpx;
      overflow-y: auto;
    }
    &__ft {
      padding: 20rpx 30rpx;
      text-align: center;
      font-size: 32rpx;
    }
    .weui-cells {
      margin-top: 0;
      &:before,
      &:after { display: none; }
    }
    .weui-cell {
      padding: 18rpx 18rpx;
      &:before { display: none; }
      &__hd {
        img {
          border-radius: 40rpx;
          margin-right: 20rpx;
          width: 80rpx;
          height: 80rpx;
          vertical-align: middle;
        }
      }
      &__bd {
        font-size: 26rpx;
        line-height: 40rpx;
      }
      button {
        line-height: 50rpx;
        border-radius: 25rpx;
        font-size: 26rpx;
      }
    }
  }

  .count-modify-dialog {
    position: fixed;
    z-index: 11;
    left: 0;
    right: 0;
    bottom: 0;
    .weui-media-box {
      background-color: #fff;
      &:before {
        display: none;
      }

      &__hd {
        width: 160rpx;
        height: 160rpx;
      }
      &__title {
        margin-bottom: 20rpx;
        font-size: 28rpx;
        color: $text-black;
        white-space: normal;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
      &__desc {
        position: relative;
        line-height: 50rpx;
      }

      .goods-price {
        line-height: 50rpx;
        font-size: 28rpx;
        font-weight: 700;
        color: $text-red;
      }

      .goods-count {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 50rpx;
        &__form {
          span {
            vertical-align: middle;
            padding-left: 20rpx;
            padding-right: 20rpx;
            font-size: 28rpx;
            color: $text-black;
          }
          img {
            vertical-align: middle;
            width: 50rpx;
            height: 50rpx;
          }
        }
      }
    }
    button {
      border-radius: 0;
    }
  }

  .present {
    .weui-cells {
      &:before,
      &:after {
        display: none;
      }
      margin-top: 20rpx;
      font-size: 28rpx;
      color: $text-black;
    }
    &__tag {
      margin-right: 16rpx;
      color: $text-red;
      border: 1rpx solid $text-red;
      font-size: 24rpx;
      border-radius: 4rpx;
      padding-left: 12rpx;
      padding-right: 12rpx;
    }
  }

  .flashsale {
    .weui-cells {
      &:before,
      &:after {
        display: none;
      }
      margin-top: 20rpx;
      font-size: 24rpx;
      color: $text-black;
    }
    img {
      margin-right: 12rpx;
      vertical-align: middle;
      width: 24rpx;
      height: 24rpx;
    }
  }

  .member-only {
    font-size: 46rpx;
    color: #FFA442;
    margin-bottom: -12rpx;
    font-weight: 700;
    display:flex;
    align-items:center;

    .activity-tag {
      vertical-align: middle;
    }
  }

  .goods-hd-info__bd_member-only {
    .goods-hd-info__price {
      font-weight:bold;
      font-size: 34rpx;
      padding-left: 6rpx;
    }
  }
  .group-member-team{
     span{
       &.num{
         background: none;
       }
     }
  }
  .list-time {
    display:flex;
    align-items:center; 
    /deep/ .countdowner {
      span {
        background: none;
        color: #666666;
        font-size: 11px;
        &.num {

        }
      }
    }
  }
  .list-time1 {
    .shengyu{
      vertical-align: middle;
      font-size:15px;
    }
    /deep/ .countdowner {
      span {
        background: none;
        color: #000;
        font-size: 15px;
        &.num {
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }
  .take-goods-time {
    font-size: 14px;
    &-color{
      color: #F7B032;
      font-size: 14px;
    }
  }
  .assemble-text{
    color: #00d7cc;
  }
</style>
