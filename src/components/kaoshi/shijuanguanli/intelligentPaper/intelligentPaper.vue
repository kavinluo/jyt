<!----------------------------------
****--@name     智能组卷
****--@role     ${*}
****--@date     2022/12/26
****--@author   yyl
----------------------------------->
<template>
  <div class="intelligentPaper">
    <styleSettings v-if="currentStep === 'style'" :currentTreeData="currentTreeData" :editData="editData" @setStep="setStep" :paperTxorder="paperTxorder"></styleSettings>
    <contentSettings v-if="currentStep === 'content'" :currentTreeData="currentTreeData" :editData="editData" :paperTxorder="paperTxorder" @setStep="setStep" @success="success"></contentSettings>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import styleSettings from './styleSettings' // 样式设置
import contentSettings from './contentSettings'
// 当前组件引入全局的util
export default {
  props: ['currentTreeData', 'rowData'],
  data () {
    return {
      currentStep: 'style',
      paperTxorder: [],
      showType: '', // 只有add和edit
      editData: {}
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      if(this.rowData && this.rowData.id) {
        this.showType = 'edit'
        this.getEditData()
      }
    },
    // 修改时，获取回显数据
    getEditData () {
      this.currentStep = ''
      this.ajax({
        ajaxSuccess: (res) => {
          console.log(res)
          this.editData = res.data
          this.currentStep = 'style'
        },
        ajaxParams: {
          url: '/paper/examPaperInfo/get/' + this.rowData.id,
          method: 'get'
        }
      })
    },
    // 设置上一步 下一步
    setStep (type, paperTxorder) {
      this.currentStep = type
      this.paperTxorder = paperTxorder || []
    },
    // 提交成功
    success () {
      let msg = this.rowData.id ? '修改成功' : '组卷成功'
      this.$emit('edit', 'intelligent', msg)
    },
    // 确定提交
    sureComit () {}
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('setContentData', {})
    this.$store.commit('setTempContent', {})
    this.$store.commit('setStyleContent', {})
  },
  components: {styleSettings, contentSettings}
}
</script>
<style lang="less">
.intelligentPaper {
  .title {
    text-align: center;
    border-bottom: 1px dashed #ccc;
    line-height: 40px;
    font-size: 16px;
  }
}
</style>
