<template>
  <div>
    <!-- 新建班级 -->
    <sf-dialog
        :visible="visible"
        title="评论查看"
        width="60%"
        @close="closeDialog"
        @update:visible="val => $emit('update:visible', val)"
    >
      <div style="width: 98%;padding: 20px">
         <div class="c-row">
              <div class="c-title">班级名称：</div>
              <div class="c-value">{{data.className}}</div>
         </div>
        <div class="c-row">
          <div class="c-title">发布时间：</div>
          <div class="c-value">{{data.createTime}}</div>
        </div>
        <div class="c-row">
          <div class="c-title">发布人：</div>
          <div class="c-value">{{data.nickname}}</div>
        </div>
        <div class="c-row-h">
          <div class="c-title-h">评论内容
            <span v-if="data.childrenList!=null">({{data.childrenList.length}})</span>
          </div>
          <div class="c-value aaa">
            {{data.commentContent}}
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">
          关闭
        </el-button>
      </div>
    </sf-dialog>
  </div>
</template>

<script>


import SfDialog from "./Dialog/Dialog.vue";
export default {
  components:{
    SfDialog
  },
  name: "DlgDetailComment",
  props:{
    visible: Boolean,
    data: Object
  },


  methods:{
    /**
     * 关闭弹窗
     */
    closeDialog() {
      // 关闭弹窗
      this.$emit('update:visible', false)
    }
  }

}
</script>

<style scoped>
.c-row{
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 10px;

}
.c-title{
  color: #666;
}
.c-row-h{
  display: flex;
  flex-direction: column;
}
.c-title-h{
  font-weight: bold;
  font-size: 18px;
}
.aaa{
  width: 100%;
  height: 200px;
  padding: 20px;
  border: 1px solid #E5E5E5;
  margin-top: 10px;
}
</style>
