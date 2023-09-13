<!----------------------------------
****--@name     内容设置
****--@role     ${*}
****--@date     2022/12/26
****--@author   yyl
----------------------------------->
<template>
  <div class="contentSettings" v-loading="loadings" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
    <div class="title">内容设置</div>
    <el-row class="strategyContent">
      <el-col :span="6">
        <div class="strategyTitle">选择题库</div>
        <leftTreeTk
          ref="strategyTree"
          style="height: calc(100% - 25px)"
          :up-date-number="upDateNumber"
          :tree-options="treeDefaults"
          :currentKey="currentKey"
          :is-page="true"
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
        <div class="strategyTitle">题型统计</div>
        <el-table :data="formValidate.tableData" style="width: 100%" :height="210"  v-loading="loading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
          <el-table-column prop="date" label="编号" align="center">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="tmType" label="题型名称" align="center"></el-table-column>
          <el-table-column prop="tmNum" label="待选小题数量" align="center"></el-table-column>
          <el-table-column prop="address" label="已选数量" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.tmNum" v-model.number="scope.row.selectNum" size="mini"></el-input>
              <span v-else>{{scope.row.selectNum}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 5px;text-align: center">
          <el-button class="blueBtn" @click="sureAdd">确定</el-button>
          <!-- <el-button class="blueBtn" @click="editTmVOList">修改</el-button>
          <el-button class="blueBtn" @click="removeTmVOList">删除</el-button> -->
        </div>
      </el-col>
    </el-row>
    <table class="tmInfo">
      <thead>
        <tr>
          <th>目录树Id</th>
          <th>试题目录树</th>
          <th>难度</th>
          <th v-for="item in paperTxorder" :key="item">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="Item in formValidate.examPaperTmVOList" :key="Item.treeId">
          <td><el-radio v-model="radioTreeId" :label="Item.treeId"></el-radio></td>
          <td>{{Item.treeName}}</td>
          <td>{{!Item.tmDifficulty ? '全部' : Item.tmDifficulty}}</td>
          <td v-for="(item, key) in Item.tacTmtypeObj" :key="key">{{item}}</td>
        </tr>
        <tr v-if="topicContent.paperRegularmark === 0">
          <td colspan="3">题型分数（双击可修改）</td>
            <td v-for="(val, key) in questionTypeScore" :key="key" @dblclick="showInput(val)">
            <span v-if="val.showType">{{val.score}}</span>
            <span v-else><el-input v-model.number="val.score" size="small" @blur="typeScoreBlur(val)"></el-input></span>
          </td>
        </tr>
        <tr>
          <td colspan="3">数量统计</td>
          <td v-for="(val, key) in paperTxorder" :key="key">{{formValidate.quantityStatistics[val]}}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <table class="statistics">
      <thead>
        <tr>
          <th>分数定义</th>
          <th>通过分数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><el-radio v-model="topicContent.paperRegularmark" :label="1">使用题库中试题的分数，并将总分折算为
            <el-input size="mini" style="width: 100px" v-model.number="topicContent.paperConversion100" :readonly="topicContent.paperRegularmark === '1'" @change="paperConversion100Change"></el-input></el-radio></td>
          <td><el-input size="mini" v-model.number="formValidate.paperPassmarkOne" :readonly="topicContent.paperRegularmark === '0'" style="width: 100px"></el-input></td>
        </tr>
        <tr>
          <td><el-radio v-model="topicContent.paperRegularmark" :label="0">忽略试题原分数，按题型指定分数，总分：{{formValidate.paperConversionTwo100}}</el-radio></td>
          <td><el-input size="mini" v-model.number="formValidate.paperPassmarkTwo" :readonly="topicContent.paperRegularmark === '1' || !formValidate.paperConversionTwo100" @change="paperPassmarkTwoChange" style="width: 100px"></el-input></td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: center;margin-top: 20px">
      <el-button class="blueBtn" @click="lastStep">上一步</el-button>
      <el-button class="blueBtn" @click="sureComit">确定</el-button>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import leftTreeTk from '../../../tiku/jichutiku/leftTreetiku'
// 当前组件引入全局的util
export default {
  props: ['paperTxorder', 'editData'],
  data () {
    return {
      loading: false,
      loadings: false,
      radioTreeId: '',
      editTmVOListIndex: '', // 修改题型数量当前下标
      editTmVOListItem: {}, // 修改题型数量当前项
      upDateNumber: 1,
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
      currentKey: '',
      radio: '',
      currentTreeData: {}, // 当前点击的数节点数据
      sizeForm: {
        tmDifficulty: '',
        tmKnowledge: '',
        tmSylBegin: '',
        tmSylEnd: '',
        tmTypeList: [],
        treeId: '',
        treeName: '',
        treePath: ''
      },
      topicContent: {
        paperRegularmark: 1, // 是否固定分
        paperConversion100: 100, // 满分
        paperPassmark: 0, // 通过分数
        examPaperStrategyVOList: [], // 添加的试卷策略
        examPaperTmTypeVOList: [] // 固定分值时   各题型分
      },
      formValidate: {
        tableData: [],
        examPaperTmVOList: [],
        quantityStatistics: {}, // 计算添加策略的题  数量统计
        questionScore: {}, // 题型分数
        paperConversionTwo100: 0,
        paperPassmarkOne: 60, // 通过设置满分 通过分数   第一行
        paperPassmarkTwo: 0, // 通过个题型分数设置  通过分数   第二行
        editFirst: true // 是否是首次进入到修改页面，首次进入修改页面才回显后台返回的值
      },
      difficultyQuestions: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      // styleContent: {},
      showType: 'add',
      questionTypeScore: [] // 题型分数用  判断题型和是否可以修改题型分数
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.sizeForm.tmTypeList = this.paperTxorder.join(',') // 设置第一步选择的题型
      console.log(this.paperTxorder)
    },
    treeClick (obj, node, self) {
      this.currentTreeData = obj
      this.sizeForm.treeId = obj.id
      this.sizeForm.treePath = obj.path
      this.sizeForm.treeName = obj.name
    },
    addStrategy () {
      this.loading = true
      if(!this.sizeForm.treeId) {
        this.errorMess('请选择左侧树节点')
        return
      }
      this.ajax({
        ajaxSuccess: (res) => {
          if (res.code === 0) {
            this.loading = false
          }
          this.formValidate.tableData = res.data
          this.formValidate.tableData.forEach(item => {
            this.$set(item, 'selectNum', 0)
          })
        },
        ajaxParams: {
          url: '/tkmanage/examTmDetail/queryTmTypeNum',
          method: 'get',
          jsonString: true,
          params: this.sizeForm
        }
      })
    },
    // showInput 双击修改分数
    showInput (item) {
      item.showType = !item.showType
    },
    // 题型分数改变后  重新计算题型指定总分
    typeScoreBlur (item) {
      this.formValidate.questionScore[item.type] = item.score
      item.showType = true
      this.getTmTypeScore()
    },
    // 添加所选的试题到列表
    // eslint-disable-next-line complexity
    sureAdd () {
      console.log(this.formValidate.tableData)
      if(!this.formValidate.tableData.length) {
        this.errorMess('请先添加策略')
        return
      }
      let tacTmtypeObj = {}
      // 添加策略后 表格回显  题型按第一步添加的题型顺序显示
      this.paperTxorder.map(IItem => {
        tacTmtypeObj[IItem] = ''
      })
      console.log(this.formValidate.tableData)
      this.formValidate.tableData.forEach(item => {
        tacTmtypeObj[item.tmType] = item.selectNum
      })
      console.log(tacTmtypeObj)
      let tempData = []
      tempData.push({
        tacTmtype: Object.keys(tacTmtypeObj),
        tacTmtypeObj: tacTmtypeObj
      })
      console.log(tempData, 'tempDatatempData')
      for (let k in this.sizeForm) {
        tempData.forEach(item => {
          item[k] = this.sizeForm[k]
        })
      }
      let arr = this.formValidate.tableData.filter(item => {
        return item.selectNum > item.tmNum
      })
      if(arr.length !== 0) {
        this.errorMess('已选数量不能大于待选小题数量')
        return
      }
      let flag = false
      console.log(tempData)
      if(this.formValidate.examPaperTmVOList.length) {
        for(let i = 0; i < this.formValidate.examPaperTmVOList.length; i++) {
          let item = this.formValidate.examPaperTmVOList[i]
          if(item.treeId === tempData[0].treeId) {
            flag = true
            this.formValidate.examPaperTmVOList.splice(i, 1, tempData[0])
          }
        }
      }
      // 证明添加的策略不是已经选择过的数组上
      if(!flag) {
        this.formValidate.examPaperTmVOList.push(tempData[0])
      }
      console.log(this.formValidate.examPaperTmVOList)
      // quantityStatistics
      let tempObj = {}
      for (let i = 0; i < this.paperTxorder.length; i++) {
        let item = this.paperTxorder[i]
        tempObj[item] = []
        this.formValidate.questionScore[item] = 1
        this.formValidate.quantityStatistics[item] = ''
        this.formValidate.examPaperTmVOList.forEach(Item => {
          tempObj[item].push(Item.tacTmtypeObj[item])
        })
      }
      console.log(tempObj)
      for (let k in tempObj) {
        this.formValidate.quantityStatistics[k] = tempObj[k].reduce((pre, cur) => {
          return pre + cur
        })
      }
      console.log(this.formValidate.quantityStatistics)
      console.log(this.$refs.strategyTree)
      // 计算指定题型分数后总分和通过分数
      this.getTmTypeScore()
      this.topicContent.examPaperStrategyVOList = []
      console.log(this.formValidate.examPaperTmVOList)
      this.formValidate.examPaperTmVOList.forEach(item=>{
        for(let i in item.tacTmtypeObj) {
          this.topicContent.examPaperStrategyVOList.push({
            treeId: item.treeId,
            tacNum: item.tacTmtypeObj[i],
            tacTmtype: i,
            treeRoadname: item.treeName,
            tacDifficulty: item.tmDifficulty
          })
        }
      })
      // examPaperStrategyVOList
      console.log(this.topicContent.examPaperStrategyVOList)
      this.formValidate.tableData = []
      this.currentTreeData = {}
      // this.$refs.strategyTree.currentNodeKey = ''
    },
    // 指定题型分数后 计算总分和通过分数
    getTmTypeScore () {
      let tempScoreObj = []
      for(let k in this.formValidate.quantityStatistics) {
        tempScoreObj.push(this.formValidate.quantityStatistics[k] * this.formValidate.questionScore[k])
      }
      console.log(tempScoreObj)
      // paperConversionTwo100
      this.formValidate.paperConversionTwo100 = tempScoreObj.reduce((pre, cur) => {
        return pre + cur
      })
      console.log(this.formValidate.paperConversionTwo100)
      this.formValidate.paperPassmarkTwo = (this.formValidate.paperConversionTwo100 * 0.6).toFixed(1)
    },
    // 删除选中的题型  试题
    removeTmVOList () {
      for(let i = 0; i < this.formValidate.examPaperTmVOList.length; i++) {
        let item = this.formValidate.examPaperTmVOList[i]
        if(this.radioTreeId === item.treeId) {
          this.formValidate.examPaperTmVOList.splice(i, 1)
          i--
        }
      }
    },
    // 修改已选题型的数量
    editTmVOList () {
      for(let i = 0; i < this.formValidate.examPaperTmVOList.length; i++) {
        let item = this.formValidate.examPaperTmVOList[i]
        if(this.radioTreeId === item.treeId) {
          this.editTmVOListIndex = i
          this.editTmVOListItem = item
        }
      }
      this.sizeForm.treeId = this.editTmVOListItem.treeId
      this.sizeForm.treePath = this.editTmVOListItem.treePath
      this.sizeForm.treeName = this.editTmVOListItem.treeName
      this.ajax({
        ajaxSuccess: (res) => {
          this.currentKey = this.editTmVOListItem.treeId
          this.formValidate.tableData = res.data
          this.formValidate.tableData.forEach(item => {
            this.$set(item, 'selectNum', this.editTmVOListItem.tacTmtypeObj[item.tmType])
          })
        },
        ajaxParams: {
          url: '/tkmanage/examTmDetail/queryTmTypeNum',
          method: 'post',
          jsonString: true,
          params: this.sizeForm
        }
      })
    },
    checkedChange (val, item) {
      console.log(val, item)
    },
    // 改变满分  重新计算通过分数
    paperConversion100Change (val) {
      this.formValidate.paperPassmarkOne = (val * 0.6).toFixed(1)
    },
    // 第二行通过分数改变
    paperPassmarkTwoChange (val) {
      if(val > this.formValidate.paperConversionTwo100) {
        this.errorMess('通过分数应小于题型分数')
        this.formValidate.paperPassmarkTwo = (this.formValidate.paperConversionTwo100 * 0.6).toFixed(1)
        return
      }
    },
    lastStep () {
      this.$store.commit('setContentData', this.topicContent)
      this.$store.commit('setTempContent', this.formValidate)
      this.$emit('setStep', 'style', this.paperTxorder)
    },
    // 提交
    sureComit () {
      this.loadings = true
      // 样式设置数据   提交数据用
      let styleContent = {}
      if(Object.keys(this.$store.getters.getStyleContent).length) {
        styleContent = this.$store.getters.getStyleContent
      }
      if(this.topicContent.paperRegularmark === 1) {
        this.topicContent.paperPassmark = this.formValidate.paperPassmarkOne
        this.$store.commit('setContentData', this.topicContent)
      }else if(this.topicContent.paperRegularmark === 0) {
        this.topicContent.paperPassmark = this.formValidate.paperPassmarkTwo
        this.topicContent.paperConversion100 = this.formValidate.paperConversionTwo100
        let tempArr = []
        for(let i = 0; i < styleContent.paperTmTypeInfo.length; i++) {
          let item = styleContent.paperTmTypeInfo[i]
          tempArr.push({
            tmTypeId: item.id,
            tmTypeName: item.name,
            tmTypeOrder: i,
            tmTypeScore: this.formValidate.questionScore[item.name]
          })
        }
        this.topicContent.examPaperTmTypeVOList = tempArr
        this.$store.commit('setContentData', this.topicContent)
      }

      let topicContent = {}

      if(Object.keys(this.$store.getters.getContentData).length) {
        topicContent = this.$store.getters.getContentData
      }
      console.log(this.$store.getters.getStyleContent, this.topicContent, 2222222)
      let submitData = {}
      for(let k in styleContent) {
        submitData[k] = this.$store.getters.getStyleContent[k]
      }
      for(let k in this.topicContent) {
        submitData[k] = this.topicContent[k]
      }
      console.log(this.$store.getters.getStyleContent.paperTime, submitData)
      submitData.paperTime = this.$store.getters.getStyleContent.paperTime
      this.ajax({
        ajaxSuccess: (res) => {
          console.log(res)
          if (res.code === 0) {
            this.loadings = false
          }
          this.$emit('success')
        },
        ajaxParams: {
          url: '/paper/examPaperInfo/saveManualPaper',
          method: 'post',
          data: submitData,
          jsonString: true
        }
      })
    }

  },
  created () {
    if(this.editData && Object.keys(this.editData).length && this.formValidate.editFirst) {
      this.showType = 'edit'
      for(let k in this.editData) {
        this.formValidate[k] = this.editData[k]
        this.topicContent[k] = this.editData[k]
      }
      // 已添加的策略回显
      let treeIds = []
      this.formValidate.examPaperTmVOList = []
      this.editData.examPaperStrategyVOList.forEach(item => {
        if(!treeIds.includes(item.treeId)) {
          treeIds.push(item.treeId)
        }
      })
      let tacTmtypeObj = {}
      console.log(this.paperTxorder)
      this.paperTxorder.forEach(item => {
        tacTmtypeObj[item] = 0
        this.formValidate.questionScore[item] = 1 // 设置题型分数
        this.formValidate.quantityStatistics[item] = 0 // 设置各题型数量统计
      })
      treeIds.forEach(item=>{
        this.formValidate.examPaperTmVOList.push({
          treeId: item,
          tacTmtypeObj: tacTmtypeObj
        })
      })
      this.editData.examPaperStrategyVOList.forEach(Item => {
        this.formValidate.examPaperTmVOList.forEach(item => {
          for(let k in item.tacTmtypeObj) {
            if(k === Item.tacTmtype && Item.treeId === item.treeId) {
              console.log(Item, 'ItemItem')
              // item.tacTmtypeObj[k] = Item.tacNum
              this.$set(item.tacTmtypeObj, k, Item.tacNum)
              this.$set(item, 'treeName', Item.treeRoadname)
              this.$set(item, 'tmDifficulty', Item.tacDifficulty)
            }
          }
        })
        // 回显题型数量统计
        for(let k in this.formValidate.quantityStatistics) {
          if(k === Item.tacTmtype) {
            this.formValidate.quantityStatistics[k] += Item.tacNum
          }
        }
      })
      // 设置题型分数
      this.editData.examPaperTmTypeVOList.forEach(item => {
        for(let k in this.formValidate.questionScore) {
          if(k === item.tmTypeName) {
            this.formValidate.questionScore[k] = item.tmTypeScore
          }
        }
      })
      if(this.editData.paperRegularmark === 0) { // 选择了忽略原试题分数
        this.formValidate.paperConversionTwo100 = this.editData.paperConversion100 // 总分
        this.formValidate.paperPassmarkTwo = this.editData.paperPassmark // 通过分数
        this.topicContent.paperConversion100 = 100 // 总分
        this.formValidate.paperPassmarkOne = 60 // 通过分数
        // 修改回显数据时,如果选择了忽略试题原分数  则进行题型分数回显数据设置
        this.editData.examPaperTmTypeVOList.forEach(item => {
          this.questionTypeScore.push({
            type: item.tmTypeName,
            showType: true,
            score: item.tmTypeScore
          })
        })
      }else if(this.editData.paperRegularmark === 1) { // 选择了使用题库中的分数
        this.topicContent.paperConversion100 = this.editData.paperConversion100 // 总分
        this.formValidate.paperPassmarkOne = this.editData.paperPassmark // 通过分数
        //  修改回显数据时，如果选择了使用试题原分数  则设置默认题型分数
        this.paperTxorder.forEach(item => {
          this.questionTypeScore.push({
            type: item,
            showType: true,
            score: 1
          })
        })
      }
      this.formValidate.editFirst = false
    }else {
      this.paperTxorder.forEach(item => {
        this.questionTypeScore.push({
          type: item,
          showType: true,
          score: 1
        })
      })
    }
    if(Object.keys(this.$store.getters.getTempContent).length) {
      this.formValidate = this.$store.getters.getTempContent
    }
    if(Object.keys(this.$store.getters.getContentData).length) {
      this.topicContent = this.$store.getters.getContentData
    }
    this.init()
  },
  mounted () {
  },
  components: {leftTreeTk}
}
</script>
<style lang="less">
.contentSettings {
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
  .statistics, .tmInfo {
    text-align: center;
    width: 100%;
    border-collapse: collapse;
    thead {
      line-height: 45px;
      tr {
        background-color: #00a3da;
        color: #fff;
        font-weight: 400;
        th {
          padding: 0 5px;
          border: 1px solid #409eff;
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        th, td {
          border: 1px solid #409eff;
          text-align: center;
          line-height: 45px;
        }
        td:nth-child(1) {
          text-align: left;
          padding-left: 180px;
        }
      }
    }
  }
  .tmInfo {
    thead {
      line-height: 30px;
      tr {
        background-color: #fff;
        color: #606266;
      }
    }
    tbody {
      tr {
        th, td {
          line-height: 30px;
        }
        td:nth-child(1) {
          text-align: center;
          padding-left: 3px;
        }
      }
    }
  }
}

</style>
