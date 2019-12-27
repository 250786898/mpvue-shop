<template>
  <div class="categoty">
    <category-header />
    <div class="main">
      <category-aside :categoryList="primaryCateList" @getCurrentCategory="getPrimaryCateId" />
      <category-main
        :secondaryCategoryList="SecondaryCateList"
        @getSecondaryCate="getSecondaryCateId"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategoryHeader from "./components/Header";
import CategoryAside from "./components/Aside";
import CategoryMain from "./components/Main";
import CategoryModel from "@/model/category";
const categoryModel = new CategoryModel();

export default {
  components: {
    CategoryHeader,
    CategoryAside,
    CategoryMain
  },

  data() {
    return {
      currentPrimaryId: "", //当前一级分类id
      currentSecondaryId:"",//当前二级分类id
      primaryCateList: [], //一级分类
      SecondaryCateList: [], //一级分类
      pageNumber:1//页码
    };
  },

  methods: {
    /**
     * @description 获取一级分类列表查询默认商品列表
     */
    async getCategoryList() {
      const res = await categoryModel.findPrimaryCategory();
      console.log("所有一级分类", res.data);
      this.primaryCateList = res.data;
      this.currentPrimaryId = this.primaryCateList[0].id;
      this.getGoodList();
    },

    /**
     * @description 点击一级分类获取当前一级分类id
     */
    getPrimaryCateId(val) {
      wx.showLoading({
        title: "加载中"
      });
      console.log("当前点击的一级id", val);
      this.currentPrimaryId = val;
      this.getSecondaryCateList();
    },

    /**
     * @description 根据一级分类id查询二级分类
     */
    async getSecondaryCateList() {
      const res = await categoryModel.findSecondaryCategory({
        gcParentId: this.currentPrimaryId
      });
      console.log("根据一级分类查询所有二级分类", res.data);
      this.SecondaryCateList = res.data;
      this.currentSecondaryId = this.SecondaryCateList.length ? this.SecondaryCateList[0].id : "";
      this.getGoodList();
    },

    /**
     * @description 点击二级分类获取二级分类id
     */
    getSecondaryCateId(val) {
      this.currentSecondaryId = val;
      console.log("当前点击的二级分类", val);
      this.getGoodList();
    },

    /**
     * @description 获取商品列表
     */
      async getGoodList(){
        const res = await categoryModel.findGoodsList({
          pcId:this.currentPrimaryId,
          gcId:this.currentSecondaryId,
          pageSize:10,
          pageNumber:this.pageNumber,
          storeId:this.storeId
        })
        wx.hideLoading();
      }
  },
  computed: {
      ...mapState(['storeId'])
    },
  created() {
    this.getCategoryList();
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex: 1;
  position: relative;
  box-sizing: border-box;
}
</style>
