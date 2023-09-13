<template>
<div>
  <!-- 新建班级 -->
  <sf-dialog
      :visible="visible"
      :title="type=='EXAM_PAPER'?'选择试卷':'选择题库'"
      width="500"
      @close="closeDialog"
      @update:visible="val => $emit('update:visible', val)"
  >


    <div style="width: 90%;padding: 20px 0;min-height: 100px">
      <el-tree
          :loading="loading"
          :props="props"

          ref="tree"
          :load="loadNode"
          node-key="id"
          lazy
          show-checkbox>
      </el-tree>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button
          type="primary"
          size="small"

          @click="cmdSubmit"
      >
        确定
      </el-button>

      <el-button size="small" @click="closeDialog">
          取消
      </el-button>
    </div>
  </sf-dialog>
</div>
</template>

<script>

import {getExamTree} from "../api/course";
import SfDialog from './Dialog/Dialog.vue'
export default {
  name: "DlgChoose",
  props:{
    visible: Boolean,
    data: Object,
    type:String //EXAM_PAPER 选择试卷   APP_TEST 选择题库
  },
  components:{
    SfDialog
  },
  data() {
    return {
      dataTree:[],
      loading:false,
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },

    }
  },
  computed: {

  },

  methods: {
    async  getData(node){
      let _this = this
      if(!node){
        _this.loading=true
      }
      let _data = {}
       await getExamTree({type:this.type,parentId:node&&node.data?node.data.id:''}).then(res => {
      //  await getExamTree().then(res => {
        _data= res.data;
        _this.loading=false

      });
      return _data
    },
    async loadNode(node, resolve) {
      const data = await this.getData(node)
      return resolve(data);
    },


    cmdSubmit(){
      // let select = this.$refs.tree.getCheckedKeys()
      ////EXAM_PAPER 选择试卷   APP_TEST 选择题库
      let annexType = this.type=='EXAM_PAPER'?1:2
      const checkedNodes = this.$refs.tree.getCheckedNodes()
      let result = []
      if(checkedNodes && checkedNodes.length>0){
        for(let m=0;m<checkedNodes.length;m++){
          result.push({annexType:annexType,examId:checkedNodes[m].id,examName:checkedNodes[m].name})
        }
      }
      this.$emit('success',result)
      this.closeDialog()

    },

    /**
     * 关闭弹窗
     */
    closeDialog() {
      // 关闭弹窗
      this.$emit('update:visible', false)


    },

  },
  async created() {


  }


}
</script>

<style scoped>
.cover {
  width: 150px;
  height: 150px;
  display: block;
}
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
::v-deep .cover-uploader-1 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 150px;
}
::v-deep .cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
