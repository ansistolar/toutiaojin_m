<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-show="isEditHistory">
        <span @click="$emit('clearSearchHistory')">全部删除</span>
        &nbsp;&nbsp;
        <span  @click="isEditHistory = false">完成</span>
      </span>
      <van-icon v-show="!isEditHistory" name="delete-o" @click="isEditHistory = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="searchOrDel(item,index)"
    >
      <van-icon v-show="isEditHistory" name="clear" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "searchHistory",
  props: {
    // Props 数据
    //  Props是受父组件数据影响的
    //    如果是普通数据（数字、字符串、布尔值）绝对不能修改
    //    即便修改了也不会传导给父组件
    //
    //  如果是引用类型数据（数组、对象）
    //    1.可以修改，例如 [].push(xxx)，对象.xxx = xxx
    //    2。不能重新赋值，xxx = []
    searchHistoryList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isEditHistory: false,
    };
  },
  methods:{
    // 点击搜索历史执行
    searchOrDel(item,index){
      // 通过 isEditHistory 判断进行什么操作 search || delete
      console.log('搜索历史列表',this.searchHistoryList);
      if(this.isEditHistory) {
        // 进行 删除 操作
        this.searchHistoryList.splice(index,1);
      }
      else {
        this.$emit('historySearch',item);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search-history {
  .van-icon {
    // font-size: 45px;
    display: block;
    font-size: 36px;
    margin-top: 8px;
    margin-left: 86%;
    width: 45px;
    height: 45px;
  }
}
</style>