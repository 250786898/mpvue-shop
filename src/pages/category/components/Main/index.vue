<template>
  <div class="main">
    <template v-if="true">
      <MainNav :categoryList="secondaryCategoryList" @getSecondaryCate="getSecondaryCate" v-if="secondaryCategoryList.length" />
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
import CategoryModel from '@/model/category'
const categoryModel = new CategoryModel()

export default {
  props:{
    secondaryCategoryList:{
      type:Array,
      default:()=>{
        return []
      }
    }//分类列表
  },
  components: {
    MainNav,
    GoodsList,
    EmptyGoodsTip
  },

  methods:{
    getSecondaryCate(val){
      this.$emit('getSecondaryCate',val)
    }
  },

  created(){
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
