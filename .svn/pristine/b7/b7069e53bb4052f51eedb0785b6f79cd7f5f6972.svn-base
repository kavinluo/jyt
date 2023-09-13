<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" label-width="130px">
      <el-form-item label="授权码输入方式：">
        <el-select v-model="selectCode" placeholder="请选择授权码数量">
          <el-option label="选择授权码数量" value="choose"></el-option>
          <el-option label="输入授权码数量" value="input"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授权码数量:" v-if="selectCode === 'choose'">
        <el-select v-model="formValidate.num" placeholder="请选择授权码数量">
          <el-option label="20" value="20"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="100" value="100"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授权码数量:"  v-if="selectCode === 'input'">
        <el-input v-model="formValidate.num" style="width:200px;"></el-input>
        <p style="font-size:12px;color:red;">提示&nbsp;:&nbsp;一次性最多生成100个授权码</p>
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="onSubmit">立即创建</el-button>
        <el-button class="blueBtn" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
let Util = null
import api from '../../jiankao/api'
export default {
  props: ['setTableData'],
  data () {
    return {
      formValidate: {
        num: ''
      },
      selectCode: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Util = this.$util
    },
    onSubmit () {
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$emit('cancel', 'add')
            this.setTableData()
          }
        },
        ajaxParams: {
          url: api.addCode.path,
          method: 'post',
          data: this.formValidate
        }
      }
      this.ajax(opt)
    },
    cancel () {
      this.$emit('cancel', 'add')
    }
  }
}
</script>
<style scoped>

</style>
