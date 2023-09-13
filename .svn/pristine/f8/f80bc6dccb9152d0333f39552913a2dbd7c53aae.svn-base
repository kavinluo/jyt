<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/15
****--@author   yyl
----------------------------------->
<template>
  <div>
    <div v-if="currentExamTmType === '' || currentExamTmType == 'A3题型' || currentExamTmType == 'T型题'">
      题目类型：
      <el-select
        v-model="formValidate.examPaperTmVOList[0].tmInfoList[0].tmTypeId"
        :disabled="!!formValidate.examPaperTmVOList[0].tmInfoList[0].tmTypeId"
        placeholder="请选择"
        @change="tmTypeIChange"
      >
        <el-option
          v-for="item in examTmTypeOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <el-form
      :rules="rules"
      v-if="AOneandTwo.includes(currentExamTmType) || questionTm.includes(currentExamTmType)"
      ref="formValidate"
      :model="formValidate.examPaperTmVOList[0].tmInfoList[0]"
      :inline="true"
      class="el-form-item-search"
      label-width="110px"
      onsubmit="return false"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="知识点：" prop="tmKnowledge">
            <el-input
              v-model="formValidate.examPaperTmVOList[0].tmInfoList[0].tmKnowledge"
              placeholder="请输入知识点"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="题目难度：" prop="tmDifficulty">
            <el-select
              v-model="formValidate.examPaperTmVOList[0].tmInfoList[0].tmDifficulty"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tmDifficultyOption"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分数：" prop="tmMark">
            <el-input
              v-model="formValidate.examPaperTmVOList[0].tmInfoList[0].tmMark"
              placeholder="请输入分数"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="题目类型：" prop="tmTypeId">
            <!-- tkvalue 一般是小题选项的类型-->
            <el-select
              v-model="tmTypeId"
              placeholder="请选择"
              @click="tkvalueChange">
              <el-option
                v-for="item in littleExamTmTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教学要求：" prop="tmRequire">
            <el-select
              v-model="formValidate.examPaperTmVOList[0].tmInfoList[0].tmRequire"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tmRequireOption"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="!questionTm.includes(currentExamTmType)">
          <el-form-item label="选项数：">
            <el-select
              v-model="tmSelectNum"
              placeholder="请选择"
              @change="tmSelectNumChange"
            >
              <el-option
                v-for="item in 10"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <examTmType-a1
      ref="examTmTypeA1"
      v-if="AOneandTwo.includes(currentExamTmType)"
      :tm-select-num="tmSelectNum"
      :get-examTm-detail="getExamTmDetail"
      :tm-type-id="formValidate.examPaperTmVOList[0].tmInfoList[0].tmTypeId"
      :exam-tm-type-obj="examTmTypeObj"
      :editData="editData"
      @submit="submit"
    />
    <examTmType-a3
      v-if="AThreeandFour.includes(currentExamTmType)"
      :row-data="rowData"
      :tm-select-num="tmSelectNum"
      :exam-paper-list="examPaperList"
      :tm-type-obj="formValidate.examPaperTmVOList[0].tmInfoList[0]"
      :exam-tm-type-obj="examTmTypeObj"
      :currentTreeData="currentTreeData"
      :get-examTm-detail="getExamTmDetail"
      :editData="editData"
      @close="close"
      @submit="submit"
    />
    <examTmType-b1
      v-if="BOneandTwo.includes(currentExamTmType)"
      :row-data="rowData"
      :tm-select-num="tmSelectNum"
      :exam-paper-list="examPaperList"
      :tm-type-obj="formValidate.examPaperTmVOList[0].tmInfoList[0]"
      :exam-tm-type-obj="examTmTypeObj"
      :currentTreeData="currentTreeData"
      :get-examTm-detail="getExamTmDetail"
      :editData="editData"
      @close="close"
      @submit="submit"
    />
    <judgmental-question
        v-if="questionTm.includes(currentExamTmType)"
        ref="judgmentalQuestion"
        :tm-select-num="tmSelectNum"
        :exam-paper-list="examPaperList"
        :row-data="rowData"
        :tm-type-obj="formValidate.examPaperTmVOList[0].tmInfoList[0]"
        :get-examTm-detail="getExamTmDetail"
        :exam-tm-type-obj="examTmTypeObj"
        :currentTreeData="currentTreeData"
        :editData="editData"
        @submit="submit"></judgmental-question>
    <examTmType-T
      v-if="currentExamTmType === 'T题型'"
      :tm-select-num="tmSelectNum"
      :tm-type-obj="formValidate.examPaperTmVOList[0].tmInfoList[0]"
      :exam-tm-type-obj="examTmTypeObj"
      :currentTreeData="currentTreeData"
      :editData="editData"
      @close="close"
    />
    <clinical-certificate
      v-if="currentExamTmType === '中医临证题'"
      :tm-select-num="tmSelectNum"
      :tm-type-obj="formValidate"
      :exam-tm-type-obj="examTmTypeObj"
      :currentTreeData="currentTreeData"
    />
  </div>
