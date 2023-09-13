<template>
  <div class="selectTestQuestions">
    <div>
      <el-row class="strategyContent">
        <el-col :span="6">
          <div class="strategyTitle">选择题库</div>
          <leftTreeTk
            ref="strategyTree"
            style="height: calc(100% - 25px)"
            :up-date-number="upDateNumber"
            :tree-options="treeDefaults"
            :is-page="true"
            :id="-5"
            @tree-click="treeClick"
            tkType="CLEAR_TK"
          />
        </el-col>
        <el-col :span="6">
          <div class="strategyTitle">策略</div>
          请选择左边需要的题库集，然后点击添加策略。
          <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="难度：" label-width="55px">
              <el-select v-model="sizeForm.tmDifficulty" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in difficultyQuestions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="题目类型:" label-width="75px">
              <el-select v-model="sizeForm.tmType" placeholder="请选择">
                <el-option
                  v-for="item in examTmTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="知识点：" label-width="70px">
              <el-input v-model="sizeForm.tmKnowledge"></el-input>
            </el-form-item>
            <el-form-item label="使用次数大于：" label-width="110px">
              <el-input v-model="sizeForm.tmSylBegin"></el-input>
            </el-form-item>
            <el-form-item label="使用次数小于：" label-width="110px">
              <el-input v-model="sizeForm.tmSylEnd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="blueBtn" @click="addStrategy">筛选</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <div class="strategyTitle">待选试题详细信息</div>
          <el-table ref="manualPaperTable" :row-key="getRowKey" :data="formValidate.tableData" style="width: 100%" :height="210" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <el-table-column prop="index" label="序号" align="center" width="80">
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column prop="tmType" label="题型" align="center" width="100"></el-table-column>
            <el-table-column prop="tmContentDescription" label="题目内容" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isVideo" label="是否包含音视频" align="center" width="130">
              <template slot-scope="scope">{{scope.isVideo === 1 ? '是' : '否'}}</template>
            </el-table-column>
          </el-table>
          <div style="float: right;margin-top:10px;">
            <el-pagination  :small="true" @size-change="changePageSize"
                            @current-change="changePage"
                            :current-page="myPages.currentPage"
                            :page-sizes="myPages.pageSizes"
                            :page-size="myPages.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount">
                            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <div class="tmTypeTitle">
        题型统计
        <el-button class="blueBtn" @click="removeSelect">删除</el-button>
      </div>
      <el-table ref="testTable" :data="paperInformation[0].questionInformation" style="width: 100%" :height="210" @selection-change="paperSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" width="80">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="tmType" label="题型" align="center" width="100"></el-table-column>
        <el-table-column prop="tmContentDescription" label="题目内容" align="center" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-button style="margin-left:47%;" class="blueBtn" @click="submit">确定</el-button>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import leftTreeTk from '../../../tiku/jichutiku/leftTreetiku'
