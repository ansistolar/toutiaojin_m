<template>
  <div class="user-container">
    <!-- 导航栏 start -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      placeholder
    />
    <!-- 导航栏 start -->

    <!-- 编辑页面主体内容 start -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isUpdateNameShow = true"
      :value="userProfile.name"
      is-link
    />
    <van-cell title="性别" :value="userProfile.gender ? '女' : '男'" is-link />
    <van-cell title="生日" :value="userProfile.birthday" is-link />
    <!-- 编辑页面主体内容 end -->

    <!-- 编辑 昵称 弹出层 start -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
        <update-name v-if="isUpdateNameShow" :name="userProfile.name" @cancelEdit="isUpdateNameShow = false"></update-name>
    </van-popup>
    <!-- 编辑 昵称 弹出层 end -->
  </div>
</template>

<script>
// 导入 vuex 的数据
import store from "@/store/index";

// 导入组件
import updateName from "./components/updata-name.vue"

// 导入需要的接口
import { getUserProfileAPI,editUserProfileAPI } from "@/api/index";

export default {
  // 编辑用户资料页面
  name: "user-profile",
  data() {
    return {
      userProfile: {},
      isUpdateNameShow: false,
    }
  },
  components:{
    updateName,
  },
  methods: {
    // 获取用户资料方法
    async loadUserProfile() {
      try {
        const { data } = await getUserProfileAPI();
        console.log(data);
        this.userProfile = data;
      } catch (error) {
        this.$toast("获取用户资料失败，请稍后重试");
        console.log(error);
      }
    },
  },
  created() {
    this.loadUserProfile();
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__content {
  .van-nav-bar__arrow {
    color: #fff;
  }
}
.user-container {
  .avatar {
    width: 55px;
    height: 55px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>