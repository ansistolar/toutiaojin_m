<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentItemDetail.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ aut_name }}</div>
      <van-button
        class="like-btn"
        @click="onLiking(commentItemDetai)"
        :loading="isLikeLoading"
        :class="{ liked_class: commentItemDetai.is_liking }"
        :icon="commentItemDetai.is_liking ? good - job : good - job - o"
      >
        <!-- {{ commentItemDetail.is_liking ? like_count : "赞" }} -->
        {{ commentItemDetai.like_count || "赞" }}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ commentItemDetail.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate"
          >{{ commentItemDetail.pundata | relativeTime }}天前</span
        >
        <van-button class="reply-btn" round @click="$emit('reply-click',commentItemDetail)"
          >
          回复 {{ commentItemDetail.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
// 导入 对评论点赞 & 取消对评论点赞 API
import { commentLikeAPI, delCommentLikeAPI } from "@/api/index";

export default {
  name: "CommentItem",
  components: {},
  props: {
    commentItemDetail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLikeLoading: false,
    };
  },
  methods: {
    async onLiking(commentItemDetai) {
      // 按钮显示加载中样式
      this.isLikeLoading = true;
      try {
        if (commentItemDetai.is_liking) {
          // 已经点赞则取消点赞
          await delCommentLikeAPI(commentItemDetai.aut_id);
          // 更新视图
          this.commentItemDetai.like_count-=1;
        } else {
          await commentLikeAPI(commentItemDetai.aut_id);
          this.commentItemDetai.like_count+=1;
        }
        this.commentItemDetail.is_liking = !this.commentItemDetail.is_liking;
      } catch (error) {
        this.$toast("点赞失败，请稍后重试");
      }
      this.isLikeLoading = false;
    },
  },
  created() {},
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }

  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }

  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }

  .bottom-info {
    display: flex;
    align-items: center;
  }

  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }

  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;

    &.liked_class {
      color: #e5645f;
    }

    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
