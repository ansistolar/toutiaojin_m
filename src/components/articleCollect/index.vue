<template>
  <!-- 收藏按钮 start -->
  <van-icon
    v-if="!isCollect"
    @click="starArticle(articleId)"
    color="#777"
    name="star-o"
  />
  <van-icon
    v-else
    @click="starArticle(articleId)"
    name="star"
    color="#ffe40f"
  />
  <!-- 收藏按钮 end -->
</template>

<script>
// 导入自定义的 收藏&取消收藏 API
import { addCollectAPI, delCollectAPI } from "@/api/index.js";

export default {
  name: "articleCollect",
  props: {
    articleId: {
      required: true,
    },
  },
  data() {
    return {
      // 是否已收藏该文章
      isCollect: false,
    };
  },
  methods: {
    isCollected(articleId) {
      console.log("这是这篇文章的Id", articleId);
      console.log(
        "这时vuex中的用户已收藏的文章Id",
        this.$store.state.xiaojin.data.userCollectionId
      );
      console.log("这是可用的this", this);
      // console.log(typeof articleId)
      if (
        this.$store.state.xiaojin.data.userCollectionId.includes(
          parseInt(articleId)
        )
      ) {
        this.$toast("包含");
        this.isCollect = true;
      } else {
        this.$toast("不包含");
        this.isCollect = false;
      }
    },
    // 点击收藏按钮
    async starArticle(articleId) {
      // 点击收藏的时候
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration:0 ,    // 持续展示 toast
        message:'操作中...',
        forbinClick:true,   // 是否禁止背景点击
      })
      try {
        // 随机抛出错误，模拟请求失败
        // if(Math.random()>0.5) {
        //     JSON.stringify(asdfghjkl)
        // }
        // 先判断该文章是否已收藏
       setTimeout(async () => {
         if (this.isCollect) {
          // 取消收藏该文章
          await delCollectAPI(articleId);
        this.$toast.success("取消收藏");
        } else {

          // 收藏该文章
          await addCollectAPI(articleId);
        this.$toast.success("收藏成功");
        }
        // 最后修改收藏按钮状态
        this.isCollect = !this.isCollect;
       }, 3000);
      } catch (error) {
        console.log("收藏&取消收藏失败", error);
        this.$toast.fail("操作失败");
      }
    },
  },
  created() {
    // 判断此文章是否已被收藏
    this.isCollected(this.articleId);
  },
};
</script>

<style lang="scss" scoped>
</style>