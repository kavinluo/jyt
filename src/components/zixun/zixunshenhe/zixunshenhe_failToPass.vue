<template>
  <div>
    <h2>不通过</h2>
    <el-form label-width="50px" :model="formValidate">
      <el-form-item>
        <el-input
          v-model="formValidate.auditReason"
          type="textarea"
          autosize
          placeholder="请输入不通过原因"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from './api'
export default {
  props: ['operailityData', 'setTableData'],
  data () {
    return {
      api,
      formValidate: {
        auditReason: '',
        flag: false
      }
    }
  },
  methods: {
    onSubmit () {
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '已不通过',
              type: 'success'
            })
            this.$emit('cancel', 'pass')
            this.$emit('concentCancel', 'pass')
            this.setTableData()
          }
        },
        ajaxParams: {
          url: api.auditPut.path + this.operailityData.id,
          method: 'put',
          jsonString: true,
          data: this.formValidate
        }
      }
      this.ajax(opt)
    },
    cancel () {
      this.$emit('cancel', 'pass')
    }
  }
}
</script>
<style scoped>

</style>
