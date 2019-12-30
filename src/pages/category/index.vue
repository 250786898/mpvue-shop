<template>
  <div class="categoty">
    <category-header />
    <div class="main">
      <category-aside :categoryList="primaryCateList" @getCurrentCategory="getPrimaryCateId" />
      <category-main
        :secondaryCategoryList="SecondaryCateList"
        @getSecondaryCate="getSecondaryCateId"
        :goodsList="goodsList"
        @getMoreGoodList="getMoreGoodList"
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
      primaryCateList: [], //一级分类
      SecondaryCateList: [], //二级分类
      goodsList: [], //商品列表
      pageNumber: 1, //页码
      cateIndex: 0, //分类索引
      noMoreShow: false, //没有更多是否显示
      allGoodsList: [], //全部商品列表
      lock: true //加载
    };
  },

  methods: {
    /**
     * @description 初始化数据
     */
    init() {
      this.goodsList = [];
    },

    /**
     * @description 获取分类
     */
    async getCategoryList() {
      const res = await categoryModel.findPrimaryCategory();
      console.log("所有一级分类", res.data);
      this.primaryCateList = res.data;
      this.currentPrimaryId = this.primaryCateList[0].id;
      this.getSecondaryCateList();
    },

    /**
     * @description 点击一级分类获取当前一级分类id
     */
    getPrimaryCateId(val) {
      this.goodsList = [];
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
    },

    /**
     * @description 点击二级分类获取二级分类id
     */
    getSecondaryCateId(val) {
      wx.showLoading({
        title: "加载中"
      });
      this.init();
      this.currentSecondaryId = val;
      console.log("当前点击的二级分类", val);
      this.getGoodList();
    },

    /**
     * @description 触底
     */
    getMoreGoodList() {
      this.pageNumber++;
      this.getGoodList();
    },

    /**
     * @description 获取商品列表
     */
    async getGoodList() {
      if (this.lock) {
        this.lock = false;
        const res = await categoryModel.findGoodsList({
          pcId: this.currentPrimaryId,
          gcId: this.currentSecondaryId,
          pageSize: PAGE_SIZE,
          pageNumber: this.pageNumber,
          storeId: this.storeId
        });

        this.goodsList = [...this.goodsList, ...res.data];

        if (res.data.length < PAGE_SIZE) {
          this.cateIndex++ >= this.SecondaryCateList.length - 1
            ? (this.noMoreShow = true)
            : null;
            this.lock = false
        }else{
          this.lock = true;
        }
        wx.hideLoading();
      }
    },

    /**
     * @description 获取全部页面的商品
     */
    async getAllCateGoodsList() {
      this.currentPrimaryId = this.primaryCateList[this.pageNumber - 1].id;
      this.currentSecondaryId = this.SecondaryCateList.length
        ? this.SecondaryCateList[this.cateIndex].id
        : "";

      const res = await categoryModel.findGoodsList({
        pcId: this.currentPrimaryId,
        gcId: this.currentSecondaryId,
        pageSize: PAGE_SIZE,
        pageNumber: this.pageNumber,
        storeId: this.storeId
      });

      this.allGoodsList = [
        ...this.allGoodsList,
        {
          title: this.SecondaryCateList[this.cateIndex].gcName,
          goodsList: res.data
        }
      ];

      if (res.data < PAGE_SIZE) {
        this.pageNumber = 1;
        this.cateIndex++;
        this.getAllCateGoodsList();
      }
    }
  },
  computed: {
    ...mapState(["storeId"])
  },

  onLoad() {
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
