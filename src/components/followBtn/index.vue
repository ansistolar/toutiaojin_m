<template>
  <div class="isfollow-wrap">
    <van-button
      :loading="isFollowing"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-show="!is_followed"
      @click="onFollow()"
    >
      关注
    </van-button>
    <van-button
      :loading="isFollowing"
      v-show="is_followed"
      class="follow-btn"
      round
      size="small"
      @click="onFollow()"
      >已关注</van-button
    >
  </div>
</template>

<script>
// 导入需要的接口
import { addFollowAPI, delFollowAPI } from "@/api/index";
export default {
  props: {
    // articleDetails: {
    //   type: Object,
    //   required: true,
    // },
    is_followed: {
      type: Boolean,
      required: true,
    },
    aut_id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      // 关注按钮加载页面
      isFollowing: false,
    };
  },
  methods: {
    // 关注用户业务
    async onFollow(aut_id, is_followed) {
      this.isFollowing = true;
      const that = this;
      setTimeout(() => {
        try {
          if (is_followed) {
            // 已关注该用户，点击 取消关注
            // await delFollowAPI(aut_id)
          } else {
            // 未关注，点击关注
            // await addFollowAPI(aut_id)
          }
          //   this.is_followed = !this.is_followed;
          // 父传子简单数据不能像上面这么改
          that.$emit("updata-is_followed", !this.is_followed);
        } catch (error) {
          if (error.response && error.response.status == 400) {
            console.log("用户不能关注自己");
          } else {
            console.log("操作失败，请稍后重试", error);
          }
        }
        that.isFollowing = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
</style>
