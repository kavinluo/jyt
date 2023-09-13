<template>
  <div
    id="content"
    ref="content"
    class="modal"
  >
    <el-row :gutter="20">
      <!--左侧树-->
      <el-col :span="6">
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
        />

        <el-tree
          style="min-height: 500px"
          highlight-current
          node-key="id"
          class="filter-tree"
          ref="tree2"
          :data="data2 "
          :props="defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :render-content="renderContent"
          @node-click="treeClick"
        >
          <i class="el-icon-delete" />
        </el-tree>
      </el-col>
      <!--右侧查询-->
      <el-col :span="18">
        <slot />
      </el-col>
    </el-row>
  </div>
</template>
<script >

export default{
  props: ['treeData'],
  data () {
    return {
      // tree
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      listStyle: {
        width: '250px',
        height: '100%',
        margin: '10px 50px'
      }
    }
  },

  computed: {
    data2 () {
      return this.treeData
    }
  },

  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  created () {

  },
  mounted () {
    let content = this.$refs.content
    let parHt = content.parentNode.offsetHeight
    this.dynamicHt = parHt - 170
  },
  methods: {

    /* tree*/
    // 搜索
    filterNode (value, data, node) {
      //          console.log(data,value,node);
      let parent = node.parent
      if (!value) {return true}
      if(data.label.indexOf(value) !== -1) {
        return true
      }
      while(parent.label) {
        if(parent.label.indexOf(value) !== -1) {
          return true
        }else{
          parent = parent.parent
        }
      }

      return false
    },
    // 点击节点
    treeClick (obj, node, self) {
      // 出现切换按钮
      // 点击的是叶节点则不更新列表数据
      let isLeaf = false
      if(!node.childNodes.length) {
        isLeaf = true
      }

      this.$emit('tree-click', obj, node, self, isLeaf)

    },
    expendNode (treeStore, store, data) {
      treeStore.expanded = !treeStore.expanded
    },
    // 自定义节点内容
    renderContent (h, { node, data, store }) {
      let icon = <i class="ivu-icon ivu-icon-android-folder ambuf-tree-icon"></i>

      if(node.isLeaf) {
        icon = <i class="ivu-icon ivu-icon-document ambuf-tree-icon"></i>
      }else{
        if(node.expanded) {
          icon = <i class="ivu-icon ivu-icon-android-folder-open ambuf-tree-icon"></i>
        }
      }
      return (
        <span>
          <span>
            {icon}
            <span>{node.label}</span>
          </span>
          <span style="float: right; margin-right: 20px">
          </span>
        </span>)
    }
  }

}
</script>
<style>

  .add-remove{
    margin-bottom: 20px;
  }
  .header{
    height: 30px;
    font-size: 18px;
    color: #ffffff;

  }

</style>

