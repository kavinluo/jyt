<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" label-width="80px">
      <el-form-item>
        <span>选择上传文件</span>
        <el-upload
          class="upload-demo"
          action="/api/tkmanage/examTmDetail/importTmDetail"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :headers="headers"
          :data="updata"
        >
          <el-input style="width:150px;" placeholder="选择上传文件"></el-input>
          <span>未选择任何文件</span>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formValidate.resource">
          <el-radio label="不重复导入">不重复导入</el-radio>
          <el-radio label="重复导入">重复导入</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['currentTreeData', 'setTableData'],
  data () {
    return {
      headers: '',
      updata: { treeId: this.currentTreeData.id, treePath: this.currentTreeData.path},
      formValidate: {
        resource: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 设置请求头部
      this.headers = {
        'Token': this.$util.getCookie('Token')
      }
    },
    onSubmit () {
      // let opt = {
      //   ajaxSuccess: res => {
      //     if (res.code === 0) {
      //       this.$message({ message: '导入成功', type: 'success'})
      //       this.$emit('cancel', 'file')
      //       this.setTableData()
      //     }
      //   },
      //   ajaxParams: {
      //     url: '/tkmanage/examTmDetail/importTmDetail',
      //     method: 'post',
      //     data: {
      //       treeId: this.currentTreeData.id,
      //       treePath: this.currentTreeData.path
      //     }
      //   }
      // }
      // this.ajax(opt)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleAvatarSuccess (file) {
      if (file.code === 0) {
        this.$message({ message: '导入成功', type: 'success'})
        this.$emit('cancel', 'file')
        this.setTableData()
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>
<style scoped>
.upload-demo {
  display: inline;
}
</style>
