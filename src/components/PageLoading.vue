<template>
  <div class="loading" v-if="show">
    <lj-loading />
  </div>
</template>

<script>
import LjLoading from '@/components/LjLoading'
export default {
  components: {
    LjLoading
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .loading {
    width: 100vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
</style>