<template>
  <div>
    <el-form
      ref="form"
      :model="formValite"
      label-width="80px"
    >
      <el-form-item label="会员时间">
        <el-date-picker
          v-model="formValite.vipEndTime"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="set">
          设置会员
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancellation">
          注销会员
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from '../user/api'
export default {
  props: {
    operailityData: { type: Object, default: null },
    setTableData: { type: Function, default: null }
  },
  data () {
    return {
      api,
      formValite: {
        vipEndTime: ''
      }
    }
  },
  methods: {
    set () {
      if (this.formValite.vipEndTime === '') {
        this.$message({
          message: '请选择会员期限',
          type: 'warning'
        })
        return
      }
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            this.$emit('cancels', false)
            this.setTableData()
          }
        },
        ajaxParams: {
          url: '/passport/vip/configVipStatus',
          method: 'post',
          data: {
            userId: this.operailityData.id,
            vipEndTime: this.filterTime(this.formValite.vipEndTime)
          }
        }
      }
      this.ajax(opt)
    },
    cancellation () {
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '注销成功',
              type: 'success'
            })
            this.$emit('cancels', false)
            this.setTableData()
          }
        },
        ajaxParams: {
          url: '/passport/vip/cancelVipStatus?userId=' + this.operailityData.id,
          method: 'post'
        }
      }
      this.ajax(opt)
    },
    filterTime (time) {
      const date = new Date(time)
      const Y = date.getFullYear()
      const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const D = date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate()
      return `${Y}-${M}-${D}`
    }
  }
}
</script>
<style scoped>

</style>
