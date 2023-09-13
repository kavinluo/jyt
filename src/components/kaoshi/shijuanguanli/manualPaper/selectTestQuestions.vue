<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/27
****--@author   yyl
----------------------------------->
<template>
  <div class="selectTestQuestions">
    <div v-for="(Item, Index) in paperInformation" :key="Index">
      <template v-if="Index === currentIndex">
        <div class="title">试题选择-第{{currentIndex + 1}}份试卷</div>
        <el-row class="strategyContent">
          <el-col :span="6">
            <div class="strategyTitle">选择题库</div>
            <leftTreeTk
                ref="strategyTree"
                style="height: calc(100% - 25px)"
                :up-date-number="upDateNumber"
                :tree-options="treeDefaults"
                :is-page="true"
                @tree-click="treeClick"
                tkType="CLEAR_TK"
            />
          </el-col>
          <el-col :span="6">
            <div class="strategyTitle">策略</div>
            请选择左边需要的题库集，然后点击添加策略。
            <el-form ref="form" :model="queryQptions" label-width="80px" size="mini">
              <el-form-item label="难度：" label-width="55px">
                <el-select v-model="queryQptions.tmDifficulty" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option
                      v-for="item in difficultyQuestions"
                      :key="item"
                      :label="item"
                      :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="知识点：" label-width="70px">
                <el-input v-model="queryQptions.tmKnowledge"></el-input>
              </el-form-item>
              <el-form-item label="使用次数大于：" label-width="110px">
                <el-input v-model="queryQptions.tmSylBegin"></el-input>
              </el-form-item>
              <el-form-item label="使用次数小于：" label-width="110px">
                <el-input v-model="queryQptions.tmSylEnd"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="blueBtn" @click="setTableData(currentIndex)" v-if="type !== 'edit'">筛选</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="strategyTitle">待选试题详细信息</div>
            <el-table ref="manualPaperTable" :row-key="getRowKey" :data="formValidate.tableData" style="width: 100%" :height="210" @selection-change="handleSelectionChange"  v-loading="loading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
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
              <el-pagination @size-change="changePageSize"
                             @current-change="changePage"
                             :current-page="myPages.currentPage"
                             :page-sizes="myPages.pageSizes"
                             :page-size="myPages.pageSize"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="totalCount"></el-pagination>
            </div>
          </el-col>
        </el-row>
        <div class="tmTypeTitle">题型统计
          <el-button class="blueBtn" @click="removeSelect" v-if="type !== 'edit'">删除</el-button>
        </div>
        <el-table ref="testTable" :data="paperInformation[currentIndex].questionInformation" style="width: 100%" :height="210" @selection-change="paperSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="index" label="序号" align="center" width="80">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column prop="tmType" label="题型" align="center" width="100"></el-table-column>
          <el-table-column prop="tmContentDescription" label="题目内容" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isVideo" label="是否包含音视频" align="center" width="130">
            <template slot-scope="scope">{{scope.isVideo === 1 ? '是' : '否'}}</template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 20px">
          <el-button class="blueBtn" @click="lastStep(Index)">上一步</el-button>
          <el-button class="blueBtn" @click="nextStep(Index)">下一步</el-button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import leftTreeTk from '../../../tiku/jichutiku/leftTreetiku'
