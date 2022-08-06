<template>
  <div class="commentReply-wrap">
    <!-- 回复评论页头部 start -->
    <van-nav-bar
      :title="
        currentComment.reply_count > 0
          ? `${currentComment.reply_count}条回复`
          : '暂无回复'
      "
    >
      <van-icon @click="$emit('click-close')" slot="left" name="cross" />
    </van-nav-bar>
    <!-- 回复评论页头部 end -->

    <!-- 滚动容器 -->
    <div class="scroll-wrap">
      <!-- 要回复的评论项 start -->
      <comment-item :commentItemDetail="currentComment"></comment-item>
      <!-- 要回复的评论项 end -->

      <!-- 评论的回复列表 start -->
      <van-cell title="全部回复" />
      <comment-list :source="currentComment.com_id" type="c"></comment-list>
      <!-- 评论的回复列表 end -->
    </div>
    <!-- / 滚动容器 -->

    <!-- 底部发布评论 start -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round> 写评论 </van-button>
    </div>
    <!-- 底部发布评论 end -->

    <!-- 写评论弹出层 start -->
    <van-popup v-model="isPostShow" position="bottom">
      <!-- 这是评论弹出层 -->
      <comment-post
        :list="commentList"
        :target="currentComment.com_id"
        @post-success="onPostSuccess"
      ></comment-post>
    </van-popup>
    <!-- 写评论弹出层 end -->
  </div>
</template>

<script>
// 导入 评论子项 组件
import commentItem from "./commentItem.vue";
import commentList from "./commentList.vue";
import commentPost from "./commentPost.vue";

export default {
  name: "commentReply",
  data() {
    return {
      isPostShow: false,
      commentList: [],
    };
  },
  props: {
    currentComment: {
      type: Object,
      required: true,
    },
  },
  comments: {
    commentItem,
    commentList,
    commentPost,
  },
  methods: {
    onPostSuccess(data) {
      // 更新回复的数量
      this.currentComment.reply_count++;

      // 关闭弹出层
      this.isPostShow = false;

      // 将最新的回复展示到列表的顶部
      this.commentList.unshift(data.new_obj)
    },
  },
};
</script>

<style lang="less" scoped>
.post-wrap {
  position: fixed;
  top: 92px; // 滚动容器离顶部的距离
  left: 0;
  right: 0;
  bottom: 88px; // 滚动容器离底部的距离
  overflow-y: auto; // 让浏览器自动处理 y 方向上的溢出内容，否则就不能滚动了
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>