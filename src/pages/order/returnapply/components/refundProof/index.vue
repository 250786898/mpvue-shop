<template>
  <div class="proof">
    <div class="proof-item">
      <span class="proof-item__label">退货/退款原因</span>
      <div class="proof-item-option">
        <!-- <span>请选择</span> -->
        <picker
          @change="onReasonChange"
          :value="reason"
          :range="reasonArray"
          range-key="reasonInfo"
        >
          <view v-if="reason">{{ reasonArray[reason] && reasonArray[reason].reasonInfo }}</view>
          <view class="proof-item-option__arrow" v-else>
            请选择
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/cate-downward-icon.png" alt />
          </view>
        </picker>
      </div>
    </div>
    <div class="proof-item">
      <span class="proof-item__label">退货说明</span>
      <!-- <span class="proof-item__text">说明</span> -->
    </div>
    <div class="proof-item proof-upload">
      <span class="proof-item__label">上传凭证</span>
      <div class="proof-item__upload">
        <image-uploader v-model="image" :max="3" />
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "@/http/api";
import ImageUploader from "@/components/ImageUploader";

export default {
  components: {
    ImageUploader
  },
  data() {
    return {
      reasonArray: [], //原因列表
      reason: "", //原因
      image: "" //上传图片列表
    };
  },
  methods: {
    /**
     * @description 获取原因列表
     */
    async getReasonList() {
      let data = await Api.refund.reason();
      this.reasonArray = data.data;
    },

    /**
     * @description 更换原因
     */
    onReasonChange(e) {
      this.reason = e.mp.detail.value;
    },

    /**
     * @description 获取所需数据
     */
    getInfo() {
      this.$emit("getProof", {
        refundReason: this.reasonArray[this.reason].id,
        goodsImageMore: this.image
      });
    }
  },
  watch: {
    reason: function() {
      this.getInfo();
    },
    image: function() {
      this.getInfo();
    }
  },
  onLoad(e) {
    this.getReasonList();
  }
};
</script>

<style lang="scss" scoped>
.proof {
  width: 710rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  background: #fff;
  border-radius: 10rpx;
  &-item {
    padding: 34rpx 0;
    margin: 0 36rpx;
    border-bottom: 2rpx solid #dddddd;
    display: flex;
    justify-content: space-between;
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    &__label {
      font-size: 30rpx;
      color: #1c1c1c;
      font-weight: 500;
    }
    &-option {
      font-size: 30rpx;
      color: #828282;
      &__arrow {
        display: flex;
        align-items: center;
        img {
          width: 24rpx;
          height: 18rpx;
          margin-left: 4rpx;
        }
      }
    }
    &__text {
      font-size: 30rpx;
      color: #828282;
    }
    &__upload {
      margin-top: 30rpx;
    }
  }
  &-upload {
    display: block;
  }
}
</style>
