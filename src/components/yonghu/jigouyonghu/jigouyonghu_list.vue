<template>
  <layout-tree>
    <leftTree
      slot="left"
      style="margin-top: 3px"
      :up-date-number="upDateNumber"
      :tree-options="treeDefaults"
      @tree-click="treeClick"
    />
    <div slot="right">
      <instituionalUser :current-tree-data="currentTreeData" />
    </div>
  </layout-tree>
</template>
<script>
/* 当前组件必要引入*/
import leftTree from './leftTree.vue'
import instituionalUser from './institutionalUser.vue'
export default {
  components: {
    leftTree,
    instituionalUser
  },
  data () {
    return {
      upDateNumber: 1,
      treeDefaults: {
        getTreeUrl: '/passport/dept/tree',
        isShowMenus: true,
        isShowSearch: false,
        tempData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      },
      currentTreeData: {} // 当前点击的数节点数据
    }
  },
  methods: {
    treeClick (obj, node, self) {
      this.currentTreeData = obj
    }
  }

}
</script>
