<template>
  <div class="comment-item">
    <!-- 带数据绑定的头像 -->
    <div class="comment-avatar">
      <img
        :src="comment.avatar"
        alt="Avatar"
      >
    </div>
    <!-- 评论信息 -->
    <div class="comment-content">
      <!-- 评论人姓名 -->
      <h3 class="comment-author">
        {{ comment.author }}
      </h3>
      <!-- 评论文本内容 -->
      <p class="comment-text">
        {{ comment.text }}
      </p>
      <div class="comment-info">
        <span class="comment-reply-btn"  @click="showReplies = !showReplies">
          {{ comment.repliesCount }}
          {{ showReplies ? '收起' : '回复' }}>
        </span>
        <!-- 带数据绑定的评论时间 -->
        <span class="comment-time">{{ comment.time }}</span>
        <!-- 带数据绑定的评论地点 -->
        <span class="comment-location">{{ comment.location }}</span>
        <!-- 带数据绑定的点赞数量 -->
        <span class="comment-likes"> <i class="el-icon-thumb"></i>{{ comment.likesCount }}</span>
        <span style="cursor: pointer;font-size: 15px;" @click="cancel"><i class="el-icon-close"></i></span>
        <!-- 回复列表 -->
        <div
          v-if="showReplies"
          class="comment-replies-list"
        >
          <CommentItem
            v-for="(reply, index) in comment.replies"
            :key="index"
            :comment="reply"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: Object
  },
  data() {
    return {
      showReplies: false
    }
  },
  methods: {
    cancel () {
      console.log('删除')
    }
  }
}
</script>

<!-- 添加一些CSS样式以调整评论项的布局和外观 -->
<style scoped>
.comment-item {
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.comment-avatar {
  margin-right: 10px;
  width: 50px;
  height: 50px;
}
.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.comment-content {
  flex-grow: 1;
}
.comment-author {
  font-size: 16px;
  margin-bottom: 5px;
}
.comment-text {
  margin-bottom: 10px;
}
.comment-info {
  /* display: flex;
  flex-direction: row;
  align-items: center; */
}
.comment-info > * {
  margin-right: 10px;
}
.comment-time::before {
  font-family: 'Font Awesome 5 Free';
  margin-right: 5px;
}
.comment-location::before {
  font-family: 'Font Awesome 5 Free';
  margin-right: 5px;
}
.comment-likes::before {
  font-family: 'Font Awesome 5 Free';
  margin-right: 5px;
}
.comment-replies::before {
  font-family: 'Font Awesome 5 Free';
  margin-right: 5px;
}
.comment-reply-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.comment-replies-list {
  margin-top: 10px;
}
</style>
