<template>
  <layout-tree>
    <leftTreeTk
        slot="left"
        style="margin-top: 3px"
        :up-date-number="upDateNumber"
        :tree-options="treeDefaults"
        :is-page="true"
        tk-type="EXAM_PAPER"
        @tree-click="treeClick"
        :id="-3"
    />
    <div slot="right">
      <exam-Settings
          v-if="currentTreeData.id"
          tk-type="EXAM_PAPER"
          :current-tree-data="currentTreeData"
      />
    </div>
  </layout-tree>
</template>
<script>
/* 当前组件必要引入*/
import leftTreeTk from '../../tiku/jichutiku/leftTreetiku'
import examSettings from './examSettings_list.vue'
export default {
  components: {
    examSettings,
    leftTreeTk
  },
  data () {
    return {
      upDateNumber: 1,
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/tree',
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
