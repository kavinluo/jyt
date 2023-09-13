<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" label-width="100px">
      <el-form-item label="部门名称：">
        <el-input v-model="formValidate.name" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序：">
        <el-input v-model="formValidate.sort" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="formValidate.status" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from './api.js'
export default {
  props: ['operailityData', 'operailityType'],
  data () {
    return {
      api,
      formValidate: {
        name: '',
        sort: 1,
        status: 0,
        parentId: this.operailityData.parentId
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.operailityType === 'edit') {
        let opt = {
          ajaxSuccess: 'getSuccess',
          ajaxParams: {
            url: api.getDept.path,
            method: 'get',
            params: {
              id: this.operailityData.id
            }
          }
        }
        this.ajax(opt)
      }
    },
    getSuccess (res) {
      for (let k in this.formValidate) {
        this.formValidate[k] = res.data[k]
      }
    },
    onSubmit () {
      if (this.operailityType === 'edit') {
        this.formValidate.id = this.operailityData.id
      }
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            let mess = this.operailityType === 'edit' ? '修改成功' : '添加成功'
            this.$emit('add', this.operailityType, mess)
          }
        },
        ajaxParams: {
          url: this.operailityType === 'edit' ? api.updateDept.path : api.add.path,
          method: this.operailityType === 'edit' ? 'put' : 'post',
          jsonString: true,
          data: this.formValidate
        }
      }
      this.ajax(opt)
    },
    cancel () {
      this.$emit('cancel', this.operailityType)
    }
  }
}
</script>
<style scoped>

</style>
