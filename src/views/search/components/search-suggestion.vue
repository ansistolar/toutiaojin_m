<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestionList"
      :key="index"
	  @click="searchFn(item)"
    >
      <!-- <span slot="title" v-html="item.replace(searchText,`<span style=' color: #3296fa;'>`+searchText+`</span>`)"> -->
      <span slot="title" v-html="hightLight(item)"> </span>
    </van-cell>
  </div>
</template>

<script>
// 搜索建议 API
import { getSearchRecommendAPI } from "@/api/index.js";

// 引入Lodash
// 按需加载：只会把用得到的成员打包到结果中
import { debounce } from "lodash";

export default {
  name: "searchSuggestion",
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      suggestionList: [],
    };
  },
  methods: {
    // 获取搜索建议方法
    async getSearchRecommend(text) {
      const res = await getSearchRecommendAPI(text);
      this.suggestionList = res.data.data.options;
    //   console.log("搜索建议列表", this.suggestionList);
    },
    // 搜索建议中的关键词高亮
    hightLight(suggestionItem) {
      if (!suggestionItem) return console.log("没有搜索建议");
      const highLightStr =
        '<span style="color: #3296fa;">' + this.searchText + "</span>";
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(this.searchText, "gi");
      return suggestionItem.replace(reg, highLightStr);
    },
	// 点击搜索建议 触发父组件搜索并传搜索关键字
	searchFn(item){
		this.$emit('searchNow',item)
	}
  },
  watch: {
    // 侦听 父组件传过来的 输入框内容的变化
    // 注意： handler 函数名称是固定的
    searchText: {
      // handler(newVal) {
      // 	// console.log(newVal);
      // 	// 输入框内容发生变化 获取搜索建议
      // 	// 当搜索框中内容为空时
      // 	if (newVal.trim().length == 0) return;
      // 	this.getSearchRecommend(newVal);
      // 	console.log(newVal);
      // },
      // 使用 Lodash 的 debounce 进行防抖
      handler: debounce(function (newVal) {
        // console.log(newVal);
        // 输入框内容发生变化 获取搜索建议
        // 当搜索框中内容为空时
        if (newVal.trim().length == 0) return;
        this.getSearchRecommend(newVal);
      }, 200),
      immediate: true, // 该回调将会在侦听开始之后被立即调用
    },
  },
};
</script>

<style lang="less" scoped>
</style>