// 当前组件引入全局的util
let Util = null
export default {
  components: {leftTreeTk},
  props: ['operailityData', 'examPaperList', 'rowData', 'getEditData'],
  data () {
    return {
      formValidates: {
        examPaperTmVOList: [
          {
            id: '',
            parperId: '',
            paperNo: '',
            tmInfoList: []
          }
        ]
      },
      styleContent: {},
      paperInformation: [],
      examTmTypeOptions: [],
      upDateNumber: 1,
      totalCount: 0,
      // tree默认项设置
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/tree',
        getDataUrl: '',
        isShowSearch: false,
        isShowMenus: false,
        defaultProps: {
          label: 'name',
          children: 'children'
        }
      },
      currentTreeData: {}, // 当前点击的数节点数据
      sizeForm: {
        tmDifficulty: '',
        tmKnowledge: '',
        tmSylBegin: '',
        tmSylEnd: '',
        tmTypeList: [],
        treeId: '',
        treeName: '',
        tmType: '',
        needDetail: 1
      },
      paperTxorder: [],
      difficultyQuestions: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      formValidate: {
        tableData: []
      },
      myPages: {},
      currentSelectTm: [] // 当前试卷已选择的需要删除的试题
    }
  },
  created () {
    Util = this.$util
    // 样式设置数据   提交数据用
    if(Object.keys(this.$store.getters.getStyleContent).length) {
      this.styleContent = this.$store.getters.getStyleContent
    }
    this.paperTxorder = this.styleContent.paperTmTypeList
    // this.sizeForm.tmTypeList = this.styleContent.paperTmTypeList.join(',')
    if(this.$store.getters.getPaperInformation.length) {
      this.paperInformation = this.$store.getters.getPaperInformation
    }else {
      this.paperInformation.push({
        questionInformation: [],
        tmIds: []
      })
    }
    // const tminfoList = this.formValidates.examPaperTmVOList[0].tmInfoList[0]
    this.formValidates.examPaperTmVOList[0].id = this.examPaperList[0].id
    this.formValidates.examPaperTmVOList[0].paperId = this.examPaperList[0].paperId
    this.formValidates.examPaperTmVOList[0].paperNo = this.examPaperList[0].paperNo
    this.init()
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.getExamTmType()
    },
    getRowKey (row) {
      return row.id
    },
    // 获取所有题型
    getExamTmType () {
      this.ajax({
        ajaxSuccess: (res) => {
          this.examTmTypeOptions = res.data
          // res.data.forEach(item => {
          //   this.sizeForm.tmType = item.name
          // })
          // 获取回显的数据
          if(this.rowData.id) {
            this.getExamTmDetail()
          }
        },
        ajaxParams: {
          url: '/tkmanage/examTmType/allList',
          method: 'get'
        }
      })
    },
    submit () {
      this.paperInformation[0].questionInformation.forEach(item => {
        this.formValidates.examPaperTmVOList[0].tmInfoList.push({
          tmKnowledge: item.tmKnowledge,
          tmDifficulty: item.tmDifficulty,
          tmMark: item.tmMark,
          tmTypeId: item.tmTypeId,
          tmType: item.tmType,
          tmRequire: item.tmRequire,
          tmGroupType: item.tmGroupType,
          tmDetailQuestionVO: item.tmDetailQuestionVO,
          tmAnswerVOList: item.tmAnswerVOList,
          id: item.id,
          tmContentDescription: item.tmContentDescription,
          isVideo: item.isVideo,
          treeId: item.treeId,
          treePath: item.treePath
        })
      })
      this.formValidates.examPaperTmVOList[0].tmInfoList.push(...this.examPaperList[0].tmInfoList)
      this.ajax({
        ajaxSuccess: (res) => {
          if (res.code === 0) {
            this.$message({ message: '添加成功', type: 'success'})
            this.$emit('cancel', 'add')
            this.getEditData()
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
    // 筛选
    addStrategy () {
      this.myPages = Util.pageInitPrams
      this.sizeForm.curPage = this.myPages.currentPage
      this.sizeForm.pageSize = Util.pageInitPrams.pageSize
      let queryQptions = {
        url: '/tkmanage/examTmDetail/listPage',
        method: 'get',
        params: this.sizeForm,
        jsonString: true
      }
      this.ajax({
        ajaxSuccess: (res) => {
          console.log(res.data.list)
          res.data.list.forEach(item => {
            item.treeId = this.sizeForm.treeId
          })
          this.formValidate.tableData = res.data.list
          this.totalCount = res.data.total
          // 当点到相同的左侧树时，回显已经勾选的数据
          let idsArr = []
          this.paperInformation[0].questionInformation.forEach(item => {
            idsArr.push(item.id)
          })
          let tempArr = this.formValidate.tableData.filter(item => {
            return idsArr.includes(item.id)
          })
          this.$nextTick(function () {
            if(tempArr.length) {
              tempArr.forEach(row => {
                this.$refs.manualPaperTable[0].toggleRowSelection(row, true)
              })
            }
          })
          this.$forceUpdate()
        },
        ajaxParams: queryQptions
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      val.forEach(item => {
        if(!this.paperInformation[0].tmIds.includes(item.id)) {
          this.paperInformation[0].questionInformation.push(item)
        }
      })
      this.paperInformation[0].questionInformation.forEach(item => {
        this.paperInformation[0].tmIds.push(item.id)
      })
    },
    // 当前试卷已勾选需要删除的试题
    paperSelectionChange (val) {
      this.currentSelectTm = val
    },
    // 删除当前试卷已选择的试题
    removeSelect () {
      if(!this.currentSelectTm || !this.currentSelectTm.length) {
        return
      }
      let ids = []
      this.currentSelectTm.forEach(item => {
        ids.push(item.id)
      })
      let questionInformation = this.paperInformation[0].questionInformation
      for(let i = 0; i < questionInformation.length; i++) {
        if(ids.includes(questionInformation[i].id)) {
          questionInformation.splice(i, 1)
          i--
        }
      }
      this.paperInformation.questionInformation = questionInformation
    },
    treeClick (obj, node, self) {
      this.currentTreeData = obj
      this.sizeForm.treeId = obj.id
      this.sizeForm.treeName = obj.name
    }
  }

}
</script>
<style lang="less">
.selectTestQuestions {
  width: 100%;
  .el-table {
    th {
      background-color: #fff !important;
      border: 1px solid #EBEEF5;
    }
    .el-table__cell {
      padding: 0!important;
    }
  }
  .strategyContent {
    height: 280px;
    .el-col {
      height: 100%;
      border: 1px solid #409eff;
      border-right: none;
      .el-form {
        padding: 3px;
      }
    }
    .el-col:nth-child(3) {
      border-right: 1px solid #409eff;
    }
    .strategyTitle {
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #409eff;
    }
  }
  .tmTypeTitle {
    text-align: center;
    .el-button {
      float: right;
    }
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 8px;
}
}

</style>
