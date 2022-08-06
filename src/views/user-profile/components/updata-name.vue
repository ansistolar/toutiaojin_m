<template>
  <div class="updateName-container">
    <!-- 这是编辑昵称的顶部 -->
    <van-nav-bar
      placeholder
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('cancelEdit')"
      @click-right="123"
    />

    <!-- 这是编辑昵称的表单 -->
    <div class="field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "updateNmae",
  data() {
    return {
      localName: this.name,
    };
  },
  props:{
    name:{
        type:String,
        // default:'',
    }
  },
};
</script>

<style lang="less" scoped>
.updateName-container {
    .field-wrap {
        padding: 20px 10px;
    }
}
</style>