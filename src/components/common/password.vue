<!--
****--修改密码(password)
****--@date     2017/7/7
****--@author   zyc<332533011@qq.com
-->
<template>
  <div style="margin: 0 20px;">
    <el-form
      ref="ruleForm2"
      :model="ruleForm2"
      :rules="rules2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="ruleForm2.password"
          type="password"
          auto-complete="off"
          placeholder="输入新密码"
        />
      </el-form-item>
      <el-form-item>
        <load-btn
          :btn-data="loadBtn"
          @listenSubEvent="editPwd"
        />
        <el-button @click="resetForm('ruleForm2')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
let Util = null
export default {
  props: {
    operailityData: { type: Object, default: null }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      // let rules = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,20}$/
      // if (value === '') {
      //   callback(new Error('请输入密码'))
      // } else {
      //   if(!rules.test(this.ruleForm2.password)) {
      //     callback(new Error('需要长度为6-20位包含数字、字母及特殊字符的组合!'))
      //     return
      //   }
      // }
      callback()

    }
    return {
      // 保存按钮基本信息
      loadBtn: {
        title: '提交',
        callParEvent: 'listenSubEvent'
      },

      // form bind的数据
      ruleForm2: {
        password: '',
        id: this.operailityData.id
      },

      // form 验证规则
      rules2: {
        password: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }]
      },

      // 修改密码后台提交参数设置
      editMessTitle: {
        type: 'password',
        successTitle: '修改成功!',
        errorTitle: '修改失败!',
        ajaxSuccess: 'submitSuccess',
        ajaxError: 'ajaxError',
        ajaxParams: {
          url: '/passport/user/update-password',
          method: 'put',
          jsonString: true,
          data: {}
        }
      }
    }
  },
  created () {
    Util = this.$util
    console.log(this.operailityData)
  },
  methods: {

    /**
       * 提交密码
       * @param isLoadingFun {function}  提交中的回调用于删除提交按钮loading状态
       */
    editPwd (isLoadingFun) {
      let isSubmit = this.submitForm('ruleForm2')
      if (isSubmit) {
        if (!isLoadingFun) {isLoadingFun = function () {}}
        isLoadingFun(true)
        this.editMessTitle.ajaxParams.data = this.getFormData(this.ruleForm2)
        this.ajax(this.editMessTitle, isLoadingFun)
      }
    },

    /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
    submitForm (formName) {
      let flag = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true
        }
      })
      return flag
    },
    submitSuccess (res) {
      if (res.code === 0) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$emit('cancel', 'cancel')
      }
    },
    // 重置密码
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      return myData
    }
  }
}

</script>
