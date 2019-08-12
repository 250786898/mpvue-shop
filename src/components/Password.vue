<template>
  <div class="password" @click="setFocus">
    <!-- <div class="password__bd">
      <div class="password__bd__item" v-for="num in [1,2,3,4,5,6]" :class="{ active: localPassword.length >= num }" ></div>
    </div> -->
    <input type="number" :password="true" :focus="focus" :maxlength="MAX_LENGTH" v-model="localPassword" @input="onInput" @blur="onBlur">
    <div class="password__bd">
      <div class="password__bd__item" v-for="num in [1,2,3,4,5,6]" :class="{ active: localPassword.length >= num }" >
      </div>
    </div>
  </div>
</template>

<script>
  const MAX_LENGTH = 6

  export default {
    props: {
      password: {
        type: String,
        default: ''
      },
      autoFocus: {
        type: Boolean,
        default: true
      }
    },

    model: {
      prop: 'password',
      event: 'change'
    },

    data() {
      return {
        MAX_LENGTH,
        localPassword: '',
        focus: false
      }
    },

    methods: {
      onInput(e) {
        this.$emit('change', this.localPassword)
        if (this.localPassword.length >= MAX_LENGTH) {
          this.$emit('complete', this.localPassword)
          // this.focus = false
        }
      },

      onBlur() {
        // this.$emit('update:focus', false)
        this.focus = false
        this.localPassword = ''
      },

      setFocus() {
        this.focus = true
      }
    },

    created() {
    },

    watch: {
      password: {
        handler(val) {
          this.localPassword = val
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .password {
    position: relative;
    border: 1rpx solid #999;
    width: 456rpx;
    overflow: hidden;
    &__bd {
      display: flex;
      &__item {
        position: relative;
        flex: 1;
        height: 72rpx;
        + .password__bd__item {
          border-left: 1rpx solid #999;
        }

        &.active:before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 30rpx;
          height: 30rpx;
          margin-top: -15rpx;
          margin-left: -15rpx;
          border-radius: 15rpx;
          background-color: #333;
        }
      }
    }

    input[type=number] {
      border: 0 none!important;
      padding: 0!important;
      height: 0!important;
      width: 0!important;
      font-size: 0!important;
      line-height: 1rpx!important;
      min-height: 1rpx!important;
    }
  }
</style>