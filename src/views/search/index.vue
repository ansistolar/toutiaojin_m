<template>
  <div class="search-container">
    <!-- 搜索框 start -->
    <form class="form-fixed" action="/">
      <van-search
        v-model="searchText"
        show-action
        autofocus
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
      >
        <i slot="left-icon">
          <van-icon name="search" />
        </i>
      </van-search>
    </form>
    <!-- 搜索框 end -->

    <!-- 搜索结果 start -->
    <searchresult v-if="isResultShow" :searchText="searchText"></searchresult>
    <!-- 搜索结果 end -->

    <!-- 搜索建议 start -->
    <searchsuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @searchNow="onSearch"
    ></searchsuggestion>
    <!-- 搜索建议 end -->

    <!-- 搜索历史 start -->
    <searchhistory
      v-else
      :searchHistoryList="searchHistoryList"
      @clearSearchHistory="clearSearchHistory"
      @historySearch="onSearch"
    ></searchhistory>
    <!-- 搜索历史 end -->
  </div>
</template>

<script>
// 导入 搜索 子组件
import searchhistory from "@/views/search/components/search-history.vue";
import searchsuggestion from "@/views/search/components/search-suggestion.vue";
import searchresult from "@/views/search/components/search-result.vue";

// 导入 本地存储操作 模块来实现 历史记录 数据持久化
import { getItem,setItem } from "../../utils/localStorage"

export default {
  name: "search",
  components: {
    searchhistory,
    searchsuggestion,
    searchresult,
  },
  data() {
    return {
      // 输入框中的内容
      searchText: "",
      // 搜索结果页的展示状态
      isResultShow: false,
      // 搜索结果
      searchResultList: [],
      // 搜索历史
      searchHistoryList: getItem('LocalSearchHistory') || [],
    };
  },
  methods: {
    // 点击搜索
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val;
      this.$toast(val);

      // 添加到搜索历史列表中
      // 要求：1.不能有重复的内容；2.最新的放在最前面
      //   this.searchHistoryList.push(val);	// 大错特错
      const index = this.searchHistoryList.indexOf(val); // 在 searchHistoryList 中寻找 值为 val 的 index
      //   如果和已存在的历史纪录重复，则将原来的删除
      if (index != -1) {
        this.searchHistoryList.splice(index, 1);
      }
      // 使用 unshift 将 新元素添加到数组头部
      this.searchHistoryList.unshift(val);
      console.log("这是搜索历史列表中的内容", this.searchHistoryList);

      // 展示搜索结果页面
      this.isResultShow = true;
    },
    // 取消搜索
    onCancel() {
      // this.$router.push({
      //   path: "/",
      //   query: {
      //     keywords: this.input,
      //     type: this.type,
      //     date: new Date().getTime(),
      //   },
      // });
      this.$router.back()
    },
    // 聚焦输入框
    onFocus() {
      // 输入框聚焦 将搜索结果不可见
      this.isResultShow = false;
    },
    // 清空历史记录
    clearSearchHistory() {
      this.searchHistoryList = [];
    },
  },
  watch:{
    searchHistoryList(val) {
      setItem('LocalSearchHistory',val);
    }
  }
};
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
.search-container {
  padding-top: 108px;
  .form-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