</template>
<script>
/* 当前组件必要引入*/
import examTmTypeA1 from './examTmType/examTmTypeA1.vue'// A1  A2
import examTmTypeA3 from './examTmType/examTmTypeA3' // A3  A4
import examTmTypeB1 from './examTmType/examTmTypeB1' // B1  B2
import judgmentalQuestion from './examTmType/judgmentalQuestion' // 判断题
import examTmTypeT from './examTmType/examTmTypeT' // T型题
import clinicalCertificate from './examTmType/examTmTypeClinicalCertificate'
import {newTopic as rules} from '../rules.js'
// 当前组件引入全局的util
export default {
  props: ['currentTreeData', 'rowData', 'examPaperList', 'getEditData'],
  components: {examTmTypeA1, examTmTypeA3, examTmTypeB1, judgmentalQuestion, examTmTypeT, clinicalCertificate},
  data () {
    return {
      AOneandTwo: ['A1题型', 'A2题型', 'X题型', 'D题型', '单选题', '多选题'],
      AThreeandFour: ['A3题型', 'A4题型'],
      BOneandTwo: ['B1题型', 'B2题型'],
      questionTm: ['判断题', '问答题', '填空题', '病案分析题'],
      tmTypeId: '', // 小题题型id
      tmType: '', // 小题题型name
      examTmTypeOptions: [],
      examTmTypeObj: {},
      currentExamTmType: '',
      tmDifficultyOption: ['0.1', '0.2', '0.3', '0.4', '0.5'],
      tmRequireOption: ['掌握', '熟悉', '了解', '超纲'],
      tmSelectNum: 4,
      formValidate: {
        examPaperTmVOList: [
          {
            id: '',
            parperId: '',
            paperNo: '',
            tmInfoList: [{
              tmKnowledge: '', // 知识点
              tmDifficulty: '', // 题目难度
              tmMark: '', // 题目分数
              tmTypeId: '', // 题目类型id
              tmType: '',
              tmRequire: '', // 教学要求
              tmGroupType: '',
              tmDetailQuestionVO: {},
              tmAnswerVOList: [],
              treeId: '',
              path: '',
              id: '',
              tmContentDescription: '',
              isVideo: 0
            }]
          }
        ]
      },
      rules,
      littleExamTmTypeOptions: [], // 小题题型候选项,
      editData: {} // 修改题目时回显数据
    }
  },
  created () {
    this.formValidate.examPaperTmVOList[0].id = this.examPaperList[0].id
    this.formValidate.examPaperTmVOList[0].paperId = this.examPaperList[0].paperId
    this.formValidate.examPaperTmVOList[0].paperNo = this.examPaperList[0].paperNo
    this.formValidate.examPaperTmVOList[0].tmInfoList[0].treeId = this.currentTreeData.id
    this.formValidate.examPaperTmVOList[0].tmInfoList[0].treePath = this.currentTreeData.path
    this.formValidate.examPaperTmVOList[0].tmInfoList.push(...this.examPaperList[0].tmInfoList)
    this.init()
  },
  mounted () {
  },
  methods: {
    // 初始化请求列表数据/tkmanage/examTmDetail/listPage
    init () {
      this.getExamTmType()
      this.getExamTmDetail()
    },
    // 获取所有题型
    getExamTmType () {
      this.ajax({
        ajaxSuccess: (res) => {
          console.log(res)
          this.examTmTypeOptions = res.data
          res.data.forEach(item => {
            this.examTmTypeObj[item.id] = {
              name: item.name,
              isGroup: item.isGroup,
              basicType: item.basicType
            }
          })
        },
        ajaxParams: {
          url: '/tkmanage/examTmType/allList',
          method: 'get'
        }
      })
    },
    // 主题型改变之后
    tmTypeIChange (val) {
      // this.examTmTypeObj = JSON.parse(JSON.stringify(this.examTmTypeObj))
      this.currentExamTmType = this.examTmTypeObj[val].name
      // this.formValidate.tmGroupType = this.examTmTypeObj[val].isGroup === 0 ? 'GROUP' : this.examTmTypeObj[val].isGroup === 1 ? 'GROUP' : 'BIG_GROUP' // BIG_GROUP
      if (this.examTmTypeObj[val].isGroup === 0) {
        this.formValidate.examPaperTmVOList[0].tmInfoList[0].tmGroupType = 'BASE'
      }else if(this.examTmTypeObj[val].isGroup === 1 && val !== 7) {
        this.formValidate.examPaperTmVOList[0].tmInfoList[0].tmGroupType = 'GROUP'
      }else if (val === 7) {
        this.formValidate.examPaperTmVOList[0].tmInfoList[0].tmGroupType = 'BIG_GROUP'
      }
      this.formValidate.examPaperTmVOList[0].tmInfoList[0].tmTypeId = val
      this.formValidate.examPaperTmVOList[0].tmInfoList[0].tmType = this.examTmTypeObj[val].name
      // 设置小题题型候选项并默认选中
      if(this.examTmTypeObj[val].basicType.split(',').length === 1) {
        this.littleExamTmTypeOptions = this.examTmTypeOptions.filter(item => {
          return item.name === this.examTmTypeObj[val].basicType
        })
        this.tmTypeId = this.littleExamTmTypeOptions[0].id
      }
    },
    // 小题题型改变之后
    tkvalueChange (val) {
      this.tmTypeId = val
      this.tmType = this.examTmTypeObj[val].name
    },
    // 修改时获取回显的数据
    getExamTmDetail () {
      for(let k in this.formValidate.examPaperTmVOList[0].tmInfoList[0]) {
        this.formValidate.examPaperTmVOList[0].tmInfoList[0][k] = this.rowData[k]
      }
      setTimeout(() => {
        this.tmTypeIChange(this.formValidate.examPaperTmVOList[0].tmInfoList[0].tmTypeId)
      }, 100)
      this.editData = this.rowData
    },
    // eslint-disable-next-line complexity
    submit (data, type, eleName) {
      let isSubmit = this.submitForm('formValidate')
      if (!isSubmit) {return}
      // 验证是否填写题目内容
      if(!data.tmContent) {
        this.errorMess('请填写题目内容')
        return
      }
      // 有选项的需要判断选项内容
      if(this.AOneandTwo.includes(data.tmType)) {
        // 验证是否设置选项
        if(!data.tmSelectList || !data.tmSelectList.length) {
          this.errorMess('请选择选项数')
          return
        }
        // 验证每个选项是否填写内容
        for(let i = 0; i < data.tmSelectList.length; i++) {
          let item = data.tmSelectList[i]
          if(!item.selectContent) {
            this.errorMess('请设置第' + (i + 1) + '个选项的内容')
            return
          }
        }
      }
      // 验证是否选择正确答案
      if(!data.tmAnswer) {
        this.errorMess('请选择或填写正确答案')
        return
      }
      // 验证是否填写答案解析
      if(!data.tmExplain) {
        this.errorMess('请填写答案解析内容')
        return
      }
      const tmInfoList = this.formValidate.examPaperTmVOList[0].tmInfoList[0]
      tmInfoList.tmDetailQuestionVO = data
      tmInfoList.tmDetailQuestionVO.tmTypeId = this.tmTypeId
      tmInfoList.tmDetailQuestionVO.tmType = this.tmType
      tmInfoList.tmAnswerVOList = [{
        tmAnswer: data.tmAnswer,
        tmExplain: data.tmExplain,
        isAnswerExplainVideo: data.isAnswerExplainVideo,
        videoAnswerExplainFileId: data.videoAnswerExplainFileId,
        tmNo: 1
      }]
      tmInfoList.tmDetailQuestionVO.tmMark = tmInfoList.tmMark
      tmInfoList.tmDetailQuestionVO.tmNo = 1
      tmInfoList.tmContentDescription = data.textTmContent || data.tmContent
      tmInfoList.tmContentDescription = tmInfoList.tmContentDescription.substring(0, 10)
      if(data.isEnclosure) {
        tmInfoList.isVideo = 1
      }else {
        tmInfoList.isVideo = 0
      }
      this.ajax({
        ajaxSuccess: (res) => {
          if(type === 'close' && res.code === 0) { // 保存并关闭
            this.$emit('cancel', 'add')
            this.$message({ message: '保存成功', type: 'success'})
            this.getEditData()
          }else if(type === 'continue') { // 保存后继续录入
            this.$refs[eleName].init()
            this.$refs.formValidate.resetFields()
          }
        },
        ajaxParams: {
          url: '/paper/examPaperInfo/modifyPaperTm/' + this.rowData.id,
          method: 'put',
          jsonString: true,
          data: this.formValidate
        }
      })
    },
    close () {
      this.$emit('cancel', 'add')
      this.$message({ message: '保存成功', type: 'success'})
      this.getEditData()

    },
    submitForm (formName) {
      let flag = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          flag = true
        }
      })
      return flag
    },
    // 当选项数改变之后
    tmSelectNumChange (val) {
      if(this.AOneandTwo.includes(this.currentExamTmType)) {
        this.$refs.examTmTypeA1.setSelect(val)
      }
    }
  }
}
</script>
<style>
.tmContent, .tmExplain, .tmReferenceData {
  color: #000;
  font-size: 14px;
  line-height: 30px;
}
.saveBtn {
  margin-top: 20px;
  text-align: center;
}
</style>
