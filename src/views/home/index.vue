<template>
  <div class="home-container">
    <!-- 搜索栏 start -->
    <van-nav-bar fixed class="page-nav-bar">
      <template center #title>
        <van-button round center size="small" class="search">
          <template #icon>
            <van-icon name="search" class="iconsearch" />
          </template>
          <!-- <i slot="icon">
                <van-icon name="search" />
            </i> -->
          搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 搜索栏 end -->
    <!-- 频道标签页 start -->
    <van-tabs v-model="active" class="channel-tabs" animated swipeable>
      <van-tab
        :title="item.name"
        v-for="item in allChannel"
        :key="item.id"
        class="tab-item"
      >
        <!-- 文章列表组件 -->
        <article-list :channelItem="item"></article-list>
        <!-- 文章列表组件 -->
      </van-tab>
      <div slot="nav-right" class="placeholder">&nbsp;</div>
      <div slot="nav-right" class="hamburger-btn">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 频道标签页 end -->
    <!-- 弹出层 start -->
    <van-popup position="bottom" v-model="isPopup"> 内容 </van-popup>
    <!-- 弹出层 end -->
  </div>
</template>

<script>
// 导入接口
import { getUserChannelAPI, getAllChannelAPI } from "@/api/index";

// 导入封装的文章列表组件
import articleList from "../../components/article-list.vue";

export default {
  components: { articleList },
  name: "home",
  data() {
    return {
      active: 0,
      allChannel: [],
      // 弹出层 start
      isPopup: false,
      // 弹出层 endF
    };
  },
  methods: {
    // 获取所有频道
    async getAllChannel() {
      const res = await getAllChannelAPI();
      this.allChannel = res.data.data.channels;
      console.log(this.allChannel);
    },
    // 获取用户频道的方法
    getUserChannel() {
      getUserChannelAPI();
    },
  },
  created() {
    // 获取所有频道
    this.getAllChannel();
    // 获取用户频道
    // this.getUserChannel();
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 179px;
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .page-nav-bar {
    height: 96px;
    background-color: #3296fa;
    .search {
      width: 554px;
      height: 64px;
      background-color: #5babfb;
      color: #fff;
      border: none;
      font-size: 28px;
      .iconsearch {
        color: #fff;
        font-size: 34px;
      }
    }
  }
  // 频道 标签页 start
  //   /deep/ 表示 css 深度作用选择器
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      height: 82px;
      top: 95px;
      left: 0;
      right: 0;
      // left: 100px;
      z-index: 1;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      // background-color: #789;
      min-width: 190px;
      font-size: 30px;
      line-height: 82px;
      color: #777;
      // flex: unset;
    }
    .van-tab--active {
      color: #333;
    }
    // 清除父级 底部的 padding
    .van-tabs__nav {
      // padding-bottom: 0;
      padding: 0;
    }
    // 底部条
    .van-tabs__line {
      background-color: #3296fa;
      width: 31px;
      height: 6px;
      top: 68px;
      // bottom: 0;
    }
    // 汉堡按钮
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 56px;
      background-color: #fff;
      opacity: 0.752;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 2px;
        width: 1px;
        height: 100%;
        background-image: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
    .placeHolder {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      flex-shrink: 0;
      // color: transparent;
    }
  }
  // 频道 标签页 start
}
</style>