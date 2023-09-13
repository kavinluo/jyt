<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" label-width="100px">
      <el-form-item label="选择同步方式">
        <el-select v-model="region" placeholder="请选择同步方式">
          <el-option label="导入试题加密包" value="daoru"></el-option>
          <el-option label="在线同步试题" value="zaixian"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择上传文件" v-if="region === 'daoru'">
        <el-upload
          class="upload-demo"
          action="/api/tkmanage/examTmDetail/importSpcsTmFile"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :headers="headers"
          :data="updata"
        >
          <el-input style="width:150px;" placeholder="选择上传文件"></el-input>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="region === 'zaixian'">
        <el-radio-group v-model="formValidate.type">
          <el-radio label="BK">2023年中医师岗位胜任力第二阶梯考核</el-radio>
          <el-radio label="ZK">2023年中医师岗位胜任力第一阶梯考核</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="onSubmit" v-if="region === 'zaixian'">
          立即创建
        </el-button>
        <el-button class="blueBtn" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['currentTreeData'],
  data () {
    return {
      region: '',
      updata: { treeId: this.currentTreeData.id, treePath: this.currentTreeData.path},
      headers: '',
      formValidate: {
        type: '',
        treeId: this.currentTreeData.id,
        treePath: this.currentTreeData.path
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
      if (this.region === 'zaixian') {
        let opt = {
          ajaxSuccess: res => {
            if (res.code === 0) {
              this.$message({ message: '同步成功', type: 'success'})
              this.$emit('cancel', 'sync')
              this.setTableData()
            }
          },
          ajaxParams: {
            url: '/tkmanage/examTmDetail/importSpcsTm',
            method: 'post',
            data: {
              type: this.formValidate.type,
              treeId: this.currentTreeData.id,
              treePath: this.currentTreeData.path
            }
          }
        }
        this.ajax(opt)
      }
    },
    cancel () {
      this.$emit('cancel', 'sync')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleAvatarSuccess (file) {
      if (file.code === 0) {
        this.$message({ message: '导入成功', type: 'success'})
        this.$emit('cancel', 'sync')
        this.setTableData()
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>
<style scoped>

</style>
