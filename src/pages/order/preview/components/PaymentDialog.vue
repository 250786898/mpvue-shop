<template>
  <div v-if="shown">
    <div class="backdrop" @click="$emit('update:shown', false)"></div>
    <div class="goods-theme-dialog">
      <navigator :url="'/pages/goodstheme/main?id='+activityInfo.activityId">
        <img :src="activityInfo.activityLogo" class="goods-theme-dialog__bg" mode="widthFix">
      </navigator>
      <div class="goods-theme-dialog__footer">   
        <form report-submit="true" @submit="uploadFormId">
          <button class="hiddenBtn" form-type="submit" @click="handleCancel()">       
            <icon type="cancel" size="40" color="#fff"></icon>
          </button> 
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import getFormidBtn from '@/components/getFormidBtn'
  import {Api} from '@/http/api'
  export default {
    components: {
      getFormidBtn
    },
    props: {
      shown: {
        type: Boolean,
        default: false
      },
      activityInfo: {
        type: Object,
        default:{}
      }
    },
    data () {
      return {
        formId: ''
      }
      
    },
    methods: {
      uploadFormId (e) {
        this.formId = e.target.formId
        Api.user.addFormId({
          formId: this.formId
        }).then((res) =>{
          if(res.code == Api.CODES.SUCCESS) {
            console.log(res)
          }
        })
      },
      handleCancel () {
        console.log('formId',this.formId)
        this.$emit('update:shown', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goods-theme-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 100;
    margin-left: -300rpx;
    margin-top: -430rpx;
    width: 600rpx;
    height: 860rpx;
    &__bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 742rpx;
    }
    &__footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
    }
  }
</style>