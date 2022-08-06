<template>
  <van-list
    v-model="loading"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <!-- <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    /> -->
	<comment-item
		v-for="(item,index) in list"
		:key="index"
		:commentItemDetail="item"
    @reply-click="$emit('reply-click',$event)"
	></comment-item>
  </van-list>
</template>

<script>
import { getCommentAPI } from "@/api";

import commentItem from "./commentItem.vue";

export default {
  name: "commentList",
  data() {
    return {
      // list: [],  // 为了操作方便，在父组件中定义此数据再传过来
      loading: false,
      finished: false,
      error: false,
      // API 请求参数
      offset: null, //获取下一页数据的标记
      limit: 5,
    };
  },
  components: {
    commentItem,
  },
  porps: {
    source: {
      required: true, 
    },
    list:{
      type:Array,
      // 默认值,如果未传值，默认为一个空数组
      // 好处是不传值也能用
      default:() => []
    },
    type:{
      type:String,
      // 自定义 props 数据验证
      invlidator(value) {
        return ['a','c'].includes(value)
      },
      default:'a'
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getCommentAPI({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 每页大小
        });
        // 2. 将数据添加到列表中
        console.log(data);
        const { results, total_count = comCount } = data.data;
        this.list.push(...results);
        // 将文章评论数量传到外部
        this.$emit("onload-success", results);
        // 3. 将加载更多的 loading 设置为 false
        this.loading = false;
        // 4. 判断是否还有数据
        if (results.length) {
          // 如果有就获取下一页的数据页码
          this.offset = data.ata.last_id;
        } else {
          // 没有就将 finished 设置结束
          this.finished = true;
        }
      } catch (e) {
        console.log("评论加载失败", e);
        this.error = true;
        this.loading = false;
      }
    },
  },
  created() {
    // 页面创建成功的时候就加载一次评论，这样才能获得评论数量并在评论图标上显示出来
    // 当你手动初始 onLoad 的话，他不会自动开始初始的 loading 转圈圈效果
    // 所以我们要手动开启 loading
    this.loading = true;
    this.onLoad();
  },
};
</script>

<style lang="scss" scoped>
</style>
