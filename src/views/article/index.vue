<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="这是title"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div
        v-else-if="articleDetails.title"
        class="article-detail markdown-body"
      >
        <!-- 文章标题 -->
        <h1 class="article-tit le">{{ articleDetails.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetails.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ articleDetails.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ articleDetails.pubdate | relativeTime }}
          </div>
          <!-- 关注模块 start -->
          <!-- 					<van-button :loading="isFollowing" class="follow-btn" type="info" color="#3296fa" round size="small"
						icon="plus" v-show="!articleDetails.is_followed" @click="onFollow(articleDetails)">
						关注
					</van-button>
					<van-button :loading="isFollowing" v-show="articleDetails.is_followed" class="follow-btn" round
						size="small" @click="onFollow(articleDetails)">已关注</van-button> -->
          <!-- 模板中的 $event 是事件参数 -->
          <follow-btn
            :is_followed="articleDetails.is_followed"
            :aut_id="articleDetails.aut_id"
            @updata-is_followed="articleDetails.is_followed = $event"
          ></follow-btn>
          <!-- 关注模块 end -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="articleContentDOM"
          class="article-content"
          v-html="articleDetails.content"
        ></div>
        <van-divider>正文结束</van-divider>

		    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <!-- 收藏按钮 start -->
      <!-- <van-icon
        v-show="!isCollect"
        @click="starArticle(articleId)"
        color="#777"
        name="star-o"
      />
      <van-icon
        v-show="isCollect"
        @click="starArticle(articleId)"
        name="star"
        color="#ffe40f"
      /> -->
	  <!-- 将上面的封装为组件引入 -->
	  <article-collect :articleId="articleId"></article-collect>
      <!-- 收藏按钮 end -->
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
	
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleByID(articleId)"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>


  </div>
</template>

<script>
// 引入 vue 仓库
import store from "@/store/index.js";

// 引入接口
import { getArticleByIDAPI, addFollowAPI, delFollowAPI } from "@/api/index";

// 导入自定义的 收藏&取消收藏 API
// import { addCollectAPI, delCollectAPI } from "@/api/index.js";	// 封装到组件中了

// 导入 vant图片预览 组件
import { ImagePreview } from "vant";

// 导入封装的 关注&取消关注 按钮
import followBtn from "@/components/followBtn/index.vue";
// 导入封装的 收藏&取消收藏按钮
import articleCollect from "@/components/articleCollect/index.vue"

export default {
  name: "ArticleIndex",
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      articleDetails: {},
      // 是否显示加载页面
      isLoading: true,
      // 错误状态，用于判断 显示哪个状态页面
      errStatus: 0,
      // 关注按钮加载页面
      // isFollowing: false,
      // 是否已收藏该文章
    //   isCollect: false,	// 封装到组件中了
    };
  },
  components: {
    followBtn,
	articleCollect
  },
  methods: {
    // 获取文章详细信息业务
    async getArticleByID(articleId) {
      // 重置 loading 和 errStatus
      this.isLoading = true;
      this.errStatus = 0;
      try {
        const res = await getArticleByIDAPI(articleId);
        // 随机抛出一个错误 模拟请求失败，请稍后重试
        // if (Math.random() > 0.5) {
        // 	JSON.parse("asdfghjkl123456789");
        // }
        this.articleDetails = res.data.data;
        console.log("这是获取到的文章详情", this.articleDetails);

        // 获取文章主体 DOM 进行点击图片预览的操作
        // 数据驱动视图并不是立即的 所以需要设置 setTimeout
        setTimeout(() => {
          // console.log('加载完成获取文章主体Dom',this.$refs.articleContentDOM);
          this.ImagePreview();
        }, 0);
      } catch (error) {
        console.log("请求数据失败", error);
        if (error.response && error.response.status === 404) {
          this.errStatus = 404;
        }
      }
      // 无论数据请求成功还是失败都需要 关闭loading
      this.isLoading = false;
    },
    // 图片预览业务
    ImagePreview() {
      console.log("加载完成获取文章主体Dom", this.$refs.articleContentDOM);
      const images = []; // 用于存储页面图片的链接，以便 ImagePreview 组件使用
      // 得到所有的 img 节点
      const articleDOMs = this.$refs.articleContentDOM;
      const imgs = articleDOMs.querySelectorAll("img");
      // console.log("这是第一张图片的地址：", imgs[0].src); // 成功
      // 下面将此页面中的全部图片链接存入 images数组 中
      imgs.forEach((item, index) => {
        images.push(item.src);
        // 为每一个 img DOM 注册点击事件
        item.onclick = () => {
          ImagePreview({
            // 预览图片的数组
            images: images,
            // 图片的起始位置，点哪个从哪开始
            startPosition: index,
          });
        };
      });
      // console.log('这是经处理后得到的图片链接数组',images);
    },
    // 已封装到 followBtn 中
    // // 关注用户业务
    // async onFollow(articleDetails) {
    // 	this.isFollowing = true;
    // 	const that = this;
    // 	setTimeout(function() {
    // 		try {
    // 			if (articleDetails.is_followed) {
    // 				// 已关注该用户，点击 取消关注
    // 				// await delFollowAPI(articleDetails.aut_id)
    // 			} else {
    // 				// 未关注，点击关注
    // 				// await addFollowAPI(articleDetails.aut_id)
    // 			}
    // 			articleDetails.is_followed = !articleDetails.is_followed
    // 		} catch (error) {
    // 			if (error.response && error.response.status == 400) {
    // 				console.log('用户不能关注自己');
    // 			} else {
    // 				console.log("操作失败，请稍后重试", error);
    // 			}
    // 		}
    // 		that.isFollowing = false;
    // 	}, 1000);
    // },
	// 判断文章是否 已收藏 ！ 已封装到组件中
    // isCollected(articleId) {
    //   console.log("这是这篇文章的Id", articleId);
    //   console.log(
    //     "这时vuex中的用户已收藏的文章Id",
    //     this.$store.state.xiaojin.data.userCollectionId
    //   );
    //   console.log("这是可用的this", this);
    //   // console.log(typeof articleId)
    //   if (
    //     this.$store.state.xiaojin.data.userCollectionId.includes(
    //       parseInt(articleId)
    //     )
    //   ) {
    //     this.$toast("包含");
    //     this.isCollect = true;
    //   } else {
    //     this.$toast("不包含");
    //     this.isCollect = false;
    //   }
    // },
    // 点击收藏按钮	! 封装到组件中了
    // async starArticle(articleId) {
    //   try {
    //     // 先判断该文章是否已收藏
    //     if (this.isCollect) {
    //       // 取消收藏该文章
    //       await delCollectAPI(articleId);
    //     } else {
    //       // 收藏该文章
    //       await addCollectAPI(articleId);
    //     }
	// 	// 最后修改收藏按钮状态
    //     this.isCollect = !this.isCollect;
    //   } catch (error) {
    //     console.log("收藏&取消收藏失败", error);
    //   }
    // },
  },
  created() {
    // 根据文章 ID 获取文章详情
    this.getArticleByID(this.articleId);
    // 判断此文章是否已被收藏
    // this.isCollected(this.articleId);	// 封装到组件中了
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    .van-icon {
      font-size: 40px;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
