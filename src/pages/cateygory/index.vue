<template>
  <div class="categoty">
    <category-header />
    <div class="main">
      <category-aside />
      <category-main />
    </div>
  </div>
</template>

<script>
import CategoryHeader from './components/Header'
import CategoryAside from './components/Aside'
import CategoryMain from './components/Main'
export default {
  components: {
    CategoryHeader,
    CategoryAside,
    CategoryMain,
  }
}
</script>

<style lang="scss" scoped>
.main{
  display: flex;
  flex: 1;
  position: relative;
}
</style>
