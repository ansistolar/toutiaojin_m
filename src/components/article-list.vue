<template>
  <div>
    <div class="article-list">
      <!-- {{channelItem}} -->
      <van-pull-refresh
        v-model="refreshing"
        :success-text="refreshText"
        success-duration="700"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
          <article-item
            v-for="(item, index) in list"
            :key="index"
            :articleItem="item"
          ></article-item>
        </van-list>
      </van-pull-refresh>
    </div>

  </div>
</template>

<script>
// 导入 获取所有频道新闻推荐列表 API
import { getAllArticleListAPI } from "@/api/index";
// 导入文章列表子项 组件
import articleItem from "@/components/article-item/index.vue";

export default {
  name: "ArticleList",
  components: {
    articleItem,
  },
  props: {
    // 传入的数据
    channelItem: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      // vant List 组件数据
      list: [],
      loading: false,
      error: false,
      finished: false,
      // 判断是否有时间戳，若无则新建，有则使用后端返回的时间戳
      timeNow: this.timeNow || new Date().getTime(),
      // 下拉刷新
      isLoading: false,
      refreshing: false,
      refreshText: "",
      // vant List 组件数据

    };
  },
  methods: {
    // 加载列表
    async onLoad() {
      try {
        // 1. 异步更新数据
        const res = await this.getAllArticleList();
        // console.log(res.results);

        // 2. 把请求结果数据放到 list 数组中
        this.list.push(...res.results);

        // console.log(this.list);
        // 3. 本次数据加载结束
        this.loading = false;
        // console.log(res.pre_timestamp); // 这是列表加载完毕后端返回给我们的请求前一页数据的时间戳

        // 4.   数据全部加载完成
        if (res.results.length) {
          // 若还有内容，更新时间戳
          this.timeNow = res.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        // console.log("列表加载发生错误", err);
        this.loading = false; // 关闭 loading 效果
        this.error = true; // 开启错误提示
      }
    },
    // 下拉刷新列表
    async onRefresh() {
      try {
        // 1. 请求获取数据
        this.timeNow = new Date().getTime(); // 下拉刷新使用最新时间戳
        const res = await this.getAllArticleList();
        console.log(res.results);
        // 2. 将数据追加到列表的顶部
        this.list.unshift(...res.results);
        // 3. 关闭下拉刷新的 loading 状态
        this.refreshing = false;
        this.refreshText = "刷新成功，更新了" + res.results.length + "条数据";
        // this.$toast('更新了'+res.results.length+'条数据')
      } catch (err) {
        console.log("请求数据失败", err);
        this.refreshText = "刷新失败，请稍后重试";
      }
    },
    // 获取所有新闻推荐列表
    async getAllArticleList() {
      // const timeNow = new Date().getTime();
      const res = await getAllArticleListAPI({
        channel_id: this.channelItem.id,
        timestamp: this.timeNow,
      });
      // console.log(res.data);
      return res.data.data;
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>