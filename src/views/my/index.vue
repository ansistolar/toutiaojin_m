<template>
  <div class="my-container">
    <!-- 未登录 start -->
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="$router.push({ path: '/login' })">
        <img src="~@/assets/mobile.png" alt="" />
        <span> 登录 / 注册 </span>
      </div>
    </div>
    <!-- 未登录 end -->
    <!-- 已登录 start -->
    <section>
      <!-- 已登录头部 start -->
      <div class="header user-info" v-if="user">
        <div class="base-info">
          <div class="left">
            <van-image
              round
              class="avatar"
              fit="cover"
              :src="userInfo.photo"
            ></van-image>
            <span>{{ userInfo.name }}</span>
          </div>
          <div class="right">
            <van-button round class="edButton" type="default"
              >编辑资料</van-button
            >
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
        <!-- 已登录头部 end -->
      </div>

      <!-- 宫格导航 收藏&历史 start -->
      <van-grid :column-num="1" class="collect-history" clickable v-if="!user">
        <van-grid-item text="历史">
          <template #icon>
            <i class="iconfont icon-compass"></i>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 上为未登录，下为已登录 -->
      <van-grid :column-num="2" class="collect-history" clickable v-else>
        <van-grid-item text="收藏" class="">
          <template #icon>
            <i class="iconfont icon-collection"></i>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <i class="iconfont icon-compass"></i>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 宫格导航 收藏&历史 end -->
      <!-- 消息通知&小金同学 start -->
      <div class="msg-jin" v-if="user">
        <van-cell center class="cell-item" title="消息通知" is-link>
          <i slot="right-icon" class="iconfont icon-right"></i>
        </van-cell>
        <van-cell center class="cell-item" title="小金同学" is-link>
          <i slot="right-icon" class="iconfont icon-right"></i>
        </van-cell>
      </div>
      <!-- 消息通知&小金同学 end -->
      <!-- 退出登录 start -->
      <van-cell
        title="退出登录"
        clickable
        class="layout"
        v-if="user"
        @click="onLogout"
      >
      </van-cell>
      <!-- 退出登录 end -->
    </section>
    <!-- 已登录 end -->
  </div>
</template>

<script>
// 引入 vuex 辅助函数
import { mapState } from "vuex";

// 引入需要用到的接口
import { getUserInfoAPI } from "@/api/index";

export default {
  name: "my",
  data(){
    return {
      userInfo:{}
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // 点击退出登录
    onLogout: function () {
      // 点击退出登录 弹窗提示
      // 使用 vant 提供的 Dialog 弹出框确认退出
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "确认退出当前帐号吗？",
        })
        .then(() => {
          // 点击确认
          // removeItem('TOUTIAO_USER');
          // console.log(this.user);
          // this.user = null
          // 将vuex和本地存储的 'TOUTIAO_USER' 设为 null
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // 点击取消
          console.log("取消退出");
          this.loadUser();
        });
    },
    // 请求用户信息
    loadUser() {
      try {
        const res = getUserInfoAPI();
        this.userInfo = res.data.data;
        console.log(this.userInfo);
      } catch (err) {
        console.log(err);
          console.log('请求已发送');
      }
    },
  },
  created() {
    this.loadUser();
    // this.$toast('123')
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .header {
    position: relative;
    height: 362px;
    width: 100%;
    // opacity: 0.7;
    // background-color: #3296fa;
    // 背景图透明度渐变
    background-image: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0)
      ),
      url("~@/assets/banner.png");
    background-size: cover;
  }

  // 未登录头部 start
  .not-login {
    // // flex 布局水平垂直居中
    display: flex;
    justify-content: center;
    align-content: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
      }
      span {
        display: block;
        margin-top: 15px;
        line-height: 28px;
        height: 28px;
        font-family: "MicrosoftYaHei";
        font-size: 28px;
        color: #eee;
      }
    }
  }
  // 未登录头部 end

  // 已登录头部 start
  .user-info {
    // 头部上部
    .base-info {
      height: 232px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 72px 32px 23px;
      box-sizing: border-box;
      // background-color: #789;
      .left {
        display: flex;
        // justify-content: center;
        // align-content: center;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 22px;
          border: 3px solid #fff;
        }
        span {
          font-size: 30px;
          color: #fff;
          font-family: "微软雅黑";
        }
      }
      .right {
        .edButton {
          height: 51px;
          width: 174px;
          font-size: 20px;
        }
      }
    }
    // 头部下部
    .data-stats {
      height: 130px;
      // background-color: #987;
      display: flex;
      justify-content: space-around;
      // align-items: center;

      .data-item {
        height: 130px;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        // justify-items: center;
        justify-content: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 22px;
        }
      }
    }
  }
  // 已登录头部 end
  // 收藏&历史 start
  .collect-history {
    overflow: hidden;
    height: 141px;
    font-size: 27px;
    .iconfont {
      display: block;
      margin-bottom: 15px;
      font-size: 45px;
      color: #ff9d1d;
    }
  }
  // 收藏&历史 end
  // 消息和小金同学 start
  .msg-jin {
    margin: 9px 0;
    .cell-item {
      height: 100px;
      font-size: 29px;
      color: #333;
      .iconfont {
        font-size: 21px;
        color: #9f9f9f;
        font-weight: 700;
      }
    }
  }
  // 消息和小金同学 end
  // 退出登录 start
  .layout {
    height: 104px;
    text-align: center;
    line-height: 66px;
    font-size: 29px;
    color: #d86262;
  }
  // 退出登录 end
}
</style>