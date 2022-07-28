<template>
  <div class="login-container">
    <!-- 导航栏 start -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 导航栏 end -->
    <!-- 表单 start -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        center
        v-model="user.mobile"
        name="mobile"
        left-icon="music-o"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <!-- 使用插槽来显示 输入手机号 左侧的字体图标 -->
        <i slot="left-icon" class="iconfont icon-personal"></i>
      </van-field>
      <van-field
        center
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <!-- 输入框左侧 字体图标 -->
        <template #left-icon>
          <i class="iconfont icon-lock"></i>
        </template>
        <!-- 发送验证码按钮 -->
        <template #button>
          <van-button
            v-if="isCountDown === false"
            round
            class="send-sms-btn"
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
          <!-- 验证码倒计时组件 -->
          <van-button
            v-else
            round
            class="send-sms-btn"
            size="small"
            type="default"
            native-type="button"
          >
            <van-count-down
              class="cotun-down-font"
              :time="60000"
              format="还有 ss s"
              @finish="isCountDown = false"
            />
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 表单 end -->
  </div>
</template>

<script>
// 引入接口
import { userLoginAPI, sendSmsAPI } from "@/api/index";

export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        code: "246810",
        mobile: "13911111111",
      },
      // 用户登录表单验证规则
      userFormRules: {
        // 手机号验证
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请填写正确的手机号",
          },
        ],
        // 验证码验证
        code: [
          { required: true, message: "请填写验证码" },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      // 验证码计时器显示状态
      isCountDown: false,
    };
  },
  methods: {
    // 提交表单请求登录
    async onSubmit() {
      // 登录轻提示 Toast
      // this.$toast('提示内容');
      this.$toast.loading({
        message: "登陆中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 展示Toast的时间，默认为2000，若为 0 则持续展示
      });

      try {
        const user = this.user;
        const res = await userLoginAPI(this.user);
        this.$toast.success("登陆成功");
        // 登陆成功后将用户 Token 存储到 Vuex 中
         this.$store.commit('setUser',res.data.data)
        // console.log("登陆成功", res);
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
          // console.log("手机号或验证码错误", err);
          this.$toast.fail("手机号或验证码错误");
        } else {
          // console.log("登陆失败，请稍后重试", err);
          this.$toast.fail("登陆失败，请稍后重试");
        }
      }
    },
    // 发送验证码
    async onSendSms() {
      // 1.校验手机号
      // vant form 默认校验表单中的全部项
      // 官方文档：可通过validate支持传入name来验证单个或部分表单项，返回值为 Promise
      try {
        const mobSms = await this.$refs.loginForm.validate("mobile");
        // console.log("手机号校验通过");
        // 2.手机号验证通过，显示倒计时
        this.isCountDown = true;
      } catch (err) {
        console.log("发送失败", err);
      }
      // 3.请求发送验证码
      try {
        const res = await sendSmsAPI(this.user.mobile);
        // console.log(res.status);
        // console.log('验证码发送成功');
        this.$toast('验证码发送成功')
      } catch(err) {
        // 发送失败，关闭验证码倒计时
        this.isCountDown = false;
        if(err.response.status === 429) {
          // console.log("用户操作频繁");
          this.$toast('用户操作频繁')
        }
        else {
          // console.log('手机号不正确');
          this.$toast('手机号不正确');
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 51px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    .cotun-down-font {
      font-size: 18px;
    }
  }

  .login-btn-wrap {
    margin: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>