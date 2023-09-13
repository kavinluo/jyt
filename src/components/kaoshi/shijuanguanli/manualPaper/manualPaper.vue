<!----------------------------------
****--@name     手工组卷
****--@role     ${*}
****--@date     2022/12/27
****--@author   yyl
----------------------------------->
<template>
  <div class="manualPaper">
    <styleSettings v-if="currentStep === 'style'" :currentTreeData="currentTreeData" :editData="editData" @setStep="setStep"></styleSettings>
    <select-test-questions v-if="currentStep === 'content'" :type="type" @setStep="setStep" :isLastQuestion="isLastQuestion" :editData="editData"></select-test-questions>
    <statistics v-if="currentStep === 'statistics'" :editData="editData" @setSteps="setSteps" @success="success"></statistics>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import styleSettings from '../intelligentPaper/styleSettings' // 样式设置
import selectTestQuestions from './selectTestQuestions' // 选择试题
import statistics from './statistics'
// 当前组件引入全局的util
export default {
  props: ['currentTreeData', 'rowData', 'type'],
  data () {
    return {
      currentStep: 'style',
      isLastQuestion: false, // 是否直接显示最后一份试卷
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
    setStep (type) {
      this.currentStep = type
    },
    setSteps (type, isLastQuestion) {
      this.currentStep = type
      this.isLastQuestion = isLastQuestion
    },
    success () {
      let msg = this.rowData && this.rowData.id ? '修改成功' : '组卷成功'
      this.$emit('edit', 'manual', msg)
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('setStyleContent', {})
    this.$store.commit('setPaperInformation', {})
  },
  components: {styleSettings, selectTestQuestions, statistics}
}
</script>
<style lang="less">
.manualPaper {
  .title {
    text-align: center;
    border-bottom: 1px dashed #ccc;
    line-height: 40px;
    font-size: 16px;
  }
}
</style>
