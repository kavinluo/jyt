<!--
 * @Author: luo
 * @Date: 2023-09-12 10:17
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-09-13 16:26
 * @Description: 导入设置
-->
<template>
  <div class="myTree">
    <el-tree
      ref="tree"
      :data="treeData"
      show-checkbox
      :load="loadNode"
      lazy
      :props="defaultProps"
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
    />

    <el-row style="margin-top: 20px;">
      <el-col align="center">
        <el-button
          type="primary"
          size="small"
          @click="handleImport"
          :disabled="!!selectData.length"
        >
          导入人员
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleSuer"
          :disabled="!selectData.length"
        >
          确定
        </el-button>
        <el-button
          type="wanning"
          plain
          size="small"
          @click="handleCancel"
        >
          取消
        </el-button>
      </el-col>
    </el-row>
    <Modal
      v-model="importModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="600"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="importId"
      />
      <signUpImport
        v-if="importModal"
        :tree-id-list="treeIdList"
        @cancel="subCallback"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
import api from './api'
import signUpImport from './signUp_important'

export default {
  components:{
    signUpImport
  },
  props: ['selectData'],
  data() {
    return {
      treeData:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      importId: {
        id:'importId',
        title:'导入人员'
      },
      importModal: false,
      postCount:0,
      knowledgeTree:{
        treeIdList: []
      },
      treeIdList:[],
      listMessTitle: {
        ajaxSuccess: 'getListTree',
        ajaxParams: {
          isLoading: false,
          url: api.listTree.path,
          method: api.listTree.method,
          params: {
            parentId: -1,
            types: '',
            path: 'celebrity'
          }
        }
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      setTimeout((isLoading = false) => {
        this.ajax(this.listMessTitle, isLoading)
      }, 1000)
      console.log('this.selectData', this.selectData)
    },
    getListTree (res) {
      this.postCount +=1
      this.listMessTitle.ajaxParams.params = {
        parentId: res.data[0].id
      }
      if(this.postCount <= 1) {
        this.init()
      }
      if(this.postCount > 0) {
        console.log(' this.postCount', this.postCount)
        res.data.forEach((iem, index) => {iem.index = index})
        this.treeData = (this.postCount >= 2 && res.data) || []
      }
      console.log('res', res)
    },
    handleNodeClick(data) {
      // this.parentId = data.id
      console.log('data', data)
      console.log('666666', this.$refs.tree.getCheckedKeys())
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
      console.log('555', this.$refs.tree.getCheckedKeys())
      this.treeIdList = this.$refs.tree.getCheckedKeys()
    },
    loadNode(node, resolve) {
      console.log('node', node)
      if (node.level === 0) {
        return resolve(this.treeData)
      }
      if (node.level > 3) {return resolve([])}
      this.getChildrenData(node, resolve)
    },
    getChildrenData(node, resolve) {
      this.ajax({
        ajaxSuccess: (res => {
          if (res.data.length > 0) {
            resolve(res.data)
            console.log('node', node)
            node.childNodes.map(item => {item.checked = false})
          }
          node.loading = false
        }),
        ajaxParams: {
          isLoading: false,
          url: api.listTree.path,
          method: api.listTree.method,
          params: {
            parentId: node.data.id
          }
        }
      })
    },
    handleImport () {
      if(!this.treeIdList.length) {
        this.showMess('请选择课程节点！')
        return
      }
      this.importModal = true
    },
    handleSuer () {
      if(!this.treeIdList.length || !this.selectData.length) {
        this.showMess('请选择数据！')
        return
      }
      this.ajax({
        ajaxSuccess: (res => {
          if(res.data) {
            this.$emit('cancel', 'setting', '设置成功！')
          }
        }),
        ajaxParams: {
          jsonString: true,
          url: '/knowledge/knowledgeTree/openTree',
          method: 'post',
          data: {
            userIdList: this.selectData,
            treeIdList: this.treeIdList
          }
        }
      })
    },
    handleCancel() {
      this.$emit('cancel', 'setting', false, true)
    },
    // subCallback(target) {
    //   this.importModal = true
    //   this.$emit('cancel', 'setting', `导入${this.totalNumber}条数据`)
    // },
    subCallback(target, title, updata) {
      console.log('target', target)
      this.cancel(target)
      if (title) {
        this.successMess(title)
      }
      this.$emit('cancel', 'setting')
    }
  }
}
</script>

<style>
.myTree {
  .el-tree-node__loading-icon.el-icon-loading {
    left: 0 !important;
  }
}
</style>
