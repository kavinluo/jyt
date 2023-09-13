<template>
  <div>
    <el-form ref="formInline" :model="formInline" label-width="120px" class="demo-ruleForm">
      <el-form-item label="机构名称:" prop="name">
        <el-input v-model="formInline.name" autocomplete="off" style="width:200px" placeholder="请输入机构名称" />
      </el-form-item>
      <el-form-item label="注册手机号" prop="contactMobile">
        <el-input v-model="formInline.contactMobile" autocomplete="off" style="width:200px" placeholder="请输入注册手机号" />
      </el-form-item>
      <el-form-item label="联系人:" prop="contactName">
        <el-input v-model="formInline.contactName" autocomplete="off" style="width:200px" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-select v-model="formInline.status" placeholder="请选择状态">
          <el-option
            label="启用"
            value="0"
          />
          <el-option
            label="禁用"
            value="1"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="过期时间：" prop='expireTime'>
        <el-date-picker
          v-model="formInline.expireTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="创建时间："
        prop="createTime"
      >
        <span v-if="type == 'edit'">{{ getNowFormatDate(formInline.createTime ) }}</span>
        <span v-if="type != 'edit'">{{ getNowFormatDate() }}</span>
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="submitForms('formInline')">
          提交
        </el-button>
        <el-button @click="resetForm('formInline')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// let Util = null
import api from './api'
export default {
  props: {
    operailityData: { type: Object, default: null },
    type: { type: String, default: null },
    setTableData: { type: Function, default: null }
  },
  data () {
    return {
      api,
      formInline: {
        name: '',
        contactMobile: '',
        contactName: '',
        status: '',
        expireTime: '',
        packageId: 0,
        id: 1
      },
      options: [
        {
          value: 0,
          label: '启用'
        },
        {
          value: 1,
          label: '禁用'
        }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // Util = this.$util
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
      for (let k in this.formInline) {
        this.formInline[k] = res.data[k]
        console.log(res.data[k])
      }
      if (res.data.status !== undefined) { this.formInline.status = String(res.data.status)}
      console.log(res.data)
    },
    submitForms () {
      let opt = {
        ajaxSuccess: 'submitSuccess',
        ajaxParams: {
          url: this.type === 'edit' ? api.updateList.path : api.addList.path,
          method: this.type === 'edit' ? 'put' : 'post',
          jsonString: true,
          data: this.formInline
        }
      }
      this.ajax(opt)
    },
    submitSuccess (res) {
      if (res.code === 0) {
        this.$message({ message: '添加成功', type: 'success'})
        this.$emit('cancel', 'add')
        this.setTableData()
      }
    },
    getNowFormatDate () {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let hh = date.getHours() // 时
      let mm = date.getMinutes()
      let currentdate = year + seperator1 + month + seperator1 + strDate + '   '
      if (hh < 10) {
        currentdate += '0'
      }

      currentdate += hh + ':'
      if (mm < 10) { currentdate += '0' }
      currentdate += mm
      return currentdate
    }
  }
}
</script>
<style scoped>

</style>
