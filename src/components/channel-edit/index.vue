<template>
  <div class="channel-edit">
    <div class="my-channel">
      <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <div class="edit-btn-wrap" @click="isEditFn">
          <van-button
            v-if="isEdit"
            type="danger"
            plain
            round
            size="mini"
            class="edit-btn"
          >
            完成
          </van-button>
          <van-button
            v-else
            type="danger"
            plain
            round
            size="mini"
            class="edit-btn"
          >
            编辑
          </van-button>
        </div>
      </van-cell>
      <!-- 我的频道宫格 start -->
      <van-grid :gutter="11.5" clickable :border="false">
        <van-grid-item
          class="grid-item"
          v-for="(item, index) in userChannel"
          :key="index"
          @click="myChannelFn(item, index)"
        >
          <div slot="text" class="channel-text">
            <span :class="{ active: index == isActive }">{{ item.name }}</span>
          </div>
          <van-icon
            v-show="isEdit && !fiexChannel.includes(item.id)"
            slot="icon"
            name="clear"
            class="clear-icon"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <div class="all-channel">
      <van-cell :border="false">
        <div slot="title" class="title-text">推荐频道</div>
      </van-cell>
      <!-- 我的频道宫格 end -->
      <!-- 推荐频道 start -->
      <van-grid :gutter="11.5" clickable :border="false">
        <van-grid-item
          class="grid-item"
          v-for="(item, index) in recommendChannel"
          :key="index"
          @click="addChannelFn(item)"
        >
          <span slot="text">
            <i class="iconfont icon-add1"></i>
            <span class="slot-text">{{ item.name }}</span>
          </span>
        </van-grid-item>
      </van-grid>
      <!-- 推荐频道 end -->
    </div>
  </div>
</template>

<script>
// 导入 store
import store from "@/store/index";

// 导入 将数据保存为本地数据的 js文件
import { setItem } from "@/utils/localStorage";

export default {
  name: "channelEdit",
  data() {
    return {
      // 是否处于编辑标签状态
      isEdit: false,
      // 固定频道不允许删除
      fiexChannel: [0, 17],
    };
  },
  props: {
    allChannel: {
      // type: Array,
    },
    userChannel: {
      // type: Array,
    },
    isActive: {
      type: Number,
      required: true,
    },
  },
  computed: {
    recommendChannel() {
      const rcommChannel = [];
      this.allChannel.forEach((AllChannelItem) => {
        // 在所有我的频道中查找有没有频道的 id 等于 AllChannelItem
        const ret = this.userChannel.find((userChannelItem) => {
          return AllChannelItem.id == userChannelItem.id;
        });
        // 如果没有就添加到 rcommChannel 中去
        if (!ret) {
          rcommChannel.push(AllChannelItem);
        }
      });
      // 最后将结果返回出去
      return rcommChannel;
    },
  },
  methods: {
    // 点击频道向我的频道中添加数据
    addChannelFn(item) {
      // console.log(item);
      try {
        this.userChannel.push(item);
        // 调用 自己写的 vuex 改变 用户频道数据
        console.log(
          "点击增加频道竟然会自动增加到vuex,我不理解T_T",
          "懂了，复杂数据传值时传的时他们的地址，而非数据",
          this.$store.state.xiaojin.data.jinChannel
        );
        // 接下来时添加频道业务的数据持久化操作
        // if (this.$store.state.user) {
        // console.log('有token');
        // // 已登录，数据存储到线上
        // await addUserChannel([
        //   {
        //     id: channel.id, // 频道 id
        //     seq: this.userChannels.length, // 频道的 序号
        //   },
        // ]);
        // }else {
        // 未登录，将数据存储到本地
        setItem("localChannel", this.userChannel);
        // }
      } catch (error) {
        console.log("添加频道失败", error);
      }
    },
    // 更改编辑状态
    isEditFn() {
      this.isEdit = !this.isEdit;
    },
    // 编辑我的频道
    myChannelFn(item, index) {
      if (this.isEdit) {
        // '推荐' 频道 不可删除
        if (this.fiexChannel.includes(index)) {
          return;
        }
        // 接下来是删除频道业务的数据持久化处理
        try {
          // 编辑状态：删除频道
          this.userChannel.splice(index, 1);
          // if (this.$store.state.data.user) {
          //   // 已登录，将数据存储到线上
          //   await deleteUserChannel(channel.id);
          // } else {
            // 未登录，将数据存储到本地
            setItem("localChannel", this.userChannel);
          // }
        } catch (error) {}

        // 注意，当我们删除频道时，active 的值是不变的，会导致高亮前移或后移
        if (index === this.isActive) {
          // 当删除当前频道时，active跳到0
          this.$emit("change-active-index", 0);
        } else if (index < this.isActive) {
          // 当删除频道在当前频道前时，active - 1
          this.$emit("change-active-index", this.isActive - 1);
        } else {
          // 当删除频道在当前频道前时，active 不变
        }
      } else {
        // 非编辑状态：跳转到该频道
        // 将 点击的 index 传给父组件并触发父组件的行为
        this.$emit("change-active-index", index);
        // 关闭弹窗
        this.$emit("closePopup");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 87px;

  .title-text {
    font-size: 32px;
    line-height: 36px;
    color: #333;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .slot-text,
      .channel-text {
        color: #222;
        font-size: 28px;
      }
    }
  }

  .icon-add1 {
    font-size: 26px;
    padding-right: 3px;
  }

  // 我的频道特有
  .my-channel {
    .edit-btn-wrap {
      // margin-right: 0;
      padding-left: 210px;
      // margin-top: -5px;
      position: fixed;
      top: 120px;
      width: 123px;
      height: 69px;
      .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
      }
    }
    .clear-icon {
      font-size: 19px;
      position: absolute;
      top: -32px;
      right: -88px;
      color: #cacaca;
      z-index: 2;
    }
  }
  .active {
    color: #4397fb;
  }
}
</style>