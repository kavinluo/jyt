<template>
  <div class="comment-list">
    <CommentItem
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
    />
  </div>
</template>

<script>
import CommentItem from '@/components/common/comment.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    comments: Array
  }
}
</script>

<!-- 添加一些CSS样式以调整评论列表的布局和外观 -->
<style scoped>
.comment-list {
  height:300px;
  border: 1px solid #ccc;
  margin: 20px 0 0 85px;
  overflow-y:scroll;
}
</style>
