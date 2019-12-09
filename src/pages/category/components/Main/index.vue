<template>
  <div class="main">
    <template v-if="true">
      <MainNav />
      <GoodsList />
    </template>
    <template v-else>
      <div class="empty-goods-tip">
        <EmptyGoodsTip :title="'该分类无团购'" />
      </div>
    </template>
  </div>
</template>

<script>
import MainNav from './components/Nav'
import GoodsList from './components/GoodsList'
import EmptyGoodsTip from "@/components/EmptyGoodsTip"
export default {
  components: {
    MainNav,
    GoodsList,
    EmptyGoodsTip
  }
}
</script>

<style lang="scss" scoped>
.main{
   flex: 1;
   flex-direction: column;
   box-sizing: border-box;
   width: 582rpx;
}
.empty-goods-tip{
  margin-top: 184rpx;
}
</style>
