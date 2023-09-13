
<template>
  <div  class="left-tree" >
    <div  class="action-area">
      <el-button class="defaultBtn" type="primary" @click="cmdAdd">新建</el-button>
      <el-button class="defaultBtn" type="primary" @click="cmdUpdate">修改</el-button>
      <el-button class="defaultBtn" type="primary" @click="cmdDel">删除</el-button>
    </div>
    <div class="tree-box">
      <el-tree
        :render-content="renderContent"
        highlight-current
        node-key="id"
        class="filter-tree"
        :check-on-click-node="true"
        :data="treeData"
        :props="props"
        :empty-text="emptyText"
        @node-click="nodeClick"
    >
      </el-tree>
    </div>

    <dlg-edit-tree  v-if="visible" :optType="optType" :visible.sync="visible" :node="node" @success="search"></dlg-edit-tree>
  </div>
</template>
<script>
import {getTreeList,del} from '../api/leftTree'
import DlgEditTree from './DlgEditTree.vue' // 自定义增加节点
export default {
  name: 'LeftTree',
  components: {
    DlgEditTree
  },
  data () {
    return {
      visible:false,
      node:{},
      treeData:[],
      emptyText: '暂无数据',
      iconClass:'',
      props:{
        label:'name'
      },
      optType:0,
    }
  },
  watch: {
    // filterText (val) {
    //   this.$refs.treeId.filter(val)
    // },
    // clickAddChange (val) {
    //   this.$emit('clickAdd', this.isSltedTreeNode)
    // },
    // upDateNumber (val) {
    //   this.init()
    // },
    // currentKey (val) {
    //   this.init()
    // }
  },
  created () {
    this.search();
  },
  methods: {
    nodeClick(node){
      // console.log('这是测试',node)
      this.$emit('showClass')
       this.node = node||{}
       this.$emit('nodeClick',node)
    },
    // 自定义节点内容
    renderContent (h, { node, data }) {


      let that = this
      let icon = (
          <i class="ivu-icon ivu-icon-md-folder-open ambuf-tree-icon"> </i>
      )
      if (node.isLeaf) {
        icon = <i class="ivu-icon ivu-icon-ios-document-outline ambuf-tree-icon"> </i>
      } else {
        if (node.expanded) {
          icon = (
              <i class="ivu-icon ivu-icon-md-folder-open ambuf-tree-icon">
                {' '}
              </i>
          )
        }
      }
      if (!data.children) {
        icon = <i class="ivu-icon ivu-icon-ios-document-outline ambuf-tree-icon"> </i>
      }

      return (
          <span>
          {' '}
            <span>
            {' '}
              {icon} <span> {node.label} </span>
          </span>{' '}
            <span style="float:right;margin-right:20px"> </span>
        </span>
      )
    },

    search(){
      this.loading = true;
      getTreeList(this.searchParams).then(res => {
        this.treeData = res.data;
        this.loading = false;
      });
    },
    cmdAdd(){
      this.optType=0
      this.visible=true
    },
    cmdUpdate(row){
      this.optType=1
      this.visible=true
    },


    cmdDel(){
      let _this = this
      if(this.node.children&&this.node.children.length>0){
        this.$message.error('该节点下存在子节点，不能删除!')
        return
      }
      if(this.node!=null&&this.node.id){
        let _key = 'classTotal_'+this.node.id
        if(sessionStorage.getItem(_key)){
          let _total = Number(sessionStorage.getItem(_key))
          if(_total>0)
            this.$message.error('该班级类型下有班级数据，不能删除!')
          else
            this.delRe()
        }
      }
      else{
        this.$message.error('请先选择需要删除的节点!')
      }
    },

    delRe(){
      let _this = this
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(_this.node.id).then(res => {
          if(res.data==true){
            _this.$message.success('删除成功！')
            _this.search()
          }

        });
      }).catch(() => {

      });
    }




  }
}
</script>

<style lang="less" scoped>

.left-tree{
    box-sizing: border-box;
     height: 100%;

}
.tree-box{
   height: calc(100% - 49px);
  border: 1px solid #e5e5e5;

}
.el-tree{
  box-sizing: border-box;
  height: 100%;
}
::v-deep .el-tree-node{
  //height: 36px !important;

}
::v-deep .ivu-icon{
   margin-left: -16px;
}
::v-deep .el-tree-node__content{
  //padding-left: 10px !important;
}
.action-area{
  display: flex;
  position: relative;
  top: 5px;
   margin-bottom: 20px;

}
.defaultBtn{
  /* height: 32px; */
  padding: 5px 14px!important;
  background-color: #f19149 !important;
  border-radius: 3px!important;
  font-size: 14px!important;
  color: #ffffff !important;
  border: none !important
}

</style>
