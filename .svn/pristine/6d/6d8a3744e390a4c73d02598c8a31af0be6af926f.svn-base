<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" label-width="90px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="发布人:">
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="点赞数量:">
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="评论数量:">
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="发布时间:">
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="可修改权值:">
            <el-input style="width:145px;" placeholder="请输入权值" v-model="formValidate.weight"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button class="blueBtn" @click="weight">设置权值</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="权值总合:">
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="发布内容:">
        <editor-bar
          :is-clear="isClear"
          :id-edit="editorType"
        />
      </el-form-item>
      <div>
        <el-row>
          <el-col align="left" style="width:70px;float:left; margin: 10px 0 0 20px;font-size: 14px;font-weight: 600;">
            <span>评论内容:</span>
          </el-col>
          <el-col align="right"  style="width:70px;float:right;margin:3px 0 0 15px;">
            <el-button class="blueBtn">
              查询
            </el-button>
          </el-col>
          <el-col :span="3" style="float:right;">
            <el-input placeholder="请输入关键性文字" />
          </el-col>
        </el-row>
        <CommentList :comments="comments" />
      </div>
    </el-form>
  </div>
</template>

<script>
import CommentList from './commentList.vue'
import editorBar from '@/components/tiku/jichutiku/editor/editoritem.vue'
export default {
  name: 'App',
  components: {
    CommentList,
    editorBar
  },
  data() {
    return {
      isClear: false,
      editorType: 'edit',
      formValidate: {
        weight: ''
      },
      comments: [
        {
          author: '小李同学',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          text: '好好好',
          time: '3小时前',
          location: '北京',
          likesCount: 10,
          repliesCount: 2,
          replies: [
            {
              author: 'Charlie',
              avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
              text: 'Thanks Alice!',
              time: '2021-01-01 12:05 PM',
              location: 'San Francisco, CA',
              likesCount: 3,
              repliesCount: 0
            },
            {
              author: 'Dave',
              avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
              text: 'Agreed!',
              time: '2021-01-01 12:10 PM',
              location: 'New York, NY',
              likesCount: 5,
              repliesCount: 1,
              replies: [
                {
                  author: 'Eve',
                  avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                  text: 'Thanks Dave!',
                  time: '2021-01-01 12:15 PM',
                  location: 'New York, NY',
                  likesCount: 2,
                  repliesCount: 0
                }
              ]
            }
          ]
        },
        {
          author: 'Bob',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          text: 'Great post!',
          time: '2021-01-02 1:30 PM',
          location: 'New York, NY',
          likesCount: 5,
          repliesCount: 1,
          replies: [
            {
              author: 'Frank',
              avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
              text: 'Thanks Bob!',
              time: '2021-01-02 1:35 PM',
              location: 'New York, NY',
              likesCount: 1,
              repliesCount: 0
            }
          ]
        }
        // 添加更多评论
      ]
    }
  },
  methods: {
    weight () {
      console.log('设置权值')
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
