<template>
  <div>
    <el-form ref="numberValidateForm" :model="numberValidateForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户昵称:" prop="nickname">
        <el-input v-model="numberValidateForm.nickname" autocomplete="off" style="width:200px" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="numberValidateForm.password" autocomplete="off" style="width:200px" placeholder="请输入用户密码" />
      </el-form-item>
      <el-form-item label="用户账号:" prop="username">
        <el-input v-model="numberValidateForm.username" autocomplete="off" style="width:200px" placeholder="请输入用户账号" />
      </el-form-item>
      <el-form-item label="注册手机号:" prop="mobile">
        <el-input v-model="numberValidateForm.mobile" autocomplete="off" style="width:200px" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="分类标识:" prop="deptId">
        <el-select v-model="numberValidateForm.deptId" placeholder="请选择分类:">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限划分:" prop="region">
        <el-select v-model="numberValidateForm.region" placeholder="请选择:">
          <el-option label="水平测试" value="shanghai" />
          <el-option label="执业医师考试" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="submitForms('numberValidateForm')">
          提交
        </el-button>
        <el-button @click="resetForm('numberValidateForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
let Util = null
import api from './api'
export default {
  name: 'UserAdd',
  props: {
    setTableData: { type: Function, default: null }
  },
  data () {
    return {
      numberValidateForm: {
        username: '',
        mobile: '',
        nickname: '',
        password: '',
        deptId: ''
      },
      api,
      treeData: [],
      unSelectUser: [],
      initUser: [],
      treeOptions: [],
      options: [],
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.deptList.path,
          method: api.deptList.method,
          params: {}
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Util = this.$util
      // ajax请求参数设置
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize
        }
      }
      this.setOptionData()
    },
    // 初始化加载列表数据
    setOptionData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      this.options = data.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    },
    getSuccess (res) {
      for (let k in this.numberValidateForm) {
        this.numberValidateForm[k] = res.data[k]
      }
    },
    submitForms () {
      let opt = {
        ajaxSuccess: 'submitSuccess',
        ajaxParams: {
          url: api.add.path,
          method: 'post',
          jsonString: true,
          data: this.numberValidateForm
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
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      return myData
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped></style>
