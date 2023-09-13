<template>
  <div>
    <div class="remove">{{title}}</div>
    <el-row>
      <el-col :span="10" :offset="14">
        <a :href="url">
          <el-button class="sureBtn" @click="cancel">确定</el-button>
        </a>
        <el-button class="but-col cancelBtn" @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: ['type', 'url', 'messTitle'],
    name: 'derive',
    created () {
      let todoType = {
        word: '导出到Word',
        excel: '导出到excel',
        student: '导出考生时间表',
        teacher: '导出监考老师时间表',
        sp: '导出sp时间表',
        wait: '导出学生候考时间表',
      }
      if (!this.messTitle) {
        this.title = `确定要${todoType[this.type]}吗？`
      } else {
        this.title = this.messTitle
      }
    },
    methods: {
      cancel () {
        this.$emit('cancel', this.type)
      },
    },
  }

</script>
