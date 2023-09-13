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
      <examination :current-tree-data="currentTreeData" />
    </div>
  </layout-tree>
</template>
<script>
/* 当前组件必要引入*/
import leftTreeTk from '../../tiku/jichutiku/leftTreetiku'
import examination from './examinationManagement_list.vue'
export default {
  components: {
    leftTreeTk,
    examination
  },
  data () {
    return {
      upDateNumber: 1,
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/tree',
        tempData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      },
      currentTreeData: {}
    }
  },
  methods: {
    treeClick (obj, node, self) {
      console.log(obj, node, self)
      this.currentTreeData = obj
    }
  }

}
</script>
