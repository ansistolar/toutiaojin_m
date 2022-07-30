<template>
  <div class="article-item">
    <van-cell-group>
      <van-cell>
        <div slot="title" class="van-multi-ellipsis--l2 title">
          {{ articleItem.title }}
        </div>
        <div
          slot="default"
          class="single-img"
          v-if="articleItem.cover.type === 1"
        >
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div slot="label">
          <!-- 假如有三张图片 -->
          <div class="images-wrap" v-if="articleItem.cover.type === 3">
            <div
              v-for="(img, index) in articleItem.cover.images"
              :key="index"
              class="img-item"
            >
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
          </div>
          <div class="label-info-wrap">
            <span>{{ articleItem.aut_name }}</span>
            <span>{{ articleItem.comm_count }}评论</span>
            <span>{{ articleItem.pubdate | relativeTime }}</span>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "articleItem",
  props: {
    articleItem: {
      type: Object,
      require: true,
    },
  },
  created() {
    console.log(this.articleItem.cover);
  },
};
</script>

<style lang="less" scoped>
.article-item {
  .van-cell {
    padding: 30px 23px;
  }
  .title {
    font-family: "ArialMT";
    font-size: 32px;
    color: "#3a3a3a";
  }
  .van-cell__value {
    flex: unset;
    padding-left: 15px;
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .images-wrap {
    display: flex;
    padding: 23px 0;
    // justify-content: center;
    // align-content: center;
    // align-items: center;
    .img-item {
      flex: 1;
      width: 232px;
      height: 146px;
      &:nth-child(2) {
        // height: 332px;
        padding: 0 4px;
      }
    }
  }
}
</style>