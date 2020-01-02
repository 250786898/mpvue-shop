<template>
  <div class="categoty">
    <category-header />
    <div class="main">
      <category-aside :categoryList="primaryCateList" @getCurrentCategory="getPrimaryCateId" />
      <category-main
        :secondaryCategoryList="SecondaryCateList"
        @getSecondaryCate="getSecondaryCateId"
        :goodsList="loadingAllGoods?allGoodsList : goodsList"
        :isAllGoods="loadingAllGoods"
        @getMoreGoodList="getMoreGoodList"
        :secondaryCateIndex="secondaryCateIndex"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryHeader from "./components/Header";
import CategoryAside from "./components/Aside";
import CategoryMain from "./components/Main";
import CategoryModel from "@/model/category";
const categoryModel = new CategoryModel();

const PAGE_SIZE = 10;

export default {
  components: {
    CategoryHeader,
    CategoryAside,
    CategoryMain
  },

  data() {
    return {
      currentPrimaryId: "", //当前一级分类id
      currentSecondaryId: "", //当前二级分类id
      primaryCateList: [], //一级分类列表
      SecondaryCateList: [], //二级分类列表
      goodsList: [], //商品列表
      pageNumber: 1, //页码
      cateIndex: 0, //二级分类索引
      allGoodsList: [], //全部商品列表
      loadingAllGoods: true, //是否是加载全部商品
      lock: true //加载
    };
  },

  methods: {
    /**
     * @description 初始化数据
     */
    init() {
      this.goodsList = [];
      this.allGoodsList = [];
      this.pageNumber=1;
      this.lock = true;
      this.cateIndex=0;
    },

    /**
     * @description 获取分类和商品
     */
    async getCategoryList() {
      const res = await categoryModel.findPrimaryCategory();
      console.log("所有一级分类", res.data);
      this.primaryCateList = res.data;
      this.currentPrimaryId = this.primaryCateList[0].id;
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
      this.getAllCateGoodsList();
    },

    /**
     * @description 获取全部页面的商品
     */
    async getAllCateGoodsList() {
      if (this.cateIndex <= this.primaryCateList.length) {

        this.currentSecondaryId = this.SecondaryCateList.length
          ? this.SecondaryCateList[this.cateIndex].id
          : "";

        this.getGoodsData().then(res => {
          this.allGoodsList = [
            ...this.allGoodsList,
            {
              title: this.SecondaryCateList[this.cateIndex].gcName,
              goodsList: res.data
            }
          ];

          if (res.data.length < PAGE_SIZE) {
            this.pageNumber = 1;
            this.cateIndex++;
            this.getAllCateGoodsList();
          }

        });
      }
    wx.hideLoading();
    },

    /**
     * @description 触底分页
     */
    getMoreGoodList() {
      this.pageNumber++;
      this.loadingAllGoods ? this.getGoodListByAllCate() : this.getGoodList();
    },

    /**
     * @description 点击一级分类获取当前一级分类id
     */
    getPrimaryCateId(val) {
      wx.showLoading({
        title: "加载中"
      });
      this.init();
      console.log("当前点击的一级id", val);
      this.currentPrimaryId = val;
      this.loadingAllGoods = true;
      this.getSecondaryCateList();
    },

    /**
     * @description 点击二级分类获取二级分类id
     */
    getSecondaryCateId(val) {
      wx.showLoading({
        title: "加载中"
      });
      this.init();
      if (val) {
        this.currentSecondaryId = val;
        this.loadingAllGoods = false;
        console.log("当前点击的二级分类", val);
        this.getGoodList();
      } else {
        this.currentSecondaryId = "";
        this.loadingAllGoods = true;
        this.getAllCateGoodsList();
      }
    },


    /**
     * @description 请求商品列表数据
     */
    async getGoodsData() {
      return await categoryModel.findGoodsList({
        pcId: this.currentPrimaryId,
        gcId: this.currentSecondaryId,
        pageSize: PAGE_SIZE,
        pageNumber: this.pageNumber,
        storeId: this.storeId
      });
    },

    /**
     * @description 获取单个分类商品列表
     */
    async getGoodList() {
      if (this.lock) {
        this.lock = false;
        this.getGoodsData().then(res => {
          this.goodsList = [...this.goodsList, ...res.data];

          res.data.length < PAGE_SIZE
            ? (this.lock = false)
            : (this.lock = true);
        });
      }
      wx.hideLoading();
    },

    /**
     * @description 获取全部页面单个分类的商品列表
     */
    getGoodListByAllCate() {
      if (this.lock) {
        this.lock = false;
        this.getGoodsData().then(res => {
          this.allGoodsList[this.cateIndex].goodsList = [
            ...this.allGoodsList[this.cateIndex].goodsList,
            ...res.data
          ];

          if (res.data < PAGE_SIZE) {
            this.pageNumber = 1;
            this.cateIndex++;
            this.getAllCateGoodsList();
          }
          this.lock = true;
        });
      }
      wx.hideLoading();
    }
  },

  computed: {
    ...mapState(["storeId"])
  },

  onLoad() {
    // Object.assign(this.$data, this.$options.data());
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
