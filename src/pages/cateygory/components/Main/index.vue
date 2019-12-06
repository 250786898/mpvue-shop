<template>
  <div class="main">
    <MainNav />
    <GoodsList />
  </div>
</template>

<script>
import MainNav from './components/Nav'
import GoodsList from './components/GoodsList'
export default {
  components: {
    MainNav,
    GoodsList
  }
}
</script>

<style lang="scss" scoped>
.main{
   flex: 1;
    flex-direction: column;
}
</style>
