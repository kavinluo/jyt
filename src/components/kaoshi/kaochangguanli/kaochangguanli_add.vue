<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" :rules="rules" label-width="100px">
      <el-form-item label="考场名称:">
        <el-input v-model="formValidate.placeName" placeholder="请填写考场名称" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="考室名称:">
        <el-input v-model="formValidate.roomName" placeholder="请填写考室名称" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="考室容量:" prop="roomVolume">
        <el-input v-model="formValidate.roomVolume" placeholder="请填写考室容量" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="onSubmit">确定</el-button>
        <el-button class="blueBtn" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
let Util = null
import api from './api'
export default {
  props: ['setTableData', 'type', 'operailityData'],
  data () {
    // let newValValidate = (rule, value, callback) => {
    //   if (value <= /^\+?[1-9]\d*$/) {
    //     return callback(new Error('考室容量必须大于0'))
    //   }
    // }
    return {
      api,
      formValidate: {
        placeName: '',
        roomName: '',
        roomVolume: ''
      },
      rules: {
        roomVolume: [
          { required: true, message: '请填写考室容量', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Util = this.$util
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
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
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
              url: this.type === 'edit' ? api.editList.path + this.operailityData.id : api.addList.path,
              method: this.type === 'edit' ? 'put' : 'post',
              jsonString: true,
              data: this.getFormData(this.formValidate)
            }
          }
          this.ajax(opt)
        } else {
          return false
        }
      })
    },
    cancel () {
      this.$emit('cancel', 'add')
    },
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      return myData
    }
  }
}
</script>
<style scoped>

</style>
