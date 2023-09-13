<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="address" label="点赞时间" />
    </el-table>
  </div>
</template>
<script>
let Util = null
import api from './api'
export default {
  props: ['operailityDatas'],
  data () {
    return {
      api,
      tableData: [],
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.likesPage.path,
          method: api.likesPage.method,
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
      this.setTableData()
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
        this.formInline
      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
    }
  }
}
</script>
<style scoped>

</style>
