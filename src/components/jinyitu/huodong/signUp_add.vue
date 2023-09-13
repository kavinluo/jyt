<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="14">
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="formValidate.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="margin: 5px 0 0 60px;">
          <el-button class="blueBtn" @click="searchValue">搜索</el-button>
        </el-col>
      </el-row>
      <el-form-item label="用户名：">
        <span v-if="formValidate.username === ''">-----</span>
        <span else>{{ formValidate.username }}</span>
      </el-form-item>
      <el-form-item label="用户身份：">
        <span v-if="formValidate.vipStatus === ''">-----</span>
        <span v-else-if="formValidate.vipStatus === 0">会员</span>
        <span v-else-if="formValidate.vipStatus === 1">非会员</span>
      </el-form-item>
      <el-form-item label="验证实名：">
        <span v-if="formValidate.hasCertification === ''">-----</span>
        <span v-else-if="formValidate.hasCertification === '0'">非实名</span>
        <span v-else-if="formValidate.hasCertification === '1'">已实名</span>
      </el-form-item>
      <el-form-item label="机构名称：">
        <span v-if="formValidate.tenantName === ''">-----</span>
        <span else>{{ formValidate.tenantName }}</span>
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="add(formValidate)">新增</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
let Util = null
import api from './api'
export default {
  props: ['setTableData'],
  data () {
    return {
      api,
      formValidate: {
        mobile: '',
        username: '',
        hasCertification: '',
        vipStatus: '',
        tenantName: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' }
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
    },
    // 初始化加载列表数据
    setTableDatas () {
      this.ajax({
        ajaxSuccess: (res) => {
          for (let k in this.formValidate) {
            this.formValidate[k] = res.data[k]
          }
          console.log(res.data, this.formValidate, 'this.formValidate')
        },
        ajaxParams: {
          url: api.simPle.path,
          method: api.simPle.method,
          params: {
            mobile: this.formValidate.mobile
          }
        }
      })
    },
    searchValue () {
      this.setTableDatas()
    },
    add () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          let opt = {
            ajaxSuccess: (res) => {
              if (res.code === 0) {
                this.$message({ message: '添加成功', type: 'success'})
                this.$emit('cancel', 'add')
                this.setTableData()
              }
            },
            ajaxParams: {
              url: api.addUser.path,
              method: 'post',
              jsonString: true,
              data: this.formValidate
            }
          }
          this.ajax(opt)
        } else {
          return false
        }
      })
    },
    // 关闭
    cancel () {
      this.$emit('cancel', 'add')
    }
  }
}
</script>
<style scoped>

</style>
