<template>
<div>
  <sf-dialog
      :visible="visible"
      title="回复评论"
      width="500"
      @close="closeDialog"
      @update:visible="val => $emit('update:visible', val)"
  >


    <div style="width: 90%;padding: 20px;min-height: 100px">
      <el-input type="textarea" :rows="6" v-model.trim="form.commentContent"></el-input>
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
import {add} from "../api/comment";
import {updateBatch} from "../api/class";
import {mapGetters} from "vuex";
export default {
  name: "DlgReturn",
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
      form:{
        commentContent:''
      }

    }
  },
  computed:{
    ...mapGetters(['userInfo']),

  },

  methods: {

    cmdSubmit(){
      this.form.classId = this.data.classId
      this.form.commentType=2
      this.form.parentId=this.data.commentId
      this.form.userId =this.userInfo.id
      add(this.form).then(res => {
        if(res.code==0){
          this.$emit('success')
          this.closeDialog()
        }

      });


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
