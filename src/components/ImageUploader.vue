<template>
  <div class="uploader">
    <div class="uploader__item" v-for="(img, index) in images" :key="img">
      <img :src="img" mode="aspectFill">
      <img class="uploader__item__icon" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_icon_close.png" @click="removeImage(index)">
    </div>
    <div class="uploader__item" @click="selectImage" v-if="images.length < max">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/evaluate_icon_camera@2x.png">
    </div>
  </div>
</template>

<script>
  import { Api, UPLOAD_URL } from '@/http/api'

  export default {
    props: {
      max: {
        type: Number,
        default: 9
      },
      img: {
        type: String,
        default: ''
      }
    },

    model: {
      prop: 'img',
      event: 'change'
    },

    computed: {
      images: {
        get() {
          return this.img ?
            this.img.split(',') :
            []
        }
      }
    },

    methods: {
      selectImage() {
        wx.chooseImage({
          count: this.max - this.images.length,
          sizeType: [/*'original',*/ 'compressed'],
          sourceType: ['album', 'camera'],
          success: res => {
            if (res.tempFilePaths.length) {
              this.uploadImages(res.tempFilePaths)
              console.log(res);
            }
          }
        })
      },

      uploadImages(tempFilePaths) {
        if (tempFilePaths) {
          wx.showLoading({ title: '上传中', mask: true })
          wx.uploadFile({
            url: UPLOAD_URL,
            filePath: tempFilePaths[0],
            name: 'files',
            formData: {},
            success: res => {
              if (typeof res.data === 'string') {
                try {
                  res.data = JSON.parse(res.data)
                } catch (e) {
                  console.log('JSON.parse failed', e)
                }
                if (res.data && res.data.code === Api.CODES.SUCCESS) {
                  this.$emit('change', ([...this.images, res.data.data.result]).join(','))
                }
              }
            },
            fail: e => console.log('upload fail', e),
            complete: () => {
              wx.hideLoading()
              tempFilePaths = tempFilePaths.slice(1)
              if (tempFilePaths.length) {
                this.uploadImages(tempFilePaths)
              }
            }
          })
        }
      },

      removeImage(index) {
        let images = this.images.slice()
        images.splice(index, 1)
        this.$emit('change', images.join(','))
      },
    }
  }
</script>

<style lang="scss" scoped>
  .uploader {
    &__item {
      position: relative;
      display: inline-block;
      margin-left: 17rpx;
      vertical-align: middle;
      width: 98rpx;
      height: 98rpx;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      &__icon {
        position: absolute;
        top: -12rpx;
        right: -12rpx;
        width: 36rpx!important;
        height: 36rpx!important;
      }
    }
  }
</style>
