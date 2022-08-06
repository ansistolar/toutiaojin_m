<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!message.trim().length"
      @click="onAddComment"
    >
      发布
    </van-button>
  </div>
</template>

<script>
// 对文章或评论进行 评论
import { addCommentAPI } from "@/api/index";

export default {
  // 这是评论弹出层组件
  name: "CommentPost",
  components: {},
  props: {
    target: {
      required: true,
      type: [String, Number, Object],
    },
  },
  // 注入祖先组件提供的数据
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {
    async onAddComment() {
      // 点击 发布 的时候 显示发布中
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "发布中...",
        forbinClick: true, // 是否禁止背景点击
      });
      try {
        // 因为 api 失效，所以先注释掉
        const { data } = await addCommentAPI({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.articleId ? this.articleId.toString() : this.articleId, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        // 清空文本框
        this.message = "";
        // 将发布内容显示到列表顶部
        // 关闭弹出层
        this.$emit("post-success", data);
        // 显示发布成功
        this.$toast.success("发布成功");
      } catch (error) {
        console.log("评论失败", error);
        // 显示 发布失败
        this.$toast.fail("操作失败");
      }
    },
  },
};
</script>


<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>