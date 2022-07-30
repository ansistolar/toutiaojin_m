<template>
  <div>
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 子路由出口 -->

    <!-- tabBar 标签栏 -->
    <van-tabbar class="tabbar-wrap" route placeholder>
      <van-tabbar-item replace to="/layout/home">
        首页
        <template #icon>
          <i class="iconfont icon-home"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/qa">
        问答
        <template #icon>
          <i class="iconfont icon-chat"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/videop"
        >视频
        <template #icon>
          <i class="iconfont icon-play"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/my">
        {{ $store.state.user? '我的' : '未登录' }}
        <template #icon>
          <i class="iconfont icon-me"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!-- tabBar 标签栏 -->
  </div>
</template>

<script>
export default {
    name:"layout",
  data() {
    return {
    };
  },
};
</script>

<style lang="less" scoped>
.tabbar-wrap {
    height: 103px;
  font-size: 20px;
  .iconfont {
    font-size: 40px;
  }
}
</style>