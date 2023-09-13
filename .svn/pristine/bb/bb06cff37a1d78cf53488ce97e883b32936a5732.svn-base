<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/14
****--@author   yyl
----------------------------------->
<template>
  <div ref="generalListTkList">
    <el-form :inline="true" class="el-form-item-search" onsubmit="return false">
      <el-row>
        <el-col :span="16">
          <el-form-item>
            <el-button type="primary" class="blueBtn" @click="search">查询数据</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="blueBtn" @click="search">题目分布分析</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8" align="right">
          <el-form-item>
            <el-input v-model="seacrchObj.name" placeholder="请输入关键性文字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="blueBtn" @click="search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div ref="generalListTable">
      <el-table
          :data="tableData"
          style="width: 100%"
          :height="dynamicHt">
        <el-table-column
            prop="date"
            label="序号"
            align="center">
        </el-table-column>
        <el-table-column
            prop="date"
            label="名称"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="name"
            label="题库数量"
            align="center">
        </el-table-column>
        <el-table-column
            prop="address"
            label="排序"
            align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
// 当前组件引入全局的util
let Util = null
export default {
  props: ['currentTreeData', 'tkType'],
  data () {
    return {
      seacrchObj: {
        name: ''
      },
      tableData: [],
      addId: {id: 'addId', title: '新建题组'},
      addModal: false,
      dynamicHt: 200
    }
  },
  components: {},
  methods: {
    // 初始化请求列表数据
    init () {
      console.log(this.currentTreeData)
    },
    search () {},
    setTableDynHeight () {
      let deviceTable = this.$refs.generalListTable
      this.dynamicHt = this.$refs.generalListTkList.parentNode.parentNode.parentNode.offsetHeight -
          deviceTable.offsetTop
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  mounted () {
    // 页面dom稳定后调用
    this.$nextTick(function () {
      // 初始表格高度及分页位置
      this.setTableDynHeight()
      // 为窗体绑定改变大小事件
      let Event = Util.events
      Event.addHandler(window, 'resize', this.setTableDynHeight)
    })
  }
}
</script>
