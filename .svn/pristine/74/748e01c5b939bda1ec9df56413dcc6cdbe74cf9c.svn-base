<template>
  <layout-tree>
    <leftTreeTk
      slot="left"
      style="margin-top: 3px"
      :up-date-number="upDateNumber"
      :tree-options="treeDefaults"
      :is-page="true"
      tk-type="APP_TEST"
      @tree-click="treeClick"
      :id="-4"
    />
    <div slot="right">
      <testPaper v-if="currentTreeData.id" :current-tree-data="currentTreeData"/>
    </div>
  </layout-tree>
</template>
<script>
/* 当前组件必要引入*/
import leftTreeTk from '../../tiku/jichutiku/leftTreetiku'
import testPaper from './testPaperExercise_list.vue'
export default {
  components: {
    leftTreeTk,
    testPaper
  },
  data () {
    return {
      upDateNumber: 1,
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/tree',
        isShowMenus: true,
        tempData: [],
        isShowSearch: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      },
      currentTreeData: {} // 当前点击的数节点数据
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化请求列表数据
    init () {
    },
    treeClick (obj, node, self) {
      this.currentTreeData = obj
    }
  }

}
</script>
