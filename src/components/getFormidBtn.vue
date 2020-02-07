<template>
  <form report-submit="true">
    <button class="hiddenBtn" @click="uploadFormId">   
      <slot></slot>
    </button> 
  </form>
</template>

<script>
export default {
  name: 'getFormidBtn',
  data () {
    return {
      formId: '', //获取formId
    }
  },
  methods: {
    uploadFormId (e) {
     console.log('aaaa')
    }
  }
}
</script>

