<!----------------------------------
****--@name     整理题库
****--@role     ${*}
****--@date     2022/12/22
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
      tkType="CLEAR_TK"
      :id="-5"
    />
    <div slot="right">
      <general-list-tk v-if="currentTreeData.treeDes !== 'QUESTION'" tkType="CLEAR_TK" :currentTreeData="currentTreeData"></general-list-tk>
      <question-goup-list v-if="currentTreeData.treeDes === 'QUESTION'" tkType="CLEAR_TK" :currentTreeData="currentTreeData"></question-goup-list>
    </div>
  </layout-tree>
</template>
<script>
/* 当前组件必要引入*/
import leftTreeTk from '../jichutiku/leftTreetiku'
import generalListTk from '../jichutiku/generalListTk_list' // 题库题目统计
import questionGoupList from '../jichutiku/questionGoup_list' // 具体试题题目
// 当前组件引入全局的util

export default {
  components: {leftTreeTk, generalListTk, questionGoupList},
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
