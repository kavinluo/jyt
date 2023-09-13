<!----------------------------------
****--@name     题库练习
****--@role     ${*}
****--@date     2022/12/15
****--@author   lm
----------------------------------->
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
    />
    <div slot="right">
      <exercise v-if="currentTreeData.treeDes !== 'QUESTION'" tk-type="APP_TEST" :current-tree-data="currentTreeData"/>
      <question-bank v-if="currentTreeData.treeDes === 'QUESTION'" tk-type="APP_TEST" :current-tree-data="currentTreeData"/>
    </div>
  </layout-tree>
</template>
<script>
/* 当前组件必要引入*/
// let Util = null
import leftTreeTk from './leftTreelianxi.vue'
import questionBank from './questionBank.vue'
import exercise from './exercise.vue'
export default {
  components: {
    questionBank,
    leftTreeTk,
    exercise
  },
  data () {
    return {
      upDateNumber: 1,
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/list',
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
  methods: {
    treeClick (obj, node, self) {
      if (obj.treeDes === 'QUESTION') {
        this.currentTreeData = obj
      }
    }
  }
}
</script>
<style scoped>
</style>
