<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="栏目名称：">
        <el-select v-model="form.configColumn" placeholder="请选择栏目">
          <el-option v-for="(item) in getArr" :key="item.id" :label="item.label | dict('configColumn')" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="配置类型：">
        <el-select v-model="form.configValue"  placeholder="请选择配置类型">
          <el-option v-for="(item) in getArr" :key="item.id" :label="item.value | dict('configValue')" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-select v-model="form.status" placeholder="请选择是否启用">
          <el-option label="启用" value="ENABLE"></el-option>
          <el-option label="禁用" value="UNABLE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="blueBtn" @click="onSubmit">立即创建</el-button>
        <el-button class="cancelBtn" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
let Util = null
import api from './api'
export default {
  props: ['setTableDatas', 'operailityData', 'type'],
  data () {
    return {
      api,
      form: {
        configColumn: '',
        configValue: '',
        status: ''
      },
      getArr: [],
      columnName: '',
      configName: '',
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listDictBy.path,
          method: api.listDictBy.method,
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
      console.log(this.type)
      Util = this.$util
      // ajax请求参数设置
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          dictType: 'train_config'
        }
      }
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
      this.setTableData()
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params
      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      this.getArr = res.data
    },
    getSuccess (res) {
      for (let k in this.form) {
        this.form[k] = res.data[k]
      }
    },
    onSubmit () {
      let opt = {
        ajaxSuccess: 'submitSuccess',
        ajaxParams: {
          url: this.type === 'edit' ? api.modifyConfig.path + this.operailityData.id : api.addConfig.path,
          method: this.type === 'edit' ? 'put' : 'post',
          jsonString: true,
          data: this.form
        }
      }
      this.ajax(opt)
    },
    submitSuccess (res) {
      if (res.code === 0) {
        this.$message({
          message:this.type === 'edit' ? '修改成功' : '添加成功',
          type: 'success'
        })
        this.setTableDatas()
        this.$emit('cancel', 'add')
      }
    },
    cancel () {
      this.$emit('cancel', 'add')
    }
  }
}
</script>
<style scoped>

</style>
