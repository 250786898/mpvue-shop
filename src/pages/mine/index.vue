<template>
  <div class="container">
    <TopBar />
    <UserInfo :userInfo="personCenter" @resgiterOrLogin="resgiterOrLogin" />
    <div class="mine-main">
      <OrderBar
        @obligation="obligation"
        @toPickUp="toPickUp"
        @pickUp="pickUp"
        @salesReturn="salesReturn"
        @allOrder="allOrder"
      />
      <ServerBar
        @discount="discount"
        @toSettings="toSettings"
        :userInfo="personCenter"
        @applyManager="applyManager"
        :showRecuit="isShowRecruitStore"
      />
    </div>
  </div>
</template>

<script>
import TopBar from "./components/TopBar";
import UserInfo from "./components/UserInfo";
import OrderBar from "./components/OrderBar";
import ServerBar from "./components/ServerBar";
import { mapState } from "vuex";
import UserModer from "@/model/user";
import { Api, ORDER_STATE, ORDER_STATE_TEXT } from "@/http/api";
import { resgiterOrLogin } from "../../utils/index";
import RegimentModel from '@/model/regiment';

const userModel = new UserModer();
const regimentModel = new RegimentModel();
export default {
  components: {
    TopBar,
    UserInfo,
    OrderBar,
    ServerBar
  },
  data() {
    return {
      ORDER_STATE,
      ORDER_STATE_TEXT,
      completedTipShown: false,
      isShowRecruitStore:0 //是否显示招募团长入口
    };
  },
  computed: {
    ...mapState(["sessionId", "personCenter"])
  },

  methods: {
    allOrder() {
      if (!this.sessionId) {
        resgiterOrLogin();
      } else {
        wx.navigateTo({
          url: `/pages/order/index/main`
        });
      }
    },

    obligation() {
      if (!this.sessionId) {
        resgiterOrLogin();
      } else {
        console.log("ORDER_STATE.UNPAID", ORDER_STATE.UNPAID);
        wx.navigateTo({
          url: `/pages/order/index/main?status=${ORDER_STATE.UNPAID}`
        });
      }
    },

    toPickUp() {
      if (!this.sessionId) {
        resgiterOrLogin();
      } else {
        wx.navigateTo({
          url: `/pages/order/index/main?status=${ORDER_STATE.POHYD}`
        });
      }
    },

    pickUp() {
      if (!this.sessionId) {
        resgiterOrLogin();
      } else {
        wx.navigateTo({
          url: `/pages/order/index/main?status=${ORDER_STATE.FINISHED}`
        });
      }
    },

    salesReturn() {
      if (!this.sessionId) {
        resgiterOrLogin();
      } else {
        wx.navigateTo({
          url: `/pages/order/returns/main`
        });
      }
    },

    // 优惠券
    discount() {
      if (this.sessionId) {
        wx.navigateTo({
          url: "/pages/coupon/index/main"
        });
      } else {
        resgiterOrLogin();
      }
    },

    // 申请团长
    applyManager() {
      if (this.sessionId) {
        wx.navigateTo({
          url: "/pages/manager/apply/main"
        });
      } else {
        resgiterOrLogin();
      }
    },

    toSettings() {
      if (this.sessionId) {
        wx.navigateTo({
          url: "/pages/settings/index/main"
        });
      } else {
        resgiterOrLogin();
      }
    },

    /**
     * @description 跳转注册登录组件
     */
    async resgiterOrLogin() {
      console.log("resgiterOrLogin");

      const userInfoIsScope = await userModel.checkUserInfoIsScope(); //获取用户是否已经授权用户信息
      console.log("userInfoIsScope", userInfoIsScope);
      if (userInfoIsScope) {
        //如果用户已经授权直接跳转快捷登录组件页面
        wx.navigateTo({
          url: "/pages/mine/bind/main"
        });
      } else {
        //未授权跳转授权用户信息组件页面
        wx.navigateTo({
          url: "/pages/mine/auth/main"
        });
      }
    },

    toSmessage() {
      if (this.sessionId) {
        wx.navigateTo({
          url: "/pages/mine/info/main"
        });
      } else {
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/mine/auth/main"
            });
          }
        };
      }
    }
  },

  async onShow() {
    if (this.sessionId) {
      if (!this.personCenter.nickname) {
        wx.showLoading({ title: "加载中" });
      }
      Api.user
        .personCenter()
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            console.log("res.data", res.data);
            this.$store.commit("setPersonCenter", res.data);
          }
          wx.hideLoading();
        })
        .catch(e => wx.hideLoading());

      Api.user.profile().then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.completedTipShown = !res.data.birthday;
        }
      });
    }

    this.$store.dispatch("syncCartTabbarBadge");

    const res = await regimentModel.judgeIsApply();
    if(res.code===Api.CODES.SUCCESS ){
    console.log('结果',res);
      this.isShowRecruitStore = res.data.isShowRecruitStore
    }
  }
};
</script>

<style>
page {
  background: #f1f1f1;
}
</style>

<style lang="scss" scoped>
.container {
  .mine-main {
    position: relative;
    top: -54rpx;
    padding: 0 20rpx;
  }
}
</style>
