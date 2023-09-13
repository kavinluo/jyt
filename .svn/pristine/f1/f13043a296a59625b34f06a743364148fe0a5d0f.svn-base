<!----------------------------------
****--@name     试卷管理
****--@role     ${*}
****--@date     2022/12/26
****--@author   yyl
----------------------------------->
<template>
  <layout-tree>
    <leftTreeTk
      slot="left"
      style="margin-top: 3px"
      :up-date-number="upDateNumber"
      :tree-options="treeDefaults"
      :is-page="true"
      @tree-click="treeClick"
      tkType="PAPER"
      :id="-2"
    />
    <div slot="right">
      <test-paper-management v-if="currentTreeData.id" tkType="PAPER" :currentTreeData="currentTreeData"></test-paper-management>
    </div>
  </layout-tree>
</template>
<script>
/* 当前组件必要引入*/
import leftTreeTk from '../../tiku/jichutiku/leftTreetiku'
import testPaperManagement from './testPaperManagement_list'
// 当前组件引入全局的util

export default {
  components: {leftTreeTk, testPaperManagement},
  data () {
    return {
      upDateNumber: 1,
      // tree默认项设置
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/tree',
        getDataUrl: '',
        isShowSearch: false,
        isShowMenus: true,
        defaultProps: {
          label: 'name',
          children: 'children'
        }
      },
      currentTreeData: {} // 当前点击的数节点数据
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    // 初始化请求列表数据
    init () {

    },
    treeClick (obj, node, self) {
      console.log(obj, node, self)
      this.currentTreeData = obj
    }

  }
}
</script>
