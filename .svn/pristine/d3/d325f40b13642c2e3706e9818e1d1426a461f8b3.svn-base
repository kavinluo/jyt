<template>
  <div class="associationTreeNode">
    <el-scrollbar style="height:90%">
      <el-tree
        ref="tree"
        v-loading="loading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        :data="treeData"
        show-checkbox
        node-key="path"
        :props="defaultProps"
        :indent="10"
        :load="loadNode"
        lazy
      />
    </el-scrollbar>
    <div class="btns">
      <el-button
        class="submitBtn"
        @click="getCheckedNodes"
      >
        提交
      </el-button>
      <el-button
        class="cancelBtn"
        @click="cancel"
      >
        取消
      </el-button>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入*/
// 当前组件引入全局的util
export default {
  // initTree   回显树节点的key
  props: ['getTreeUrl', 'initTree'],
  data () {
    return {
      treeData: [],
      treeDatas: [],
      loading: true,
      defaultProps: {
        children: 'children',
        label: 'name'
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
      if(this.initTree && this.initTree.length) {
        this.$nextTick(()=>{
          this.$refs.tree.setCheckedKeys(this.initTree)
        })
      }
      this.postParamToServer()
    },
    // 获取树数据
    // 向服务器发送数据
    postParamToServer () {
      let ajaxOptions = {
        ajaxSuccess: 'getTreeData',
        ajaxParams: {
          url: '/tkmanage/examTree/tree',
          params: {
            type: 'CLEAR_TK'
          }
        }
      }
      this.ajax(ajaxOptions)
    },
    getTreeData (res) {
      if (res.code === 0) {
        this.loading = false
      }
      this.treeData = res.data
    },
    // 树的懒加载
    loadNode (node, reslove) {
      let that = this
      if (node.level === 0) {
        reslove(that.treeData)
      }
      if (node.level >= 1) {
        this.loadNodeChildren(node, reslove)
      }
    },
    loadNodeChildren (node, reslove) {
      let ajaxOptions = {
        ajaxSuccess: res => {
          return reslove(res.data)
        },
        ajaxParams: {
          url: '/tkmanage/examTree/list',
          params: {
            type: 'CLEAR_TK',
            parentId: node.data.id
          }
        }
      }
      this.ajax(ajaxOptions)

    },
    // 获取选中的数据
    getCheckedNodes () {
      // 获取所有选中的节点 包括父子节点
      let selectdata = this.$refs.tree.getCheckedNodes()
      let obj = {}
      selectdata.sort(function (a, b) {
        return a.depth - b.depth // 时间正序
      })
      // 找到里边所有的子节点（传参只需要父节点）
      for(let i = 0; i < selectdata.length; i++) {
        for(let j = 0; j < selectdata.length; j++) {
          if(selectdata[i].id === selectdata[j].parentId) {
            obj[selectdata[j].id] = selectdata[j]
          }
        }
      }
      // 删掉子节点
      for(let i = 0; i < selectdata.length; i++) {
        if(obj[selectdata[i].id] && Object.keys(obj[selectdata[i].id])) {
          selectdata.splice(i, 1)
          i--
        }
      }
    },
    cancel () {
      this.$emit('cancel', 'quest')
    }
  }
}
</script>
<style lang="less">
.associationTreeNode {
    height: 400px;
  .btns {
    margin-top: 20px;
    text-align: center;
  }
   .el-tree {
    min-width: 100%;
    display: inline-block !important;
  }
  .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
