<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/8
****--@author   yyl
----------------------------------->
<template>
  <div>
    <div style="width: 280px">
      <Button type="primary">Primary</Button>
      <Button type="primary" icon="checkmark">搜索</Button>
      <Icon type="checkmark" />

      <i class="el-icon-edit"></i>
      <i class="ivu-icon ivu-icon-document ambuf-tree-icon"> </i>
      <el-tree
          :data="treeDefaults.tempData"
          :props="defaultProps"
          :render-content="renderContent"
          accordion>
      </el-tree>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入*/

// 当前组件引入全局的util

export default {
  components: {},
  data () {
    return {
      upDateNumber: 1,
      treeDefaults: {
        getTreeUrl: '',
        getDataUrl: '',
        isShowSearch: false,
        isShowMenus: true,
        tempData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]
      }
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
    },
    renderContent (h, {
      node,
      data,
      store
    }) {
      let icon = <i class="ivu-icon ivu-icon-android-folder ambuf-tree-icon"> </i>
      if (node.isLeaf) {
        icon = <i class="ivu-icon ivu-icon-document ambuf-tree-icon"> </i>
      } else {
        if (node.expanded) {
          icon = <i class="ivu-icon ivu-icon-android-folder-open ambuf-tree-icon"> </i>
        }
      }
      if (true) {
        icon = <i class="ivu-icon ivu-icon-document ambuf-tree-icon"> </i>
      }
      console.log(icon, 'icon')
      return (<span> < span> {icon} <span class="nodeLabel"> {node.label} </span></span> <span style="float:right;margin-right:20px"> </span></span>)
    }
  }
}
</script>