// 当前组件引入全局的util
let Util = null
export default {
  props: ['isLastQuestion', 'editData', 'type'], // 是否直接显示最后一份试卷
  data () {
    return {
      loading: false,
      currentIndex: 0, // 当前显示的是第几份试卷
      styleContent: {},
      paperInformation: [],
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
      queryQptions: {
        tmDifficulty: '',
        tmKnowledge: '',
        tmSylBegin: '',
        tmSylEnd: '',
        tmTypeList: [],
        treeId: '',
        treeName: ''
      },
      paperTxorder: [],
      difficultyQuestions: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      formValidate: {
        tableData: []
      },
      myPages: {},
      currentSelectTm: [], // 当前试卷已选择的需要删除的试题
      editFirst: true // 是否是首次进入到修改页面，首次进入修改页面才回显后台返回的值
    }
  },
  methods: {
    getRowKey (row) {
      return row.id
    },
    // 初始化请求列表数据
    init () {
      // 修改时，回显试卷选择的试题 并且是首次进入修改页面
      if(Object.keys(this.editData).length && this.editFirst) {
        let examPaperTmVOList = this.editData.examPaperTmVOList
        examPaperTmVOList.forEach((item, index) => {
          this.paperInformation[index].questionInformation = item.tmInfoList
          item.tmInfoList.forEach(tmItem => {
            this.paperInformation[index].tmIds.push(tmItem.id)
          })
        })
        this.editFirst = false
      }
    },
    treeClick (obj, node, self) {
      this.currentTreeData = obj
      this.queryQptions.treeId = obj.id
      this.queryQptions.treeName = obj.name
    },
    // 筛选
    setTableData () {
      console.log(this.myPages, 'this.myPages')
      this.loading = true
      this.myPages = Util.pageInitPrams
      this.queryQptions.curPage = this.myPages.currentPage
      // this.queryQptions.pageSize = Util.pageInitPrams.pageSize
      let queryQptions = {
        url: '/tkmanage/examTmDetail/listPage',
        method: 'get',
        params: this.queryQptions
        // jsonString: true
      }
      this.ajax({
        ajaxSuccess: (res) => {
          if (res.code === 0) {
            this.loading = false
          }
          res.data.list.forEach(item => {
            item.treeId = this.queryQptions.treeId
          })
          this.formValidate.tableData = res.data.list
          this.totalCount = res.data.total
          // 当点到相同的左侧树时，回显已经勾选的数据
          let idsArr = []
          this.paperInformation[this.currentIndex].questionInformation.forEach(item => {
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
      val.forEach(item => {
        if(!this.paperInformation[this.currentIndex].tmIds.includes(item.id)) {
          this.paperInformation[this.currentIndex].questionInformation.push(item)
        }
      })
      this.paperInformation[this.currentIndex].questionInformation.forEach(item => {
        this.paperInformation[this.currentIndex].tmIds.push(item.id)
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
      let questionInformation = this.paperInformation[this.currentIndex].questionInformation
      for(let i = 0; i < questionInformation.length; i++) {
        if(ids.includes(questionInformation[i].id)) {
          questionInformation.splice(i, 1)
          i--
        }
      }
      this.paperInformation[this.currentIndex].questionInformation = questionInformation
    },
    // 上一步
    lastStep (Index) {
      if(Index === 0) {
        this.$emit('setStep', 'style')
      }else {
        this.currentIndex--
        this.init()
      }
      this.$store.commit('setPaperInformation', this.paperInformation)
      this.$store.commit('setEditFirst', this.editFirst)
    },
    // 下一步
    nextStep (Index) {
      if(!this.paperInformation[this.currentIndex].questionInformation.length) {
        this.errorMess('请在待选试题里选择试题后进行下一步')
        return
      }
      let tempObj = {}
      let tempScore = {}
      this.paperTxorder.forEach(item=>{
        tempObj[item] = []
        tempScore[item] = 0
      })
      this.paperInformation.forEach((Item, Index) => {
        Item.tacTmtypeObj = this.$util._.defaultsDeep({}, tempObj)
        Item.tempScore = this.$util._.defaultsDeep({}, tempScore)
        for(let k in Item.tacTmtypeObj) {
          Item.questionInformation.forEach(item => {
            if(item.tmType === k) {
              Item.tacTmtypeObj[k].push(item)
            }
          })
        }
      })
      // 当前试卷和上一张试卷比较试题数量是否一致
      console.log(this.paperInformation, this.currentIndex)
      if(this.currentIndex !== 0) {
        let tacTmtypeObj = this.paperInformation[this.currentIndex].tacTmtypeObj // 当前试卷的题型数量
        let lastTacTmtypeObj = this.paperInformation[this.currentIndex - 1].tacTmtypeObj // 上一份试卷的题型数量
        console.log(tacTmtypeObj, lastTacTmtypeObj)
        for(let k in tacTmtypeObj) {
          console.log(tacTmtypeObj[k], lastTacTmtypeObj[k])
          if(tacTmtypeObj[k].length !== lastTacTmtypeObj[k].length) {
            this.errorMess('当前试卷和上一张试卷的题型数量不一致，请修改后继续进行设置')
            return
          }
        }
      }
      if(Index >= this.paperInformation.length - 1) {
        this.$emit('setStep', 'statistics')
      }else {
        this.currentIndex++
        this.init()
      }
      this.$store.commit('setPaperInformation', this.paperInformation)
      this.$store.commit('setEditFirst', this.editFirst)
    }
  },
  created () {
    Util = this.$util
    // 样式设置数据   提交数据用
    if(Object.keys(this.$store.getters.getStyleContent).length) {
      this.styleContent = this.$store.getters.getStyleContent
    }
    this.paperTxorder = this.styleContent.paperTmTypeList
    this.queryQptions.tmTypeList = this.styleContent.paperTmTypeList.join(',')
    if(this.$store.getters.getPaperInformation.length) {
      this.paperInformation = this.$store.getters.getPaperInformation
    }else {
      let paperNum = this.styleContent.paperRanNum
      for(let i = 0; i < paperNum; i++) { // 创建一共有积分试卷信息
        this.paperInformation.push({
          questionInformation: [],
          tmIds: []
        })
      }
    }
    if(this.isLastQuestion) {
      this.currentIndex = this.paperInformation.length - 1
    }
    if(this.$store.getters.getEditFirst) {
      this.editFirst = this.$store.getters.getEditFirst
    }
    this.init()
  },
  mounted () {
  },
  components: {leftTreeTk}
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
}

</style>
