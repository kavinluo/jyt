<template>
  <div>
    <!--左侧树-->
    <layout-tree style="height: 550px">
      <leftTreeTk
        slot="left"
        style="margin-top: 3px"
        :up-date-number="upDateNumber"
        :tree-options="treeDefaults"
        :is-page="true"
        tk-type="PAPER"
        @tree-click="treeClick"
        :id="-2"
      />
      <div
        id="content"
        slot="right"
        ref="content"
        class="modal"
      >
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          max-height="450"
          :header-cell-style="{ background: '#eef1f6' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            type="index"
            label="序号"
            width="90"
            align="center"
          />
          <el-table-column
            prop="name"
            label="考试名称"
            align="center"
          />
        </el-table>
        <br>
        <div class="ivu-tabs-bar" />
        <div style="text-align: center">
          <load-btn
            :btn-data="loadBtn"
            @listenSubEvent="listenSubEvent"
          />
          <el-button
            class="cancelBtn"
            @click="cancel"
          >
            取消
          </el-button>
        </div>
      </div>
    </layout-tree>
  </div>
</template>
<script>
import leftTreeTk from '../../tiku/jichutiku/leftTreetiku.vue'

// let Util = null
export default {
  components: { leftTreeTk },
  props: ['initUser', 'isOnlyOne', 'url', 'unSelect', 'treeOptions', 'selectOption', 'searchParams', 'type', 'getTreeUrl'],
  data () {
    return {
      // tree默认项设置
      upDateNumber: 0,
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/tree',
        isShowMenus: false,
        isShowSearch: false,
        tempData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      },
      // fromWhereTree: 'user',

      searchUserInfo: '', // 全局查询人员信息
      leftListData: [], // 左侧列表的数据
      tableData: [],
      listStyle: {
        width: '260px',
        height: '400px'
      },
      loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
      //        clickId: '',
      selectTreeData: {
        id: '', // 当前选中的树节点id,
        node: null, self: null, isLeaf: null
      },
      examList: [],
      selectionKeys: []
    }
  },
  mounted () {
    this.tableData.forEach(item => {
      this.examList.forEach(i=> {
        if (i.id === item.id) {
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(i, true)
          })
        }
      })
    })
  },
  created () {
    // Util = this.$util
    this.init()
  },
  methods: {

    // 初始化
    init () {
    },

    /*
       * 初始化时获取左侧框中的数据
       * @return mockData [{},{}]  左侧框的源数据
       * */
    // 保存成功回调
    listenSubEvent () {
      if (!this.isSelected()) { return }
      this.$emit('setUsers', this.examList)
    },
    // 调用父组件关闭当前模态框
    cancel () {
      this.$emit('cancel', 'selectUser', false)
    },

    treeClick (obj, node, self, isLeaf) {
      let id = obj.id
      this.selectTreeData = {id, node, self, isLeaf}
      this.searchUserInfo = ''
      this.searchLeafData(obj, isLeaf, node)
    },
    handleSelectionChange (val) {
      this.examList = val
      this.selectionKeys = val.map(item => item.id)
    },
    setLeftData (res) {
      let data = res
      this.tableData = data.data.list
    },
    isSelected () {
      let len = this.examList.length
      let flag = true
      if (len === 0) {
        this.showMess('请选择数据')
        flag = false
      } else if (len > 1) {
        this.showMess('仅选择一条数据')
        flag = false
      }
      return flag
    },
    /*
       * 查询叶子节点数据
       * @param id number | string  当前选中的节点的ID
       * */
    searchLeafData (obj, isLeaf, node) {
      let userList = {
        ajaxSuccess: 'setLeftData',
        ajaxParams: {
          url: '/paper/examPaperInfo/listPage',
          params: {
            treeId: obj.id,
            releaseState: 'RELEASE'
          }
        }
      }
      this.ajax(userList)
    }
  }
}
</script>
