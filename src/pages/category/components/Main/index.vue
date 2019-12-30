<template>
  <div class="main">
    <template v-if="secondaryCategoryList.length">
      <MainNav :categoryList="secondaryCategoryList" @getSecondaryCate="getSecondaryCate" />
      <GoodsList :goodsList="goodsList" v-if="goodsList.length" @getMore="getMore" />
    </template>
    <template v-if="!goodsList.length">
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
    },//分类列表
    goodsList:{
      type:Array,
      default:()=>{
        return []
      }
    }, //商品列表
    loading:{
      type:Boolean,
      default:true
    } //商品列表正在加载
  },
  components: {
    MainNav,
    GoodsList,
    EmptyGoodsTip
  },

  methods:{
    /**
     * @description 获取二级分类id
     */
    getSecondaryCate(val){
      this.$emit('getSecondaryCate',val)
    },

    /**
     * @description 触底
     */
    getMore(){
      this.$emit('getMoreGoodList')
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
