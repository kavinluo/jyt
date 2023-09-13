<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" label-width="80px">
      <el-form-item label="排考名称">
        <el-input v-model="formValidate.arrangeName" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from './api.js'
export default {
  props: ['type', 'setTableData', 'operailityData'],
  data () {
    return {
      api,
      formValidate: {
        arrangeName: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.type === 'edit') {
        let opt = {
          ajaxSuccess: 'getSuccess',
          ajaxParams: {
            url: api.getList.path + this.operailityData.id,
            method: 'get'
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
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: this.type === 'add' ? '添加成功' : '修改成功',
              type: 'success'
            })
            this.$emit('cancel', 'add')
            this.setTableData()
          }
        },
        ajaxParams: {
          url: this.type === 'add' ? api.addList.path : api.editList.path + this.operailityData.id,
          method: this.type === 'add' ? 'post' : 'put',
          jsonString: true,
          data: this.formValidate
        }
      }
      this.ajax(opt)
    }
  }
}
</script>
