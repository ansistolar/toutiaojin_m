<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in searchResultList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
// 搜索结果 API
import { getSearchResultAPI } from "@/api/index.js";

export default {
  name: "searchResult",
  props: {
    searchText: {
      require: true,
      type: String,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error:false,
      // 搜索接口参数
      page: 1,
      per_page: 20,
      // 搜索结果
      searchResultList: [],
    };
  },
  methods: {
    async onLoad() {
      try {
        // 请求搜索结果
        const res = await this.getSearchResult(this.searchText);
        // 将数据添加到 数组中
        this.searchResultList.push(...res.data.data.results);
        console.log("这是搜索结果", this.searchResultList);

        // 加载状态结束
        this.loading = false;

        // 判断数据全部加载完成
        // 若还有数据 page++
        // 若无 见过全部加载完成状态 finished 设为 true
        if (res.data.data.results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        // 加载失败了，loading也要停
        this.loading = false;
        console.log("请求数据失败，请稍后重试");
      }
    },
    // 获取 搜索API 返回的值
    getSearchResult(keyWord) {
      const res = getSearchResultAPI({
        page: this.page,
        per_page: this.per_page,
        q: keyWord,
      });
      return res;
    },
  },
  created() {
    // 每次搜索都要 重置 page
    this.page = 1;
  },
};
</script>

<style lang="scss" scoped>
</style>