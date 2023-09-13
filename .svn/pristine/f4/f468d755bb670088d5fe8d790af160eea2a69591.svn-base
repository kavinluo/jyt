<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/16
****--@author   yyl
----------------------------------->
<template>
  <div>
    <div class="tmContent">
      主题干：
    </div>
    <el-row>
      <el-col :span="20">
        <el-input
          v-if="tmContentShowType"
          v-model="formValidate.tmContent"
          type="textarea"
          :rows="5"
          :disabled="isSaveThemeStem"
          placeholder="请输入"
        />
        <editor-bar
          v-else
          v-model="formValidate.tmContent"
          :is-clear="formValidate.isClear"
          :id-edit="isSaveThemeStem ? 'show' : ''"
          @change="changeEditor($event, 'tmContent')"
        />
      </el-col>
      <el-col
        :span="4"
        style="line-height: 35px"
        align="center"
      >
        <el-button
          class="blueBtn"
          @click="saveThemeStem"
        >
          保存主题干
        </el-button>
        <el-button
          class="blueBtn"
          @click="addSubtitle"
        >
          添加小题
        </el-button>
      </el-col>
    </el-row>
    <div v-if="!isSaveThemeStem">
      <el-button
        class="blueBtn"
        @click="changeInput('tmContent')"
      >
        {{ tmContentShowType ? '图文编辑' : '文本编辑' }}
      </el-button>
      <span>
        <upload-file
          :upload-url="'/passport/infra/file/upload'"
          :show-file-list="false"
          :length="1"
          :upload-files="formValidate.fileRespVO"
          :tip-show="false"
          @setUploadFiles="setUploadFiles($event, formValidate, 'videoFileId')"
        />
      </span>
    </div>
    <template>
      <el-table
        :data="tabledatas"
        style="width: 100%"
      >
        <el-table-column
          prop="textTmContent"
          label="题干内容"
          width="180"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.tmContent" />
          </template>
        </el-table-column>
        <el-table-column
          prop="tmAnswer"
          label="答案"
          width="180"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="blueBtn"
              @click="editOne(scope.$index)"
            >
              修改
            </el-button>
            <el-button
              class="blueBtn"
              @click="removeSubtitle(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="saved">
      <div
        v-for="(item, index) in tmDetailQuestionVO"
        :key="index"
      >
        <el-form
          ref="formValidate"
          :model="item"
          :inline="true"
          class="el-form-item-search"
          label-width="110px"
          :rules="rules"
          onsubmit="return false"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="知识点："
                prop="tmKnowledge"
              >
                <el-input
                  v-model="item.tmKnowledge"
                  placeholder="请输入关键性文字"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="题目难度："
                prop="tmDifficulty"
              >
                <el-select
                  v-model="item.tmDifficulty"
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
              <el-form-item
                label="分数："
                prop="tmMark"
              >
                <el-input
                  v-model="item.tmMark"
                  placeholder="请输入关键性文字"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="题目类型："
                prop="tmTypeId"
              >
                <el-select
                  v-model="item.tmTypeId"
                  placeholder="请选择"
                  @change="tkvalueChange($event,item)"
                >
                  <el-option
                    v-for="item in examTmTypeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="教学要求："
                prop="tmRequire"
              >
                <el-select
                  v-model="item.tmRequire"
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
            <el-col :span="8">
              <el-form-item label="选项数：">
                <el-select
                  v-model="item.tmSelectNum"
                  placeholder="请选择"
                  @change="tmSelectNumChange($event,item)"
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
        <div class="tmContent">
          题目内容：
        </div>
        <el-row>
          <el-col :span="20">
            <el-input
              v-if="item.tmContentShowType"
              v-model="item.tmContent"
              type="textarea"
              :rows="5"
              placeholder="请输入"
            />
            <editor-bar
              v-else
              v-model="item.tmContent"
              :is-clear="false"
              :id-edit="editorType"
              @change="itemChangeEditor($event, item, 'tmContent', 'textTmContent')"
            />
          </el-col>
          <el-col
            :span="4"
            style="line-height: 35px"
            align="center"
          >
            <el-button
              class="blueBtn"
              @click="changeInput('tmContent', item, 'textTmContent')"
            >
              {{ item.tmContentShowType ? '图文编辑' : '文本编辑' }}
            </el-button>
            <upload-file
              :upload-url="'/passport/infra/file/upload'"
              :show-file-list="false"
              :length="1"
              :upload-files="item.fileRespVO"
              :tip-show="false"
              @setUploadFiles="setUploadFiles($event, item, 'videoFileId')"
            />
          </el-col>
        </el-row>
        <el-row
          v-for="(ite, ind) in item.tmSelectList"
          :key="ind"
          style="margin-top: 20px"
        >
          <el-col
            :span="2"
            style="line-height: 100px"
          >
            <el-radio
              v-model="item.tmAnswer"
              :label="selectContent[ind]"
            >
              {{ selectContent[ind] }}
            </el-radio>
          </el-col>
          <el-col :span="18">
            <el-input
              v-if="ite.showInnput"
              v-model="ite.selectContent"
              type="textarea"
              :rows="4"
              placeholder="请输入"
            />
            <editor-bar
              v-else
              v-model="ite.selectContent"
              :is-clear="false"
              :id-edit="editorType"
              @change="changeEditors($event, ite)"
            />
          </el-col>
          <el-col
            :span="4"
            style="line-height: 35px"
            align="center"
          >
            <el-button
              class="blueBtn"
              @click="changeInputs(ite)"
            >
              {{ ite.showInnput ? '图文编辑' : '文本编辑' }}
            </el-button>
            <upload-file
              :upload-url="'/passport/infra/file/upload'"
              :show-file-list="false"
              :length="1"
              :upload-files="ite.fileRespVO"
              :tip-show="false"
              @setUploadFiles="setUploadFiles($event, ite, 'videoFileId' )"
            />
          </el-col>
        </el-row>
        <div class="tmExplain">
          答案解析：
        </div>
        <el-row>
          <el-col :span="20">
            <el-input
              v-if="item.tmExplainShowType"
              v-model="item.tmExplain"
              type="textarea"
              :rows="4"
              placeholder="请输入"
            />
            <editor-bar
              v-else
              v-model="item.tmExplain"
              :is-clear="false"
              :id-edit="editorType"
              @change="itemChangeEditor($event, item, 'tmExplain', 'textTmExplain')"
            />
          </el-col>
          <el-col
            :span="4"
            style="line-height: 35px"
            align="center"
          >
            <el-button
              class="blueBtn"
              @click="changeInput('tmExplain', item, 'textTmExplain')"
            >
              {{ item.tmExplainShowType ? '图文编辑' : '文本编辑' }}
            </el-button>
            <upload-file
              :upload-url="'/passport/infra/file/upload'"
              :show-file-list="false"
              :length="1"
              :upload-files="item.answerExplainFileRespVO"
              :tip-show="false"
              @setUploadFiles="setUploadFiles($event, item, 'videoAnswerExplainFileId')"
            />
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 10px;text-align: center">
        <el-button
          class="blueBtn"
          @click="submit"
        >
          保存小题
        </el-button>
      </div>
    </template>
    <div style="margin-top: 20px;text-align: center">
      <el-button
        class="blueBtn"
        @click="submit('close')"
      >
        提交
      </el-button>
    </div>
    <Modal
      v-model="removeModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="removeId"
      />
      <template>
        <div class="remove">
          确定要删除吗？
        </div>
        <el-button
          class="blueBtn"
          @click="sureRemove"
        >
          确定
        </el-button>
        <el-button
          class="blueBtn"
          @click="removeModal = false"
        >
          取消
        </el-button>
      </template>
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import editorBar from '../../../../tiku/jichutiku/editor/editoritem.vue'
import uploadFile from '../../../../common/uploadFile.vue'
import {newTopic as rules} from '../../rules.js'
// 当前组件引入全局的util
let Util = null
export default {
  components: {editorBar, uploadFile},
  props: ['tmSelectNum', 'tmTypeObj', 'currentTreeData', 'editData', 'examTmTypeObj', 'rowData', 'examPaperList', 'getExamTmDetail'], // 选项
  data () {
    return {
      rules,
      tabledatas: [],
      saved: true, // 是否显示每个小题的详细信息
      currentIndex: '',
      removeModal: false,
      removeId: {id: 'removeId', title: '删除'},
      editorType: 'add',
      tmContentShowType: true,
      isSaveThemeStem: false, // 是否已经保存主题干
      tmDifficultyOption: ['0.1', '0.2', '0.3', '0.4', '0.5'],
      tmRequireOption: ['掌握', '熟悉', '了解', '超纲'],
      isEnclosure: false, // 此题是否有附件
      tempData: {
        tmContent: '',
        tmExplain: ''
      },
      formValidate: {
        tmContent: '',
        tmDetailQuestionVOList: [],
        fileRespVO: null,
        videoFileId: '',
        isVideo: 0
      },
      tmDetailQuestionVO: [],
      subtitleObj: {
        tmKnowledge: '',
        tmDifficulty: '',
        tmMark: '',
        tmTypeId: '',
        tmType: '',
        tmRequire: '',
        tmGroupType: '',
        tmSelectNum: 5,
        tmContentShowType: false,
        tmContent: '',
        textTmContent: '',
        tmSelectList: [],
        tmExplain: '',
        textTmExplain: '',
        tmExplainShowType: false,
        tmAnswer: '',
        isVideo: 0,
        videoFileId: '',
        fileRespVO: null,
        answerExplainFileRespVO: null,
        answerFileRespVO: null
      },
      selectOption: {
        selectNo: '',
        selectContent: '',
        selectOrder: '',
        isVideo: 0,
        videoFileId: '',
        showInnput: true,
        textContent: '',
        fileRespVO: null
      },
      examTmTypeOptions: [],
      selectContent: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G'],
      addId: '', // 保存小题后返回的id  再次保存 需传此参数
      formValidates: {
        examPaperTmVOList: [
          {
            id: '',
            paperId: '',
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
      }
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  mounted () {
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.getExamTmType()
      this.formValidates.examPaperTmVOList[0].id = this.examPaperList[0].id
      this.formValidates.examPaperTmVOList[0].paperId = this.examPaperList[0].paperId
      this.formValidates.examPaperTmVOList[0].paperNo = this.examPaperList[0].paperNo
      this.formValidates.examPaperTmVOList[0].tmInfoList.push(...this.examPaperList[0].tmInfoList)
      if(this.editData.id) {
        this.setEditData()
      }
    },
    // 获取所有题型
    getExamTmType () {
      this.ajax({
        ajaxSuccess: (res) => {
          this.examTmTypeOptions = res.data.filter(item=>{
            return item.name === this.examTmTypeObj[this.tmTypeObj.tmTypeId].basicType
          })
          this.subtitleObj.tmTypeId = this.examTmTypeOptions[0].id
          this.subtitleObj.tmType = this.examTmTypeOptions[0].name
          console.log(this.subtitleObj, 'subtitleObjsubtitleObj')
        },
        ajaxParams: {
          url: '/tkmanage/examTmType/allList',
          method: 'get'
        }
      })
    },
    // 设置修改回显的数据
    setEditData () {
      this.formValidate.tmContent = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmContent
      let tmDetailQuestionVOList = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmDetailQuestionVOList
      this.formValidate.tmDetailQuestionVOList = tmDetailQuestionVOList
      this.formValidate.fileRespVO = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.fileRespVO
      this.tabledatas = this.$util._.defaultsDeep([], tmDetailQuestionVOList)
      this.saved = false
      console.log(this.formValidate.tmDetailQuestionVOList)
      this.$forceUpdate()
    },
    tkvalueChange (val, item) {
      this.currentExamTmType = this.examTmTypeObj[val].name
      this.formValidate.tmGroupType = this.examTmTypeObj[val].isGroup === 0 ? 'BASE' : 'GROUP' // BIG_GROUP
      this.formValidate.tmTypeId = val
      this.formValidate.tmType = this.examTmTypeObj[val].basicType
      console.log(this.currentExamTmType)
    },
    // 获取富文本数据内容
    changeEditor (res, type) {
      this.formValidate[type] = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      this.tempData[type] = res.textContent
    },
    itemChangeEditor (res, item, type, textType) {
      item[type] = res.res
      item[textType] = res.textContent
    },
    // 获取富文本数据内容
    changeEditors (res, ite) {
      ite.selectContent = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      ite.textContent = res.textContent
    },
    // 选项切换富文本
    changeInputs (ite) {
      console.log(ite)
      if(!ite.showInnput) {
        ite.selectContent = ite.textContent
      }
      ite.showInnput = !ite.showInnput
    },
    // 切换富文本输入框
    changeInput (content, item, textContent) {
      if(!item) {
        if((typeof content === 'string') && content.constructor === String) {
          if(!this[content + 'ShowType'] || !this[content + 'ShowType']) {
            this.formValidate[content] = this.tempData[content]
          }
          this[content + 'ShowType'] = !this[content + 'ShowType']
        }else {
          if(!content.showInnput) {
            content.selectContent = content.textContent
          }
          content.showInnput = !content.showInnput
        }
      }else {
        if(!item[content + 'ShowType']) {
          item[content] = item[textContent]
        }
        item[content + 'ShowType'] = !item[content + 'ShowType']
      }
      // this.$forceUpdate()
    },
    setUploadFiles (file, item, type) {
      item[type] = file || ''
      if(item.videoFileId) {
        item.isVideo = 1
      }else {
        item.isVideo = 0
        item.fileRespVO = null
      }
      if(item.videoAnswerExplainFileId) {
        item.isAnswerExplainVideo = 1
      }else {
        item.isAnswerExplainVideo = 0
        item.answerExplainFileRespVO = null
      }
    },
    // 保存主题干
    saveThemeStem () {
      if(!this.formValidate.tmContent) {
        this.errorMess('请输入主题干内容进行保存')
        return
      }
      this.isSaveThemeStem = true
    },
    addSubtitle () {
      if(!this.isSaveThemeStem) {
        this.errorMess('请首先填写主题干内容并进行保存')
        return
      }
      let obj = this.$util._.defaultsDeep({}, this.subtitleObj)
      this.tmSelectNumChange(obj.tmSelectNum, obj)
      // this.formValidate.tmDetailQuestionVOList = this.$util._.defaultsDeep([], this.tmDetailQuestionVO)
      this.tmDetailQuestionVO = [obj]
      this.saved = true
    },
    // 设置选项个数
    tmSelectNumChange (tmSelectNum, item) {
      let length = item.tmSelectList.length
      // 如果减少了选项
      if(length > tmSelectNum) {
        let reduceLen = length - tmSelectNum
        item.tmSelectList.splice(length - reduceLen, reduceLen)
      }else if(length < tmSelectNum) {
        let reduceLen = tmSelectNum - length
        for(let i = 0; i < reduceLen; i++) {
          let obj = Util._.defaultsDeep({}, this.selectOption)
          obj.selectOrder = i + 1
          obj.selectNo = i + 1
          if(item.tmType === '多选题') {
            this.$set(obj, 'checked', false)
          }
          item.tmSelectList.push(obj)
        }
      }
    },
    // eslint-disable-next-line complexity
    submit (type) {
      if(!this.formValidate.tmContent) {
        this.errorMess('请填写主题干内容')
        return
      }
      if(this.saved) { // 提交时 如果有展开的小题信息  则需要验证和添加修改小题  否则直接提交
        if(!this.tmDetailQuestionVO || !this.tmDetailQuestionVO.length) {
          this.errorMess('请添加小题')
          return
        }
        let isSubmit = this.submitForm('formValidate')
        if (!isSubmit) {return}
        let currentTitle = this.tmDetailQuestionVO[0] // 当前展示需要保存的小题内容
        console.log(currentTitle)
        if(!currentTitle.tmContent) {
          this.errorMess('请填写题目内容')
          return
        }
        // 验证是否设置选项
        if(!currentTitle.tmSelectList || !currentTitle.tmSelectList.length) {
          this.errorMess('请选择选项数')
          return
        }
        // 验证每个选项是否填写内容
        for(let i = 0; i < currentTitle.tmSelectList.length; i++) {
          let item = currentTitle.tmSelectList[i]
          if(!item.selectContent) {
            this.errorMess('请设置第' + (i + 1) + '个选项的内容')
            return
          }
        }
        // 验证是否选择正确答案
        if(!currentTitle.tmAnswer) {
          this.errorMess('请选择正确答案')
          return
        }
        // 验证是否填写答案解析
        if(!currentTitle.tmExplain) {
          this.errorMess('请填写答案解析内容')
          return
        }
        if(this.currentIndex || this.currentIndex === 0) { // 修改小题
          this.formValidate.tmDetailQuestionVOList.splice(this.currentIndex, 1, this.tmDetailQuestionVO[0])
          console.log(this.formValidate.tmDetailQuestionVOList)
        }else { // 添加小题
          this.formValidate.tmDetailQuestionVOList.push(this.tmDetailQuestionVO[0])
        }
      }
      let obj = {
        tmAnswerVOList: [],
        tmDetailQuestionVO: {},
        tmType: this.tmTypeObj.tmType,
        tmTypeId: this.tmTypeObj.tmTypeId,
        tmBaseType: this.tmTypeObj.tmType,
        tmGroupType: this.tmTypeObj.tmGroupType,
        treeId: this.currentTreeData.id,
        treePath: this.currentTreeData.path,
        tmContentDescription: '',
        isVideo: 0 // 此题是否包含附件
      }
      this.formValidate.tmDetailQuestionVOList.map((item, index) => {
        this.$set(item, 'tmNo', index + 1)
        this.$set(item, 'tmBaseType', item.tmType)
        this.$set(item, 'isEnclosure', false)
        obj.tmAnswerVOList.push({
          tmAnswer: item.tmAnswer,
          tmExplain: item.tmExplain,
          isAnswerExplainVideo: item.isAnswerExplainVideo,
          videoAnswerExplainFileId: item.videoAnswerExplainFileId,
          tmNo: index + 1
        })
      })
      obj.tmDetailQuestionVO = this.formValidate
      obj.tmContentDescription = this.tempData.tmContent || this.formValidate.tmContent
      obj.tmContentDescription = obj.tmContentDescription.substring(0, 10)
      obj.id = this.editData && this.editData.id ? this.editData.id : this.addId ? this.addId : ''
      // 得到小题或选项是否上传附件
      obj.tmDetailQuestionVO.tmDetailQuestionVOList.map(Item=>{
        Item.tmSelectList.map(item => {
          if(item.isVideo === 1) {
            this.$set(Item, 'isEnclosure', true)
          }
        })
      })
      let arr = obj.tmDetailQuestionVO.tmDetailQuestionVOList.filter(item => {
        return item.isEnclosure || item.isVideo === 1 || item.isAnswerExplainVideo === 1
      })
      obj.isVideo = arr.length ? 1 : 0
      this.save(obj, type)
      console.log(type, '12312321321')

    },
    save (data, type) {
      const tminfoList = this.formValidates.examPaperTmVOList[0].tmInfoList[0]
      tminfoList.tmKnowledge = data.tmKnowledge
      tminfoList.tmDifficulty = data.tmDifficulty
      tminfoList.tmMark = data.tmMark
      tminfoList.tmTypeId = data.tmTypeId
      tminfoList.tmType = data.tmType
      tminfoList.tmRequire = data.tmRequire
      tminfoList.tmDetailQuestionVO = data.tmDetailQuestionVO
      tminfoList.tmAnswerVOList = data.tmAnswerVOList
      tminfoList.treeId = data.treeId
      tminfoList.path = data.path
      tminfoList.id = data.id
      tminfoList.tmContentDescription = data.tmContentDescription
      tminfoList.isVideo = data.isVideo
      tminfoList.tmGroupType = this.tmTypeObj.tmGroupType
      this.saved = false
      this.currentIndex = ''
      this.ajax({
        ajaxSuccess: (res) => {
          if(type === 'close' && res.code === 0) {
            this.$emit('close')
          }else {
            this.tabledatas = this.$util._.defaultsDeep([], this.formValidate.tmDetailQuestionVOList)
            this.addId = res.data
            this.saved = false
          }
        },
        ajaxParams: {
          url: '/paper/examPaperInfo/modifyPaperTm/' + this.rowData.id,
          method: 'put',
          jsonString: true,
          data: this.formValidates
        }
      })
    },
    // 删除小题
    removeSubtitle (index) {
      this.currentIndex = index
      this.removeModal = true
    },
    // 确定删除
    sureRemove () {
      this.formValidate.tmDetailQuestionVOList.splice(this.currentIndex, 1)
      this.tabledatas = this.$util._.defaultsDeep([], this.formValidate.tmDetailQuestionVOList)
      this.removeModal = false
      this.currentIndex = ''
    },
    // 修改某一个小题
    editOne (index) {
      this.currentIndex = index
      let obj = this.$util._.defaultsDeep({}, this.tabledatas[index])
      obj.tmSelectNum = obj.tmSelectList.length
      this.tmDetailQuestionVO = [obj]
      this.saved = true
    },
    submitForm (formName) {
      let flag = true
      for (let i = 0; i < this.$refs[formName].length; i++) {
        this.$refs[formName][i].validate((valid) => {
          if (!valid) {
            flag = false
          }
        })
      }
      return flag
    }
  }
}
</script>
