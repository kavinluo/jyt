<!----------------------------------
****--@name     中医 西医临证
****--@role     ${*}
****--@date     2022/12/21
****--@author   yyl
----------------------------------->
<template>
  <div>
    <template>
      <el-table
          :data="tableData"
          style="width: 100%"
          @cell-click="cellHandleclick" >
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
/* 当前组件必要引入*/

// 当前组件引入全局的util
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        tag: '公司'
      }]
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    cellHandleclick (row, column, cell, event) {
      console.log(row, column, cell, event, 'row, column, cell, event')
    }

  },
  created () {
    this.init()
  },
  mounted () {
  },
  components: {}
}
</script>
