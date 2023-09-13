<!----------------------------------
****--@name     添加备注
****--@role     ${*}
****--@date     2023/2/26
****--@author   lm
----------------------------------->
<template>
  <div>
    <el-form
      ref="formInline"
      :model="formInline"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名:">
            <span>{{ operailityData.useUserNikName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">
            <span>{{ operailityData.userMobile }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-input
          v-model="formInline.remark"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          确认
        </el-button>
        <el-button @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from './api.js'
export default {
  props: ['operailityData', 'setTableData'],
  data () {
    return {
      api,
      formInline: {
        remark: ''
      }
    }
  },
  created () {
    this.formInline.remark = this.operailityData.remark
  },
  methods: {
    onSubmit () {
      let opt = {
        ajaxSuccess: (res) => {
          if (res.code === 0) {
            this.$message({ message: '添加成功', type: 'success'})
            this.setTableData()
            this.$emit('cancel', 'add')
          }
        },
        ajaxParams: {
          url: api.modifyRemark.path,
          method: 'put',
          jsonString: true,
          data: {
            id: this.operailityData.id,
            remark: this.formInline.remark
          }
        }
      }
      this.ajax(opt)
    },
    // 关闭
    cancel () {
      this.$emit('cancel', 'add')
    }
  }
}
</script>
